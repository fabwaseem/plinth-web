import Link from "next/link";

export default function NotFound() {
	return (
		<main className="px-6 pt-40 pb-28">
			<div className="mx-auto max-w-xl">
				<p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">404</p>
				<h1 className="mt-4 text-6xl font-semibold tracking-tight">That page is not here.</h1>
				<Link href="/" className="mt-8 inline-block text-sm underline underline-offset-4">
					Back to Plinth
				</Link>
			</div>
		</main>
	);
}
