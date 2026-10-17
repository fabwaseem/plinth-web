import type { Metadata } from "next";
import { Home } from "@/components/home";
import { getLatestVersion } from "@/lib/release";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
	title: "Plinth — save the video, keep the file",
	description: site.description,
	path: "/",
	keywords: [
		"Plinth",
		"desktop video downloader",
		"YouTube downloader",
		"playlist downloader",
		"subtitle downloader",
		"Windows",
		"macOS",
		"Linux",
		"yt-dlp",
		"free video downloader",
	],
});

export default async function Page() {
	const version = await getLatestVersion();
	return <Home version={version} />;
}
