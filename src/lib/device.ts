"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { downloads } from "@/lib/site";

export type Os = "windows" | "mac" | "linux";
export type Chip = "arm" | "x64";

function subscribe() {
	return () => undefined;
}

function readOs(): Os | null {
	const ua = navigator.userAgent;
	const platform = navigator.platform ?? "";
	if (/Win/i.test(platform) || /Windows/i.test(ua)) return "windows";
	if (/Mac/i.test(platform) || /Macintosh/i.test(ua)) return "mac";
	if (/Linux|X11/i.test(platform) || /Linux/i.test(ua)) return "linux";
	return null;
}

export function useDevice() {
	const os = useSyncExternalStore(subscribe, readOs, () => null);
	const [chip, setChip] = useState<Chip | null>(null);

	useEffect(() => {
		const agent = navigator as Navigator & {
			userAgentData?: { getHighEntropyValues: (hints: string[]) => Promise<{ architecture?: string }> };
		};
		if (!agent.userAgentData) return;
		let alive = true;
		void agent.userAgentData
			.getHighEntropyValues(["architecture"])
			.then((value) => {
				if (!alive) return;
				const architecture = (value.architecture ?? "").toLowerCase();
				if (architecture.includes("arm")) setChip("arm");
				else if (architecture.includes("x86") || architecture.includes("64")) setChip("x64");
			})
			.catch(() => undefined);
		return () => {
			alive = false;
		};
	}, []);

	const href =
		os === "windows"
			? downloads.windowsSetup
			: os === "linux"
				? downloads.appImage
				: os === "mac" && chip === "x64"
					? downloads.macIntel
					: os === "mac" && chip === "arm"
						? downloads.macArm
						: "#download";

	const label =
		os === "windows"
			? "Download for Windows"
			: os === "mac" && chip === "arm"
				? "Download for Apple silicon"
				: os === "mac" && chip === "x64"
					? "Download for Intel Mac"
					: os === "mac"
						? "Download for Mac"
						: os === "linux"
							? "Download for Linux"
							: "Download";

	return { os, chip, href, label, ready: os !== null };
}
