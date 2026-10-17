import { siteGraph } from "@/lib/seo";

export function JsonLd({ data }: { data: unknown }) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data).replace(/</g, "\\u003c"),
			}}
		/>
	);
}

export async function SiteJsonLd() {
	return <JsonLd data={await siteGraph()} />;
}
