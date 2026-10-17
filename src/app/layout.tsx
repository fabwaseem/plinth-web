import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SiteJsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { fontClassName } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

const title = "Plinth — save the video, keep the file";

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: title,
		template: "%s — Plinth",
	},
	description: site.description,
	applicationName: site.name,
	keywords: ["Plinth", "desktop video downloader", "YouTube downloader", "playlist downloader", "subtitles", "Windows", "macOS", "Linux"],
	authors: [{ name: site.author, url: "https://github.com/fabwaseem" }],
	creator: site.author,
	publisher: site.author,
	category: "Multimedia",
	formatDetection: { telephone: false, email: false, address: false },
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	alternates: {
		canonical: site.url,
		languages: { en: site.url, "x-default": site.url },
	},
	openGraph: {
		title,
		description: site.description,
		url: site.url,
		siteName: site.name,
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title,
		description: site.description,
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	colorScheme: "light dark",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f6f4f1" },
		{ media: "(prefers-color-scheme: dark)", color: "#121110" },
	],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${fontClassName} min-h-full antialiased`} suppressHydrationWarning>
			<body className="min-h-full overflow-x-clip bg-background text-foreground">
				<ThemeProvider>
					<a href="#content" className="skip-link">
						Skip to content
					</a>
					<SiteJsonLd />
					<Header />
					<main id="content" tabIndex={-1} className="outline-none">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
