"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { DownloadButton } from "@/components/download-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav } from "@/lib/site";

export function MobileNav() {
	const [openPath, setOpenPath] = useState<string | null>(null);
	const pathname = usePathname();
	const menuId = useId();
	const open = openPath === pathname;

	useEffect(() => {
		if (!open) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpenPath(null);
		};
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previous;
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	return (
		<>
			<button
				type="button"
				className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
				aria-expanded={open}
				aria-controls={menuId}
				aria-label={open ? "Close menu" : "Open menu"}
				onClick={() => setOpenPath(open ? null : pathname)}
			>
				{open ? <X size={22} weight="bold" aria-hidden /> : <List size={22} weight="bold" aria-hidden />}
			</button>
			{open ? (
				<div id={menuId} role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-40 flex flex-col bg-background px-8 pt-28 lg:hidden">
					<nav aria-label="Mobile" className="flex flex-col gap-2 text-4xl font-semibold tracking-tight">
						{nav.map((item) => (
							<Link key={item.href} href={item.href} className="min-h-14 py-1" onClick={() => setOpenPath(null)}>
								{item.label}
							</Link>
						))}
					</nav>
					<div className="mt-10">
						<ThemeToggle />
					</div>
					<DownloadButton className="mt-8 w-fit" />
				</div>
			) : null}
		</>
	);
}
