"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
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
			aria-label={dark ? "Use light mode" : "Use dark mode"}
			className="grid h-10 w-10 place-items-center rounded-full text-foreground"
			onClick={() => setTheme(dark ? "light" : "dark")}
		>
			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					key={dark ? "sun" : "moon"}
					className="grid place-items-center"
					initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
					animate={{ opacity: 1, rotate: 0, scale: 1 }}
					exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
					transition={{ duration: 0.18 }}
				>
					{dark ? <Sun size={22} weight="bold" /> : <Moon size={22} weight="bold" />}
				</motion.span>
			</AnimatePresence>
		</button>
	);
}
