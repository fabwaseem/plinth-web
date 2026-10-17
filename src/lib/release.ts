import { cacheLife } from "next/cache";

const FALLBACK_VERSION = "1.0.0";

export async function getLatestVersion(): Promise<string> {
	"use cache";
	cacheLife("hours");

	try {
		const response = await fetch("https://api.github.com/repos/fabwaseem/plinth/releases/latest", {
			headers: {
				Accept: "application/vnd.github+json",
				"User-Agent": "plinth-web",
			},
		});
		if (!response.ok) return FALLBACK_VERSION;
		const release = (await response.json()) as { tag_name?: string };
		const version = release.tag_name?.replace(/^v/i, "").trim();
		return version || FALLBACK_VERSION;
	} catch {
		return FALLBACK_VERSION;
	}
}
