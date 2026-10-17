import { cacheLife, cacheTag } from "next/cache";

export const FALLBACK_VERSION = "1.0.0";
const RELEASE_URL = "https://api.github.com/repos/fabwaseem/plinth/releases/latest";

export async function getLatestVersion(): Promise<string> {
	"use cache";
	cacheLife({ stale: 60 * 5, revalidate: 60 * 60, expire: 60 * 60 * 24 });
	cacheTag("plinth-release");

	try {
		const response = await fetch(RELEASE_URL, {
			headers: {
				Accept: "application/vnd.github+json",
				"User-Agent": "plinth-web",
			},
			signal: AbortSignal.timeout(5000),
			next: { revalidate: 60 * 60 },
		});
		if (!response.ok) return FALLBACK_VERSION;
		const release = (await response.json()) as { tag_name?: unknown };
		return sanitizeVersion(release.tag_name);
	} catch {
		return FALLBACK_VERSION;
	}
}

function sanitizeVersion(value: unknown): string {
	if (typeof value !== "string") return FALLBACK_VERSION;
	const version = value.trim().replace(/^v/i, "");
	if (!/^\d+(?:\.\d+){0,3}(?:[-+][0-9A-Za-z.]+)?$/.test(version)) return FALLBACK_VERSION;
	return version;
}
