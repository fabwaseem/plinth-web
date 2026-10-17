"use client";

import { DownloadSimple, List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useDevice } from "@/lib/device";
import { nav } from "@/lib/site";

export function Header() {
	const [open, setOpen] = useState(false);
	const device = useDevice();

	return (
		<header className="fixed inset-x-0 top-0 z-30 px-3 pt-3 md:px-6">
			<motion.div
				className="relative z-50 mx-auto flex max-w-6xl items-center gap-3 rounded-2xl border border-border bg-card/90 px-3 py-2 shadow-[var(--panel-glow)] backdrop-blur-xl"
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			>
				<Link href="/" className="flex items-center gap-2.5 pl-1 font-semibold tracking-tight">
					<Logo size={32} />
					<span className="text-base">Plinth</span>
				</Link>
				<nav className="ml-4 hidden items-center gap-1 md:flex">
					{nav.map((item) => (
						<Link key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
							{item.label}
						</Link>
					))}
				</nav>
				<div className="ml-auto flex items-center gap-2">
					<div className="hidden sm:block">
						<ThemeToggle />
					</div>
					<a href={device.href} className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground md:inline-flex">
						<DownloadSimple size={18} weight="bold" />
						{device.label}
					</a>
					<button
						type="button"
						className="grid h-10 w-10 place-items-center rounded-full md:hidden"
						aria-expanded={open}
						aria-label={open ? "Close menu" : "Open menu"}
						onClick={() => setOpen((value) => !value)}
					>
						{open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
					</button>
				</div>
			</motion.div>
			<AnimatePresence>
				{open ? (
					<motion.div
						className="fixed inset-0 z-40 flex flex-col bg-background px-8 pt-28 md:hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<nav className="flex flex-col gap-5 text-4xl font-semibold tracking-tight">
							{nav.map((item, index) => (
								<motion.div key={item.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}>
									<Link href={item.href} onClick={() => setOpen(false)}>
										{item.label}
									</Link>
								</motion.div>
							))}
						</nav>
						<div className="mt-10">
							<ThemeToggle />
						</div>
						<a href={device.href} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground" onClick={() => setOpen(false)}>
							<DownloadSimple size={20} weight="bold" />
							{device.label}
						</a>
					</motion.div>
				) : null}
			</AnimatePresence>
		</header>
	);
}
