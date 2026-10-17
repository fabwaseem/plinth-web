"use client";

import Link from "next/link";
import { useEffect } from "react";
import { StatusScreen } from "@/components/status-screen";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	const digest = typeof error === "object" && error && "digest" in error && typeof error.digest === "string" ? error.digest : undefined;

	return (
		<StatusScreen code="Error" title="Something went wrong." body="The page did not finish loading. You can try again, or go back to the homepage.">
			<button type="button" className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground" onClick={() => retry()}>
				Try again
			</button>
			<Link href="/" className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-muted-foreground hover:text-foreground">
				Go to the Plinth homepage
			</Link>
			{digest ? <p className="w-full font-mono text-xs text-muted-foreground">Reference {digest}</p> : null}
		</StatusScreen>
	);
}
