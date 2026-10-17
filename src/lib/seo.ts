import type { Metadata } from "next";
import { getLatestVersion } from "@/lib/release";
import { site } from "@/lib/site";

export function absoluteUrl(path: string) {
	if (path === "/") return site.url;
	return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
	title,
	description,
	path,
	keywords,
}: {
	title: string;
	description: string;
	path: string;
	keywords: string[];
}): Metadata {
	const url = absoluteUrl(path);
	const socialTitle = path === "/" ? title : `${title} — ${site.name}`;

	return {
		title: path === "/" ? { absolute: title } : title,
		description,
		keywords,
		alternates: {
			canonical: url,
			languages: {
				en: url,
				"x-default": url,
			},
		},
		openGraph: {
			title: socialTitle,
			description,
			url,
			siteName: site.name,
			type: "website",
			locale: "en_US",
		},
		twitter: {
			card: "summary_large_image",
			title: socialTitle,
			description,
		},
	};
}

export function breadcrumbList(items: { name: string; path: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path),
		})),
	};
}

export async function siteGraph() {
	const version = await getLatestVersion();
	const organizationId = `${site.url}/#organization`;
	const websiteId = `${site.url}/#website`;

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": organizationId,
				name: site.name,
				url: site.url,
				logo: `${site.url}/icon.svg`,
				founder: {
					"@type": "Person",
					name: site.author,
					url: "https://github.com/fabwaseem",
				},
			},
			{
				"@type": "WebSite",
				"@id": websiteId,
				name: site.name,
				url: site.url,
				description: site.description,
				inLanguage: "en",
				publisher: { "@id": organizationId },
			},
			{
				"@type": "SoftwareApplication",
				name: site.name,
				url: site.url,
				description: site.description,
				applicationCategory: "MultimediaApplication",
				operatingSystem: ["Windows", "macOS", "Linux"],
				softwareVersion: version,
				downloadUrl: site.release,
				isAccessibleForFree: true,
				license: "https://opensource.org/licenses/MIT",
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
				author: {
					"@type": "Person",
					name: site.author,
				},
				publisher: { "@id": organizationId },
			},
		],
	};
}
