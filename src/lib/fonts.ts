import { Poppins } from "next/font/google";

export const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	display: "optional",
	adjustFontFallback: true,
	fallback: ["system-ui", "Segoe UI", "sans-serif"],
	preload: true,
});

export const fontClassName = poppins.variable;
