import type { ReactNode } from "react";

export function Legal({
	eyebrow,
	title,
	lede,
	children,
}: {
	eyebrow: string;
	title: string;
	lede: string;
	children: ReactNode;
}) {
	return (
		<main className="px-6 pt-36 pb-24">
			<article className="mx-auto max-w-2xl">
				<p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">{eyebrow}</p>
				<h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">{title}</h1>
				<p className="mt-6 text-lg leading-8 text-muted-foreground">{lede}</p>
				<div className="mt-12 space-y-10 text-[15px] leading-7 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
					{children}
				</div>
			</article>
		</main>
	);
}
