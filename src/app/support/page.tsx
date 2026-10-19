import type { Metadata } from "next";
import { CopyAddress } from "@/components/copy-address";
import { Legal } from "@/components/legal";
import { MacInstallHelp } from "@/components/mac-install-help";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
	title: "Support",
	description: "Open Plinth on macOS, report a problem, or support the project with USDT.",
	path: "/support",
	keywords: ["Plinth support", "macOS install", "Apple could not verify", "report a bug", "USDT donation", "GitHub issues"],
});

export default function SupportPage() {
	return (
		<Legal
			eyebrow="Support"
			title="Tell us what broke, or send a thank-you."
			lede="Bugs belong on GitHub. Support, if you want to send any, is a single USDT address."
			path="/support"
		>
			<section>
				<h2>Issues</h2>
				<p>
					<a href={site.issues}>Open a GitHub issue</a> and include the site, the format you picked, and what the queue said. Leave out account passwords.
				</p>
			</section>
			<MacInstallHelp variant="section" />
			<section>
				<h2>USDT, ERC-20</h2>
				<p>This is the only donation address. It is on Ethereum.</p>
				<CopyAddress value={site.usdt} />
			</section>
		</Legal>
	);
}
