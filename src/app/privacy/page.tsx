import type { Metadata } from "next";
import { Legal } from "@/components/legal";

export const metadata: Metadata = {
	title: "Privacy",
	description: "What Plinth keeps on your computer, and what the website does not collect.",
};

export default function PrivacyPage() {
	return (
		<Legal
			eyebrow="Privacy"
			title="Your files stay where you saved them."
			lede="Plinth is a desktop app. This website is a static page. Neither one asks you to make an account."
		>
			<section>
				<h2>The app</h2>
				<ul>
					<li>Downloads, queue history, and settings are stored in the app profile on your computer.</li>
					<li>Finished media is written only to the folder you choose.</li>
					<li>Explore can open websites inside the app. If you sign in there, that site’s cookies stay in the Plinth profile. Use a secondary account.</li>
				</ul>
			</section>
			<section>
				<h2>Product events</h2>
				<p>
					Plinth can send a short list of events when something fails: a probe error, a download error, a crash, or a feedback report you choose to send. Those events describe the kind of failure. They do not include the video URL, the filename, or the file itself. You can turn this off in the app settings.
				</p>
			</section>
			<section>
				<h2>Updates</h2>
				<p>
					The app checks GitHub for a newer release. That request goes to GitHub, the same place the installer came from.
				</p>
			</section>
			<section>
				<h2>This website</h2>
				<p>
					plinth.fabwaseem.com does not run accounts, comments, or a checkout. Your browser may still record the visit in its own history. Download links go to GitHub Releases.
				</p>
			</section>
		</Legal>
	);
}
