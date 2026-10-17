import type { ReactNode } from "react";

export function StatusScreen({
	code,
	title,
	body,
	children,
}: {
	code: string;
	title: string;
	body: string;
	children?: ReactNode;
}) {
	return (
		<div className="px-4 pt-28 pb-24 sm:px-6">
			<div className="mx-auto max-w-xl rounded-[1.4rem] border border-border bg-card p-8 shadow-[var(--panel-glow)] sm:p-12">
				<p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">{code}</p>
				<h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">{title}</h1>
				<p className="mt-5 text-lg leading-8 text-pretty text-muted-foreground">{body}</p>
				{children ? <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div> : null}
			</div>
		</div>
	);
}
