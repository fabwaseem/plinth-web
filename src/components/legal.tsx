import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbList } from "@/lib/seo";

export function Legal({
	eyebrow,
	title,
	lede,
	path,
	children,
}: {
	eyebrow: string;
	title: string;
	lede: string;
	path: string;
	children: ReactNode;
}) {
	return (
		<>
			<JsonLd
				data={breadcrumbList([
					{ name: "Home", path: "/" },
					{ name: eyebrow, path },
				])}
			/>
			<article className="px-4 pt-32 pb-24 sm:px-6 md:pt-36">
				<div className="mx-auto max-w-2xl">
					<nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
						<ol className="flex flex-wrap items-center gap-2">
							<li>
								<Link href="/" className="inline-flex min-h-11 items-center hover:text-foreground">
									Home
								</Link>
							</li>
							<li aria-hidden>/</li>
							<li aria-current="page" className="text-foreground">
								{eyebrow}
							</li>
						</ol>
					</nav>
					<p className="mt-6 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">{eyebrow}</p>
					<h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">{title}</h1>
					<p className="mt-6 text-lg leading-8 text-pretty text-muted-foreground">{lede}</p>
					<div className="mt-12 space-y-10 text-[15px] leading-7 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:text-pretty [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
						{children}
					</div>
				</div>
			</article>
		</>
	);
}
