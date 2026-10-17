"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

export function CopyAddress({ value }: { value: string }) {
	const [copied, setCopied] = useState(false);

	return (
		<button
			type="button"
			className="mt-4 flex w-full items-center justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-4 text-left"
			onClick={() => {
				void navigator.clipboard.writeText(value).then(() => {
					setCopied(true);
					window.setTimeout(() => setCopied(false), 1600);
				});
			}}
		>
			<code className="text-sm break-all">{value}</code>
			<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
				{copied ? <Check size={16} weight="light" /> : <Copy size={16} weight="light" />}
			</span>
		</button>
	);
}
