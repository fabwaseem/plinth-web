import type { Icon } from "@phosphor-icons/react";
import {
	AppleLogo,
	Browser,
	ClosedCaptioning,
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
} from "@phosphor-icons/react/ssr";
import { DeviceScope } from "@/components/device-scope";
import { DownloadButton } from "@/components/download-button";
import { MacInstallHelp } from "@/components/mac-install-help";
import { downloads, faqs, features, packages, site, steps } from "@/lib/site";

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

const platforms: { id: string; name: string; icon: Icon; note: string; links: { id: string; label: string; href: string }[] }[] = [
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

export function Home({ version }: { version: string }) {
	return (
		<>
			<section className="px-4 pt-24 pb-8 sm:px-6 md:pt-28">
				<div className="mx-auto max-w-6xl overflow-hidden rounded-[1.4rem] border border-border bg-card shadow-[var(--panel-glow)]">
					<div className="flex items-center gap-3 border-b border-border px-4 py-3">
						<span aria-hidden className="h-2.5 w-2.5 rounded-full bg-border-strong" />
						<span aria-hidden className="h-2.5 w-2.5 rounded-full bg-border-strong" />
						<span aria-hidden className="h-2.5 w-2.5 rounded-full bg-border-strong" />
						<p className="ml-2 text-sm font-medium">Plinth</p>
						<p className="ml-auto font-mono text-xs text-muted-foreground">{version}</p>
					</div>
					<div className="grid lg:grid-cols-[1.15fr_0.85fr]">
						<div className="p-5 sm:p-8">
							<p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">Browse</p>
							<h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl md:leading-[1.05]">
								Save the video. Keep the file.
							</h1>
							<p className="mt-4 max-w-md text-base leading-7 text-pretty text-muted-foreground">
								A desktop app for Windows, macOS, and Linux. Paste a link, pick a format, and the file lands in a folder you choose.
							</p>
							<div className="mt-6 flex flex-wrap items-center gap-3">
								<DownloadButton />
								<a href={site.release} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-muted-foreground hover:text-foreground">
									Read the release notes
								</a>
							</div>
							<p className="mt-8 rounded-2xl border border-border bg-field px-4 py-3 text-sm text-muted-foreground">Search or paste a link</p>
							<ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
								{sources.map((source) => (
									<li key={source.name} className="source-tile flex flex-col items-center gap-2 rounded-2xl border border-border bg-background px-2 py-4 text-center">
										<source.icon size={44} weight="duotone" aria-hidden />
										<span className="text-xs leading-4 font-medium text-muted-foreground">{source.name}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="border-t border-border bg-secondary/70 p-5 sm:p-8 lg:border-t-0 lg:border-l">
							<p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">Queue</p>
							<ul className="mt-4 space-y-3">
								{queue.map((row, index) => (
									<li key={row.title} className="rounded-2xl border border-border bg-card p-4">
										<div className="flex items-center justify-between gap-3 text-sm">
											<span className="font-medium">{row.title}</span>
											<span className="font-mono text-xs text-muted-foreground">{Math.round(row.progress * 100)}%</span>
										</div>
										<p className="mt-1 text-xs text-muted-foreground">{row.meta}</p>
										<div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
											<div className="bar-fill h-full origin-left rounded-full bg-primary" style={{ transform: `scaleX(${row.progress})`, animationDelay: `${index * 120}ms` }} />
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<div className="overflow-hidden border-y border-border bg-secondary py-5" aria-hidden>
				<div className="marquee flex w-max items-center gap-12 pr-12">
					{[...sources, ...sources].map((source, index) => (
						<span key={`${source.name}-${index}`} className="flex items-center gap-3 text-muted-foreground">
							<source.icon size={36} weight="duotone" />
							<span className="text-xs font-medium tracking-[0.14em] uppercase">{source.name}</span>
						</span>
					))}
				</div>
			</div>

			<section id="product" className="scroll-mt-28 px-4 py-20 sm:px-6 md:py-28">
				<div className="mx-auto max-w-6xl">
					<h2 className="sr-only">How Plinth works</h2>
					<div className="grid gap-4 md:grid-cols-3">
						{steps.map((step, index) => {
							const Icon = stepIcons[index] ?? LinkSimple;
							return (
								<article key={step.index} className="panel flex h-full flex-col rounded-[1.4rem] border border-border bg-card p-6 shadow-[var(--panel-glow)] sm:p-7">
									<Icon size={72} weight="duotone" aria-hidden />
									<p className="mt-6 font-mono text-xs text-muted-foreground">{step.index}</p>
									<h3 className="mt-2 text-2xl font-semibold tracking-tight text-balance">{step.title}</h3>
									<p className="mt-3 leading-7 text-pretty text-muted-foreground">{step.body}</p>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			<section className="bg-secondary px-4 pt-20 pb-24 sm:px-6 md:pt-28 md:pb-32">
				<div className="mx-auto max-w-6xl">
					<p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">Inside the app</p>
					<h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">The desk you work from.</h2>
					<div className="mt-10 grid gap-4 md:grid-cols-6">
						{features.map((feature) => {
							const Icon = featureIcons[feature.title] ?? Browser;
							return (
								<article
									key={feature.title}
									className={`panel flex h-full flex-col justify-between rounded-[1.4rem] border border-border bg-card p-6 shadow-[var(--panel-glow)] sm:p-7 ${
										feature.span === "wide" ? "md:col-span-4 md:row-span-2" : feature.span === "half" ? "md:col-span-3" : "md:col-span-2"
									}`}
								>
									<Icon size={feature.span === "wide" ? 96 : 72} weight="duotone" aria-hidden />
									<div>
										<h3 className="mt-8 text-2xl font-semibold tracking-tight text-balance">{feature.title}</h3>
										<p className="mt-3 max-w-sm leading-7 text-pretty text-muted-foreground">{feature.body}</p>
									</div>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			<section id="download" className="scroll-mt-28 px-4 py-20 sm:px-6 md:py-28">
				<div className="mx-auto max-w-6xl">
					<p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">Download {version}</p>
					<h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">Take the build for your system.</h2>
					<p className="mt-4 max-w-xl leading-7 text-pretty text-muted-foreground">
						These files are the public GitHub release. Windows SmartScreen and macOS Gatekeeper will ask an extra question because the builds are not yet signed with a paid certificate.
					</p>
					<DeviceScope>
						<div className="mt-10 grid items-start gap-4 lg:grid-cols-3">
							{platforms.map((platform) => {
								const Icon = platform.icon;
								return (
									<div key={platform.id} className="flex min-w-0 flex-col gap-3">
										<article data-platform={platform.id} className="platform-card relative flex min-w-0 flex-col rounded-[1.4rem] border border-border bg-card p-6">
											<span className="device-badge absolute top-5 right-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground uppercase">
												This device
											</span>
											<Icon size={72} weight="duotone" aria-hidden />
											<h3 className="mt-6 text-2xl font-semibold tracking-tight">{platform.name}</h3>
											<p className="mt-2 min-h-12 text-sm leading-6 text-pretty text-muted-foreground">{platform.note}</p>
											<div className="mt-6 flex flex-wrap gap-2">
												{platform.links.map((link) => (
													<a key={link.href} href={link.href} data-link={link.id} className="download-link" aria-label={`Download Plinth for ${platform.name}, ${link.label}`}>
														{link.label}
													</a>
												))}
											</div>
										</article>
										{platform.id === "mac" ? <MacInstallHelp /> : null}
									</div>
								);
							})}
						</div>
					</DeviceScope>
					<ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
						<li>
							<a href={downloads.checksums} className="inline-flex min-h-11 items-center hover:text-foreground">
								Verify the SHA256 checksums
							</a>
						</li>
						<li>
							<a href={site.release} className="inline-flex min-h-11 items-center hover:text-foreground">
								Browse all release files
							</a>
						</li>
						<li>
							<a href={packages.winget} className="inline-flex min-h-11 items-center hover:text-foreground">
								Install with Winget
							</a>
						</li>
						<li>
							<a href={packages.scoop} className="inline-flex min-h-11 items-center hover:text-foreground">
								Install with Scoop
							</a>
						</li>
						<li>
							<a href={packages.homebrew} className="inline-flex min-h-11 items-center hover:text-foreground">
								Install with Homebrew
							</a>
						</li>
					</ul>
				</div>
			</section>

			<section className="bg-secondary px-4 py-20 sm:px-6 md:py-28">
				<div className="mx-auto max-w-3xl">
					<h2 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">Questions</h2>
					<div className="mt-8">
						{faqs.map((item) => (
							<details key={item.q} className="group border-b border-border">
								<summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4">
									<h3 className="text-lg font-medium">{item.q}</h3>
									<Plus size={22} weight="bold" aria-hidden className="shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45" />
								</summary>
								<p className="pb-5 leading-7 text-pretty text-muted-foreground">{item.a.replaceAll("{version}", version)}</p>
							</details>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
