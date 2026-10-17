import type { Metadata } from "next";
import Link from "next/link";
import { StatusScreen } from "@/components/status-screen";

export const metadata: Metadata = {
	title: "Page not found",
	description: "That page is not part of the Plinth site.",
	keywords: ["Plinth", "page not found"],
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<StatusScreen code="404" title="That page is not here." body="The address does not match a page on the Plinth site.">
			<Link href="/" className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground">
				Go to the Plinth homepage
			</Link>
		</StatusScreen>
	);
}
