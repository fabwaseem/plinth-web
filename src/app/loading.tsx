export default function Loading() {
	return (
		<div className="px-4 pt-24 pb-16 sm:px-6" aria-busy="true" aria-live="polite">
			<p className="sr-only">Loading Plinth</p>
			<div className="mx-auto max-w-6xl overflow-hidden rounded-[1.4rem] border border-border bg-card shadow-[var(--panel-glow)]">
				<div className="flex items-center gap-3 border-b border-border px-4 py-3">
					<span className="h-2.5 w-2.5 rounded-full bg-border" />
					<span className="h-2.5 w-2.5 rounded-full bg-border" />
					<span className="h-2.5 w-2.5 rounded-full bg-border" />
				</div>
				<div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
					<div className="space-y-4">
						<div className="h-3 w-16 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
						<div className="h-14 w-4/5 animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
						<div className="h-20 w-full max-w-md animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
					</div>
					<div className="space-y-3">
						<div className="h-24 animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
						<div className="h-24 animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
						<div className="h-24 animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
					</div>
				</div>
			</div>
		</div>
	);
}
