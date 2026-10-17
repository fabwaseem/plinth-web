import type { Metadata } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MotionProvider } from "@/components/motion-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
	variable: "--font-jetbrains",
	subsets: ["latin"],
	weight: ["400", "500"],
});

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: "Plinth — save the video, keep the file",
		template: "%s — Plinth",
	},
	description: site.description,
	applicationName: site.name,
	authors: [{ name: site.author, url: "https://github.com/fabwaseem" }],
	openGraph: {
		title: "Plinth",
		description: site.description,
		url: site.url,
		siteName: site.name,
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Plinth",
		description: site.description,
	},
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${poppins.variable} ${jetbrains.variable} min-h-full antialiased`} suppressHydrationWarning>
			<body className="min-h-full bg-background text-foreground">
				<ThemeProvider>
					<MotionProvider>
						<Header />
						{children}
						<Footer />
					</MotionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
