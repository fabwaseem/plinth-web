"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const mounted = useSyncExternalStore(
		() => () => undefined,
		() => true,
		() => false,
	);
	const dark = mounted && resolvedTheme === "dark";

	return (
		<button
			type="button"
			aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
			className="grid h-11 w-11 place-items-center rounded-full text-foreground"
			onClick={() => setTheme(dark ? "light" : "dark")}
		>
			<span className="relative grid h-6 w-6 place-items-center">
				<Sun size={22} weight="bold" aria-hidden className={`absolute transition-opacity duration-200 ${dark ? "opacity-100" : "opacity-0"}`} />
				<Moon size={22} weight="bold" aria-hidden className={`absolute transition-opacity duration-200 ${dark ? "opacity-0" : "opacity-100"}`} />
			</span>
		</button>
	);
}
