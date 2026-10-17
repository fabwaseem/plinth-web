import type { Metadata } from "next";
import { CopyAddress } from "@/components/copy-address";
import { Legal } from "@/components/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
	title: "Support",
	description: "Report a problem with Plinth, or support the project with USDT.",
};

export default function SupportPage() {
	return (
		<Legal
			eyebrow="Support"
			title="Tell us what broke, or send a thank-you."
			lede="Bugs belong on GitHub. Support, if you want to send any, is a single USDT address."
		>
			<section>
				<h2>Issues</h2>
				<p>
					Open a report at{" "}
					<a className="underline underline-offset-4" href={site.issues}>
						{site.issues}
					</a>
					. Include the site, the format you picked, and what the queue said. Leave out account passwords.
				</p>
			</section>
			<section>
				<h2>USDT, ERC-20</h2>
				<p>This is the only donation address. It is on Ethereum.</p>
				<CopyAddress value={site.usdt} />
			</section>
		</Legal>
	);
}
