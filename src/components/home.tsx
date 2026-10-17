"use client";

import {
	AppleLogo,
	Browser,
	ClosedCaptioning,
	DownloadSimple,
	FacebookLogo,
	FilmStrip,
	FolderSimple,
	InstagramLogo,
	LinkSimple,
	LinuxLogo,
	PinterestLogo,
	Playlist,
	Plus,
	Queue,
	RedditLogo,
	SlidersHorizontal,
	SoundcloudLogo,
	Television,
	TiktokLogo,
	TwitchLogo,
	UserCircle,
	VideoCamera,
	WindowsLogo,
	XLogo,
	YoutubeLogo,
	type Icon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { useDevice, type Chip, type Os } from "@/lib/device";
import { downloads, faqs, features, site, steps } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const sources: { name: string; icon: Icon }[] = [
	{ name: "YouTube", icon: YoutubeLogo },
	{ name: "TikTok", icon: TiktokLogo },
	{ name: "Instagram", icon: InstagramLogo },
	{ name: "Facebook", icon: FacebookLogo },
	{ name: "X", icon: XLogo },
	{ name: "Reddit", icon: RedditLogo },
	{ name: "Twitch", icon: TwitchLogo },
	{ name: "Vimeo", icon: VideoCamera },
	{ name: "SoundCloud", icon: SoundcloudLogo },
	{ name: "Dailymotion", icon: FilmStrip },
	{ name: "Pinterest", icon: PinterestLogo },
	{ name: "Bilibili", icon: Television },
];

const featureIcons: Record<string, Icon> = {
	"A browser, when you need one": Browser,
	"A queue you can see": Queue,
	Profiles: UserCircle,
	"Playlists and bulk links": Playlist,
	"Subtitles and chapters": ClosedCaptioning,
};

const stepIcons = [LinkSimple, SlidersHorizontal, FolderSimple];

const queue = [
	{ title: "Evening session", meta: "1080p · mp4", progress: 0.64 },
	{ title: "Field recording", meta: "Audio · m4a", progress: 0.28 },
	{ title: "Playlist · 12 items", meta: "Waiting", progress: 0.08 },
];

type DownloadLink = { id: string; label: string; href: string };

const platforms: { id: Os; name: string; icon: Icon; note: string; links: DownloadLink[] }[] = [
	{
		id: "windows",
		name: "Windows",
		icon: WindowsLogo,
		note: "Setup installs for the current user. Portable runs without an installer.",
		links: [
			{ id: "setup", label: "Setup", href: downloads.windowsSetup },
			{ id: "portable", label: "Portable", href: downloads.windowsPortable },
		],
	},
	{
		id: "mac",
		name: "macOS",
		icon: AppleLogo,
		note: "Separate disks for Apple silicon and Intel. macOS 13 or newer.",
		links: [
			{ id: "arm", label: "Apple silicon", href: downloads.macArm },
			{ id: "x64", label: "Intel", href: downloads.macIntel },
		],
	},
	{
		id: "linux",
		name: "Linux",
		icon: LinuxLogo,
		note: "AppImage for a single file, Flatpak for updates, or a tarball.",
		links: [
			{ id: "appimage", label: "AppImage", href: downloads.appImage },
			{ id: "flatpak", label: "Flatpak", href: downloads.flatpak },
			{ id: "tar", label: "tar.gz", href: downloads.tarball },
		],
	},
];

function preferredLink(os: Os, chip: Chip | null): string | null {
	if (os === "windows") return "setup";
	if (os === "linux") return "appimage";
	if (os === "mac" && chip === "arm") return "arm";
	if (os === "mac" && chip === "x64") return "x64";
	return null;
}

export function Home({ version }: { version: string }) {
	const device = useDevice();

	return (
		<main>
			<section className="px-3 pt-24 pb-8 md:px-6 md:pt-28">
				<motion.div
					className="mx-auto max-w-6xl overflow-hidden rounded-[1.4rem] border border-border bg-card shadow-[var(--panel-glow)]"
					initial={{ opacity: 0, y: 28, scale: 0.98 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.8, ease }}
				>
					<div className="flex items-center gap-3 border-b border-border px-4 py-3">
						<span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
						<span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
						<span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
						<p className="ml-2 text-sm font-medium">Plinth</p>
						<p className="ml-auto font-mono text-xs text-muted-foreground">{version}</p>
					</div>
					<div className="grid lg:grid-cols-[1.15fr_0.85fr]">
						<div className="p-5 md:p-8">
							<p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">Browse</p>
							<h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight md:text-6xl md:leading-[1.05]">Save the video. Keep the file.</h1>
							<p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
								A desktop app for Windows, macOS, and Linux. Paste a link, pick a format, and the file lands in a folder you choose.
							</p>
							<div className="mt-6 flex flex-wrap items-center gap-3">
								<a href={device.href} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
									<DownloadSimple size={20} weight="bold" />
									{device.label}
								</a>
								<a href={site.release} className="rounded-full px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
									Release notes
								</a>
							</div>
							<div className="mt-8 rounded-2xl border border-border bg-field px-4 py-3 text-sm text-muted-foreground">Search or paste a link</div>
							<motion.div
								className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4"
								initial="hidden"
								animate="show"
								variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.25 } } }}
							>
								{sources.map((source) => (
									<motion.div
										key={source.name}
										className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-background px-2 py-4"
										variants={{
											hidden: { opacity: 0, y: 16, scale: 0.86 },
											show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 280, damping: 22 } },
										}}
										whileHover={{ y: -6, scale: 1.04 }}
									>
										<source.icon size={44} weight="duotone" />
										<span className="text-[11px] font-medium text-muted-foreground">{source.name}</span>
									</motion.div>
								))}
							</motion.div>
						</div>
						<div className="border-t border-border bg-secondary/70 p-5 md:p-8 lg:border-t-0 lg:border-l">
							<p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">Queue</p>
							<div className="mt-4 space-y-3">
								{queue.map((row, index) => (
									<motion.div
										key={row.title}
										className="rounded-2xl border border-border bg-card p-4"
										initial={{ opacity: 0, x: 24 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.35 + index * 0.12, duration: 0.6, ease }}
									>
										<div className="flex items-center justify-between gap-3 text-sm">
											<span className="font-medium">{row.title}</span>
											<span className="font-mono text-xs text-muted-foreground">{Math.round(row.progress * 100)}%</span>
										</div>
										<p className="mt-1 text-xs text-muted-foreground">{row.meta}</p>
										<div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
											<motion.div
												className="h-full origin-left rounded-full bg-primary"
												initial={{ scaleX: 0.05 }}
												animate={{ scaleX: [0.08, row.progress, Math.max(0.12, row.progress - 0.2), row.progress] }}
												transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
											/>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			</section>

			<div className="overflow-hidden border-y border-border bg-secondary py-5">
				<div className="marquee flex w-max items-center gap-12 pr-12">
					{[...sources, ...sources].map((source, index) => (
						<span key={`${source.name}-${index}`} className="flex items-center gap-3 text-muted-foreground">
							<source.icon size={36} weight="duotone" />
							<span className="text-sm font-medium tracking-[0.14em] uppercase">{source.name}</span>
						</span>
					))}
				</div>
			</div>

			<section id="product" className="px-6 py-24">
				<div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
					{steps.map((step, index) => {
						const Icon = stepIcons[index] ?? LinkSimple;
						return (
							<Reveal key={step.index} delay={index * 0.08}>
								<article className="h-full rounded-[1.4rem] border border-border bg-card p-7 shadow-[var(--panel-glow)]">
									<motion.div whileHover={{ y: -8, rotate: -4 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
										<Icon size={72} weight="duotone" />
									</motion.div>
									<p className="mt-6 font-mono text-xs text-muted-foreground">{step.index}</p>
									<h2 className="mt-2 text-2xl font-semibold tracking-tight">{step.title}</h2>
									<p className="mt-3 leading-7 text-muted-foreground">{step.body}</p>
								</article>
							</Reveal>
						);
					})}
				</div>
			</section>

			<section className="bg-secondary px-6 pt-24 pb-28">
				<div className="mx-auto max-w-6xl">
					<Reveal>
						<p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">Inside the app</p>
						<h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">The desk you work from.</h2>
					</Reveal>
					<div className="mt-10 grid gap-4 md:grid-cols-6">
						{features.map((feature, index) => {
							const Icon = featureIcons[feature.title] ?? Browser;
							return (
								<Reveal
									key={feature.title}
									delay={index * 0.06}
									className={feature.span === "wide" ? "md:col-span-4 md:row-span-2" : feature.span === "half" ? "md:col-span-3" : "md:col-span-2"}
								>
									<article className="flex h-full flex-col justify-between rounded-[1.4rem] border border-border bg-card p-7 shadow-[var(--panel-glow)]">
										<motion.div whileHover={{ scale: 1.06, y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
											<Icon size={feature.span === "wide" ? 96 : 72} weight="duotone" />
										</motion.div>
										<div>
											<h3 className="mt-8 text-2xl font-semibold tracking-tight">{feature.title}</h3>
											<p className="mt-3 max-w-sm leading-7 text-muted-foreground">{feature.body}</p>
										</div>
									</article>
								</Reveal>
							);
						})}
					</div>
				</div>
			</section>

			<section id="download" className="px-6 py-24">
				<div className="mx-auto max-w-6xl">
					<Reveal>
						<p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">Download {version}</p>
						<h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
							{device.ready ? `This machine is ${platforms.find((item) => item.id === device.os)?.name ?? "ready"}.` : "Take the build for your system."}
						</h2>
						<p className="mt-4 max-w-xl leading-7 text-muted-foreground">
							These files are the public GitHub release. Windows SmartScreen and macOS Gatekeeper will ask an extra question because the builds are not yet signed with a paid certificate.
						</p>
					</Reveal>
					<div className="mt-10 grid gap-4 lg:grid-cols-3">
						{platforms.map((platform, index) => {
							const selected = device.os === platform.id;
							const linkId = selected ? preferredLink(platform.id, device.chip) : null;
							const Icon = platform.icon;
							return (
								<motion.article
									key={platform.id}
									className="relative flex flex-col rounded-[1.4rem] border border-border bg-card p-6"
									style={selected ? { background: "var(--choice-selected)", boxShadow: "var(--choice-selected-shadow)" } : { boxShadow: "var(--panel-glow)" }}
									initial={{ opacity: 0, y: 24 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-40px" }}
									transition={{ delay: index * 0.08, duration: 0.6, ease }}
									whileHover={{ y: -6 }}
								>
									{selected ? (
										<motion.span
											className="absolute top-5 right-5 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase"
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
										>
											This device
										</motion.span>
									) : null}
									<Icon size={72} weight="duotone" />
									<h3 className="mt-6 text-2xl font-semibold tracking-tight">{platform.name}</h3>
									<p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{platform.note}</p>
									<div className="mt-6 flex flex-wrap gap-2">
										{platform.links.map((link) => {
											const hot = link.id === linkId;
											return (
												<a
													key={link.href}
													href={link.href}
													className={
														hot
															? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
															: "rounded-full border border-border px-4 py-2 text-sm hover:border-foreground"
													}
												>
													{link.label}
												</a>
											);
										})}
									</div>
								</motion.article>
							);
						})}
					</div>
					<div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
						<a href={downloads.checksums} className="hover:text-foreground">
							SHA256SUMS
						</a>
						<a href={site.release} className="hover:text-foreground">
							All release files
						</a>
						<span>Scoop: add the plinth bucket, then install plinth</span>
						<span>Homebrew: brew tap fabwaseem/plinth</span>
					</div>
				</div>
			</section>

			<section className="bg-secondary px-6 py-24">
				<div className="mx-auto max-w-3xl">
					<Reveal>
						<h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Questions</h2>
					</Reveal>
					<div className="mt-8">
						{faqs.map((item) => (
							<Faq key={item.q} question={item.q} answer={item.a.replaceAll("{version}", version)} />
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

function Faq({ question, answer }: { question: string; answer: string }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="border-b border-border">
			<button type="button" className="flex w-full items-center justify-between gap-6 py-5 text-left" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
				<span className="text-lg font-medium">{question}</span>
				<Plus size={22} weight="bold" className={`shrink-0 transition-transform duration-300 ${open ? "rotate-45" : "text-muted-foreground"}`} />
			</button>
			<AnimatePresence initial={false}>
				{open ? (
					<motion.p
						className="overflow-hidden pb-5 leading-7 text-muted-foreground"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.35, ease }}
					>
						{answer}
					</motion.p>
				) : null}
			</AnimatePresence>
		</div>
	);
}
