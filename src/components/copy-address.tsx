"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

export function CopyAddress({ value }: { value: string }) {
	const [copied, setCopied] = useState(false);

	return (
		<div className="mt-4">
			<button
				type="button"
				className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left"
				onClick={() => {
					void navigator.clipboard.writeText(value).then(
						() => {
							setCopied(true);
							window.setTimeout(() => setCopied(false), 1600);
						},
						() => setCopied(false),
					);
				}}
			>
				<code className="text-sm break-all">{value}</code>
				<span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
					{copied ? <Check size={16} weight="bold" /> : <Copy size={16} weight="bold" />}
				</span>
				<span className="sr-only">{copied ? "Copied the USDT address" : "Copy the USDT address"}</span>
			</button>
			<p className="sr-only" aria-live="polite">
				{copied ? "USDT address copied to the clipboard" : ""}
			</p>
		</div>
	);
}
