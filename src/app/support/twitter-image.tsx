import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Support — report a problem with Plinth";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return createOgImage({
		eyebrow: "Support",
		title: "Tell us what broke.",
		subtitle: "Report an issue, or send a thank-you.",
	});
}
