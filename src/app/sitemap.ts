import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
	const paths = ["/", "/support", "/privacy", "/terms", "/license"];
	const lastModified = new Date("2026-10-17");

	return paths.map((path) => ({
		url: absoluteUrl(path),
		lastModified,
		changeFrequency: path === "/" ? "weekly" : "yearly",
		priority: path === "/" ? 1 : 0.4,
	}));
}
