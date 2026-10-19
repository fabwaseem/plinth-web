import { Plus } from "@phosphor-icons/react/ssr";
import { CopyCommand } from "@/components/copy-command";

const quarantineCommand = "xattr -dr com.apple.quarantine /Applications/Plinth.app";

function MacInstallBody({ dense = false }: { dense?: boolean }) {
	return (
		<div className={dense ? "space-y-3 text-sm leading-6 text-pretty text-muted-foreground" : "space-y-4 text-pretty text-muted-foreground"}>
			<p>
				{'The first time you open Plinth, macOS may show "Apple could not verify Plinth". Open System Settings > Privacy & Security, click Open Anyway, and confirm.'}
			</p>
			<p>{"Plinth is open-source and isn't notarized by Apple yet."}</p>
			<div>
				<p className="font-medium text-foreground">Advanced alternative, in Terminal</p>
				<CopyCommand value={quarantineCommand} />
			</div>
		</div>
	);
}

export function MacInstallHelp({ variant = "note" }: { variant?: "note" | "section" }) {
	if (variant === "section") {
		return (
			<section id="macos" className="scroll-mt-28">
				<h2>Installing on macOS</h2>
				<div className="mt-4">
					<MacInstallBody />
				</div>
			</section>
		);
	}

	return (
		<details data-macos-install className="platform-card group min-w-0 rounded-[1.4rem] border border-border bg-card px-6">
			<summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-foreground">
				<h4 className="text-sm font-medium">Installing on macOS</h4>
				<Plus size={18} weight="bold" aria-hidden className="shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none" />
			</summary>
			<div className="pb-6">
				<MacInstallBody dense />
			</div>
		</details>
	);
}
