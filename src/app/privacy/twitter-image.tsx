import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Privacy — Plinth keeps downloads on your computer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return createOgImage({
		eyebrow: "Privacy",
		title: "Your files stay where you saved them.",
		subtitle: "No account. Downloads stay on your computer.",
	});
}
