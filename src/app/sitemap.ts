import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const paths = ["", "/support", "/privacy", "/terms", "/license"];
	return paths.map((path) => ({
		url: `${site.url}${path}`,
		lastModified: new Date("2026-10-17"),
		changeFrequency: path === "" ? "weekly" : "yearly",
		priority: path === "" ? 1 : 0.4,
	}));
}
