import Link from "next/link";
import { DownloadButton } from "@/components/download-button";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav } from "@/lib/site";

export function Header() {
	return (
		<header className="fixed inset-x-0 top-0 z-30 px-4 pt-3 sm:px-6">
			<div className="relative z-50 mx-auto flex max-w-6xl items-center gap-2 rounded-2xl border border-border bg-card/90 px-3 py-2 shadow-[var(--panel-glow)] backdrop-blur-xl sm:gap-3">
				<Link href="/" className="flex min-h-11 items-center gap-2.5 rounded-full pl-1 font-semibold tracking-tight">
					<Logo size={32} priority />
					<span className="text-base">Plinth</span>
				</Link>
				<nav aria-label="Primary" className="ml-3 hidden items-center gap-1 lg:flex">
					{nav.map((item) => (
						<Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center rounded-full px-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
							{item.label}
						</Link>
					))}
				</nav>
				<div className="ml-auto flex items-center gap-2">
					<div className="hidden sm:block">
						<ThemeToggle />
					</div>
					<DownloadButton variant="header" className="max-lg:hidden" />
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
