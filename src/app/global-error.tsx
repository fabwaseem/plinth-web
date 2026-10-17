"use client";

import Link from "next/link";
import { useEffect } from "react";
import { fontClassName } from "@/lib/fonts";
import "./globals.css";

export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	const digest = typeof error === "object" && error && "digest" in error && typeof error.digest === "string" ? error.digest : undefined;

	return (
		<html lang="en" className={fontClassName}>
			<body className="min-h-full bg-background text-foreground antialiased">
				<main className="px-4 pt-24 pb-24">
					<div className="mx-auto max-w-xl rounded-[1.4rem] border border-border bg-card p-8 sm:p-12">
						<p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">Error</p>
						<h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Something went wrong.</h1>
						<p className="mt-5 text-lg leading-8 text-muted-foreground">Plinth could not render this page. Try again, or return to the homepage.</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<button type="button" className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground" onClick={() => retry()}>
								Try again
							</button>
							<Link href="/" className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-muted-foreground">
								Go to the Plinth homepage
							</Link>
						</div>
						{digest ? <p className="mt-6 font-mono text-xs text-muted-foreground">Reference {digest}</p> : null}
					</div>
				</main>
			</body>
		</html>
	);
}
