const DRAINING = "__plinthDraining"

type DrainGlobal = typeof globalThis & {
	[DRAINING]?: boolean
}

export function isDraining(): boolean {
	return (globalThis as DrainGlobal)[DRAINING] === true
}
