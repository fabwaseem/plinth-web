const Module = require("module")

const ts6Entry = require.resolve("@typescript/typescript6")
const originalResolve = Module._resolveFilename

Module._resolveFilename = function resolveFilename(request, parent, isMain, options) {
	if (request === "typescript" || request === "typescript/lib/typescript.js") {
		return ts6Entry
	}
	return originalResolve.call(this, request, parent, isMain, options)
}
