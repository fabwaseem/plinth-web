import Link from "next/link";
import { Logo } from "@/components/logo";
import { getLatestVersion } from "@/lib/release";
import { site } from "@/lib/site";

const links = [
	{ href: "/support", label: "Support" },
	{ href: "/privacy", label: "Privacy" },
	{ href: "/terms", label: "Terms" },
	{ href: "/license", label: "License" },
	{ href: site.github, label: "GitHub" },
];

export async function Footer() {
	const version = await getLatestVersion();

	return (
		<footer className="border-t border-border bg-background px-6 py-12">
			<div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
				<div>
					<div className="flex items-center gap-3">
						<Logo size={36} />
						<p className="text-2xl font-semibold tracking-tight">Plinth</p>
					</div>
					<p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
						A desktop downloader by {site.author}. Version {version}. Files stay on your computer.
					</p>
				</div>
				<ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
					{links.map((link) => (
						<li key={link.href}>
							{link.href.startsWith("http") ? (
								<a href={link.href} className="text-muted-foreground hover:text-foreground">
									{link.label}
								</a>
							) : (
								<Link href={link.href} className="text-muted-foreground hover:text-foreground">
									{link.label}
								</Link>
							)}
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
}
