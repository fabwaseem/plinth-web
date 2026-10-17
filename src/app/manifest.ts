import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Plinth",
		short_name: "Plinth",
		description: site.description,
		start_url: "/",
		scope: "/",
		display: "standalone",
		background_color: "#f6f4f1",
		theme_color: "#2a2420",
		lang: "en",
		icons: [
			{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
			{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
			{ src: "/icon", sizes: "192x192", type: "image/png", purpose: "any" },
			{ src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
		],
	};
}
