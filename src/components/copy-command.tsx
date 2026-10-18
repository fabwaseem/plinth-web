"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

export function CopyCommand({ value }: { value: string }) {
	const [copied, setCopied] = useState(false);

	return (
		<div className="relative mt-2 flex items-center gap-2 rounded-2xl border border-border bg-secondary py-1.5 pr-1.5 pl-3">
			<pre className="min-w-0 flex-1 overflow-x-auto py-2 font-mono text-sm leading-5 text-foreground">
				<code className="break-words whitespace-pre-wrap" translate="no">
					{value}
				</code>
			</pre>
			<button
				type="button"
				className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
				aria-label={copied ? "Copied the Terminal command" : "Copy the Terminal command"}
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
				{copied ? <Check size={16} weight="bold" aria-hidden /> : <Copy size={16} weight="bold" aria-hidden />}
			</button>
			<p className="sr-only" aria-live="polite">
				{copied ? "Terminal command copied to the clipboard" : ""}
			</p>
		</div>
	);
}
