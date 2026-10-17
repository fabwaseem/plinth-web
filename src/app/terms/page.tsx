import type { Metadata } from "next";
import { Legal } from "@/components/legal";
import { getLatestVersion } from "@/lib/release";
import { site } from "@/lib/site";

export const metadata: Metadata = {
	title: "Terms",
	description: "The terms for using Plinth and this website.",
};

export default async function TermsPage() {
	const version = await getLatestVersion();

	return (
		<Legal
			eyebrow="Terms"
			title="Use it for media you are allowed to save."
			lede="Plinth is free software. The sites you download from still have their own rules."
		>
			<section>
				<h2>The software</h2>
				<p>
					Plinth {version} is published under the MIT license by {site.author}. The license is the whole warranty statement: the app is provided as it is, without a promise that a particular site, format, or future update will keep working.
				</p>
			</section>
			<section>
				<h2>Your downloads</h2>
				<p>
					You choose the links. You are responsible for having the right to save that media, and for following the terms of the site it came from. Plinth does not grant rights to copyrighted work.
				</p>
			</section>
			<section>
				<h2>This website</h2>
				<p>
					Download buttons point at files on GitHub. Package-manager listings, when they exist, are maintained separately and can lag a release. Windows and macOS may show an extra warning because the {version} builds are not signed with a paid certificate.
				</p>
			</section>
		</Legal>
	);
}
