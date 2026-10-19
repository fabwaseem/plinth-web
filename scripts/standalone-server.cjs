const fs = require("node:fs")
const http = require("node:http")
const net = require("node:net")
const path = require("node:path")

const FORCE_EXIT_MS = 25_000
const DEFAULT_DRAIN_MS = 9_000
const DRAINING = "__plinthDraining"

// Next standalone registers its own SIGTERM handler that closes the listener
// and exits immediately. Opt out before server.js loads.
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
const originalListen = http.Server.prototype.listen
let draining = false
let finished = false
let forceTimer
let drainTimer

function finish() {
	if (finished) return
	finished = true
	clearTimeout(forceTimer)
	clearTimeout(drainTimer)
	process.exit(0)
}

function closeServers() {
	const open = [...servers]
	if (open.length === 0) {
		finish()
		return
	}
	let pending = open.length
	const done = () => {
		pending -= 1
		if (pending === 0) finish()
	}
	for (const server of open) {
		try {
			server.close(done)
		} catch {
			done()
			continue
		}
		try {
			if (typeof server.closeIdleConnections === "function") server.closeIdleConnections()
		} catch {
			// Idle keep-alives are closed on a best-effort basis.
		}
	}
}

function shutdown(signal) {
	if (draining) return
	draining = true
	globalThis[DRAINING] = true
	const drainFor = drainDuration()
	console.log(`${signal}: draining for ${drainFor}ms`)
	forceTimer = setTimeout(finish, FORCE_EXIT_MS)
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
	this.on("listening", armSignals)
	return originalListen.apply(this, args)
}

armSignals()
require(resolveServerFile())
