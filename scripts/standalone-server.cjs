const fs = require("node:fs")
const http = require("node:http")
const net = require("node:net")
const path = require("node:path")

const FORCE_EXIT_MS = 25_000
const DEFAULT_DRAIN_MS = 9_000
const CLOSE_ALL_AFTER_MS = 5_000
const KEEP_ALIVE_TIMEOUT_MS = 65_000
const HEADERS_TIMEOUT_MS = 66_000
const DRAINING = "__plinthDraining"
const kWrapped = Symbol("plinthWrappedRequest")
const kCloseHook = Symbol("plinthCloseHook")

// Nixpacks starts `node scripts/standalone-server.cjs`. The image CMD runs
// this same file as server-entry.cjs. Next standalone registers its own
// SIGTERM handler that closes the listener and exits immediately.
process.env.NEXT_MANUAL_SIG_HANDLE = "1"

const hostname = process.env.HOSTNAME
process.env.HOSTNAME = hostname && (hostname === "localhost" || net.isIP(hostname)) ? hostname : "0.0.0.0"

function drainDuration() {
	const raw = process.env.SHUTDOWN_DRAIN_MS
	if (raw == null || raw === "") return DEFAULT_DRAIN_MS
	if (!/^\d+$/.test(raw)) return DEFAULT_DRAIN_MS
	const value = Number(raw)
	if (!Number.isSafeInteger(value)) return DEFAULT_DRAIN_MS
	return value
}

function copyOnto(source, destination) {
	if (!fs.existsSync(source)) return
	fs.mkdirSync(path.dirname(destination), { recursive: true })
	fs.cpSync(source, destination, { recursive: true, force: true })
}

function resolveServerFile() {
	const beside = path.join(__dirname, "server.js")
	if (fs.existsSync(beside)) return beside

	const root = path.resolve(__dirname, "..")
	const standaloneDir = path.join(root, ".next", "standalone")
	const serverFile = path.join(standaloneDir, "server.js")
	if (!fs.existsSync(serverFile)) {
		console.error("standalone server.js not found. Run the production build first.")
		process.exit(1)
	}
	copyOnto(path.join(root, "public"), path.join(standaloneDir, "public"))
	copyOnto(path.join(root, ".next", "static"), path.join(standaloneDir, ".next", "static"))
	return serverFile
}

const servers = new Set()
const activeResponses = new Set()
const originalListen = http.Server.prototype.listen
const originalAddListener = http.Server.prototype.addListener
const originalPrependListener = http.Server.prototype.prependListener
let draining = false
let finished = false
let inFlight = 0
let forceTimer
let drainTimer
let closeAllTimer

function headerArgIndex(args) {
	if (args.length < 2 || args[1] == null) return -1
	if (typeof args[1] === "string") return args.length >= 3 && args[2] != null ? 2 : -1
	if (typeof args[1] === "object") return 1
	return -1
}

function withConnectionClose(headers) {
	if (Array.isArray(headers)) {
		const next = []
		for (let i = 0; i < headers.length; i += 2) {
			if (String(headers[i]).toLowerCase() === "connection") continue
			next.push(headers[i], headers[i + 1])
		}
		next.push("Connection", "close")
		return next
	}
	const next = { ...headers }
	for (const key of Object.keys(next)) {
		if (key.toLowerCase() === "connection") delete next[key]
	}
	next.Connection = "close"
	return next
}

function armConnectionClose(res) {
	if (!res || typeof res.setHeader !== "function" || typeof res.writeHead !== "function") return
	res.shouldKeepAlive = false
	const socket = res.socket
	if (socket && typeof socket.destroySoon === "function" && !socket[kCloseHook]) {
		socket[kCloseHook] = true
		// Node answers Connection: close with destroySoon(), which can RST bytes
		// the client has not read yet. FIN the socket instead.
		socket.destroySoon = function endSoon() {
			if (this.destroyed || this.writableEnded) return
			this.ref()
			this.end()
		}
	}
	if (!res[kCloseHook]) {
		res[kCloseHook] = true
		const setHeader = res.setHeader
		const writeHead = res.writeHead
		res.setHeader = function setHeaderClose(name, value) {
			if (draining && String(name).toLowerCase() === "connection") {
				this.shouldKeepAlive = false
				return setHeader.call(this, "Connection", "close")
			}
			return setHeader.call(this, name, value)
		}
		res.writeHead = function writeHeadClose(...args) {
			if (draining) {
				this.shouldKeepAlive = false
				const index = headerArgIndex(args)
				if (index !== -1) {
					args = args.slice()
					args[index] = withConnectionClose(args[index])
				}
				if (!this.headersSent) {
					try {
						setHeader.call(this, "Connection", "close")
					} catch {
						// The response finished before the header could be set.
					}
				}
			}
			return writeHead.apply(this, args)
		}
	}
	if (res.headersSent || res.writableEnded) return
	try {
		res.setHeader("Connection", "close")
	} catch {
		// Headers were already flushed.
	}
}

function trackResponse(res) {
	if (!res || typeof res.on !== "function" || activeResponses.has(res)) return
	inFlight += 1
	activeResponses.add(res)
	let settled = false
	const settle = () => {
		if (settled) return
		settled = true
		activeResponses.delete(res)
		inFlight -= 1
	}
	res.on("finish", settle)
	res.on("close", settle)
}

function wrapRequestListener(listener) {
	if (listener[kWrapped]) return listener
	function wrapped(req, res) {
		trackResponse(res)
		if (draining) armConnectionClose(res)
		return listener.call(this, req, res)
	}
	wrapped[kWrapped] = true
	return wrapped
}

function listenFor(original) {
	return function (event, listener) {
		if (event === "request" && typeof listener === "function") listener = wrapRequestListener(listener)
		return original.call(this, event, listener)
	}
}

http.Server.prototype.on = listenFor(originalAddListener)
http.Server.prototype.addListener = http.Server.prototype.on
http.Server.prototype.prependListener = listenFor(originalPrependListener)

function blockingStdio() {
	for (const stream of [process.stdout, process.stderr]) {
		const handle = stream && stream._handle
		if (handle && typeof handle.setBlocking === "function") {
			try {
				handle.setBlocking(true)
			} catch {
				// Some streams have no blocking mode.
			}
		}
	}
}

function logStdout(line) {
	blockingStdio()
	console.log(line)
	const fd = process.stdout && process.stdout.fd
	if (typeof fd === "number") {
		try {
			fs.writeSync(fd, "")
		} catch {
			// The line was already handed to the stream.
		}
	}
}

function finish(code = 0) {
	if (finished) return
	finished = true
	clearTimeout(drainTimer)
	clearTimeout(closeAllTimer)
	process.exitCode = code
	logStdout(`exiting ${code}`)
	if (forceTimer) forceTimer.unref()
}

function forceExit() {
	const code = finished ? (process.exitCode ?? 0) : 0
	if (!finished) finish(code)
	process.exit(process.exitCode ?? code)
}

function configureTimeouts(server) {
	server.keepAliveTimeout = KEEP_ALIVE_TIMEOUT_MS
	server.headersTimeout = HEADERS_TIMEOUT_MS
}

function closeServers() {
	const open = [...servers]
	if (open.length === 0) {
		finish(0)
		return
	}
	logStdout("closing server")
	let pending = open.length
	let reported = false
	const done = () => {
		pending -= 1
		if (pending > 0 || reported) return
		reported = true
		clearTimeout(closeAllTimer)
		logStdout(`closed, in-flight=${inFlight}`)
		finish(0)
	}
	closeAllTimer = setTimeout(() => {
		if (pending === 0 || inFlight === 0) return
		for (const server of open) {
			try {
				if (typeof server.closeAllConnections === "function") server.closeAllConnections()
			} catch {
				// Remaining sockets are closed on a best-effort basis.
			}
		}
	}, CLOSE_ALL_AFTER_MS)
	closeAllTimer.unref()
	for (const server of open) {
		try {
			if (typeof server.closeIdleConnections === "function") server.closeIdleConnections()
		} catch {
			// Idle keep-alives are closed on a best-effort basis.
		}
		try {
			server.close(done)
		} catch {
			done()
		}
	}
}

function shutdown(signal) {
	if (draining) return
	draining = true
	globalThis[DRAINING] = true
	for (const res of activeResponses) armConnectionClose(res)
	const drainFor = drainDuration()
	logStdout(`${signal}: draining for ${drainFor}ms`)
	forceTimer = setTimeout(forceExit, FORCE_EXIT_MS)
	drainTimer = setTimeout(closeServers, drainFor)
}

function armSignals() {
	process.removeAllListeners("SIGTERM")
	process.removeAllListeners("SIGINT")
	process.on("SIGTERM", () => shutdown("SIGTERM"))
	process.on("SIGINT", () => shutdown("SIGINT"))
}

http.Server.prototype.listen = function listen(...args) {
	servers.add(this)
	configureTimeouts(this)
	this.on("listening", () => {
		configureTimeouts(this)
		armSignals()
	})
	return originalListen.apply(this, args)
}

armSignals()
require(resolveServerFile())
