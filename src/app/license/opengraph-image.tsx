import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "License — Plinth is MIT licensed";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return createOgImage({
		eyebrow: "License",
		title: "MIT License.",
		subtitle: "Copyright (c) 2026 Waseem Anjum.",
	});
}
