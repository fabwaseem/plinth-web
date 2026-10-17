import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Plinth — save the video, keep the file";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return createOgImage({
		eyebrow: "Desktop app",
		title: "Save the video. Keep the file.",
		subtitle: "Windows, macOS, and Linux. Free, local, and MIT licensed.",
	});
}
