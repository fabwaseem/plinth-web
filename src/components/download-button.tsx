"use client";

import { DownloadSimple } from "@phosphor-icons/react";
import { useDevice } from "@/lib/device";

const longestLabel = "Download for Apple silicon";

export function DownloadButton({
	variant = "hero",
	className = "",
}: {
	variant?: "hero" | "header";
	className?: string;
}) {
	const device = useDevice();
	const compact = variant === "header";

	return (
		<a href={device.href} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground ${className}`}>
			<DownloadSimple size={compact ? 18 : 20} weight="bold" aria-hidden />
			{compact ? (
				<>
					<span className="xl:hidden">Download</span>
					<span className="hidden xl:inline-grid">
						<span className="invisible col-start-1 row-start-1" aria-hidden="true">
							{longestLabel}
						</span>
						<span className="col-start-1 row-start-1">{device.label}</span>
					</span>
				</>
			) : (
				<span className="inline-grid text-left">
					<span className="invisible col-start-1 row-start-1" aria-hidden="true">
						{longestLabel}
					</span>
					<span className="col-start-1 row-start-1">{device.label}</span>
				</span>
			)}
		</a>
	);
}
