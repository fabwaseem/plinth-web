import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Terms — use Plinth for media you are allowed to save";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return createOgImage({
		eyebrow: "Terms",
		title: "Save media you are allowed to keep.",
		subtitle: "Free software. The sites you use still have their own rules.",
	});
}
