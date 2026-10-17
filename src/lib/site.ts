export const site = {
	name: "Plinth",
	url: "https://plinth.fabwaseem.com",
	description:
		"A desktop app for saving video, audio, playlists, and subtitles from YouTube and thousands of other sites onto your computer.",
	github: "https://github.com/fabwaseem/plinth",
	release: "https://github.com/fabwaseem/plinth/releases/latest",
	issues: "https://github.com/fabwaseem/plinth/issues",
	author: "Waseem Anjum",
	usdt: "0x90008a64e57438ad8ae3c8bee9cfeb70b8eee74d",
} as const

export const packages = {
	winget: "https://winget.run/pkg/WaseemAnjum/Plinth",
	scoop: "https://github.com/fabwaseem/scoop-bucket",
	homebrew: "https://github.com/fabwaseem/homebrew-plinth",
} as const

export const downloads = {
	windowsSetup: "https://github.com/fabwaseem/plinth/releases/latest/download/Plinth-win-x64-Setup.exe",
	windowsPortable: "https://github.com/fabwaseem/plinth/releases/latest/download/Plinth-win-x64-Portable.exe",
	macArm: "https://github.com/fabwaseem/plinth/releases/latest/download/Plinth-mac-arm64.dmg",
	macIntel: "https://github.com/fabwaseem/plinth/releases/latest/download/Plinth-mac-x64.dmg",
	appImage: "https://github.com/fabwaseem/plinth/releases/latest/download/Plinth-linux-x64.AppImage",
	flatpak: "https://github.com/fabwaseem/plinth/releases/latest/download/Plinth-linux-x64.flatpak",
	tarball: "https://github.com/fabwaseem/plinth/releases/latest/download/Plinth-linux-x64.tar.gz",
	checksums: "https://github.com/fabwaseem/plinth/releases/latest/download/SHA256SUMS",
} as const

export const sources = [
	"YouTube",
	"TikTok",
	"Instagram",
	"Facebook",
	"X",
	"Reddit",
	"Twitch",
	"Vimeo",
	"SoundCloud",
	"Dailymotion",
	"Pinterest",
	"Bilibili",
] as const

export const steps = [
	{
		index: "01",
		title: "Paste a link",
		body: "Drop in one URL, or a whole list. Plinth reads the page and shows what can be saved.",
	},
	{
		index: "02",
		title: "Pick the file",
		body: "Choose video, audio, or subtitles. Set quality, chapters, and a filename that stays readable.",
	},
	{
		index: "03",
		title: "Choose a folder",
		body: "Files land in a folder you pick. The queue keeps running while you line up the next one.",
	},
] as const

export const features = [
	{
		title: "A browser, when you need one",
		body: "Browse opens with a search field and the sites people actually use. Open a page, then save it.",
		span: "wide",
	},
	{
		title: "A queue you can see",
		body: "Pause, resume, or clear finished items. Each row keeps its own status.",
		span: "stack",
	},
	{
		title: "Profiles",
		body: "Save a destination, a format, and a filename pattern, then reuse them.",
		span: "stack",
	},
	{
		title: "Playlists and bulk links",
		body: "Hand Plinth a playlist or a block of URLs. It walks them without a terminal.",
		span: "half",
	},
	{
		title: "Subtitles and chapters",
		body: "Sidecar subtitles, embedded chapters, and sponsor segments when you want them cut.",
		span: "half",
	},
] as const

export const faqs = [
	{
		q: "Is Plinth free?",
		a: "Yes. Plinth is MIT licensed. There is no account, no ad, and no download cap in the app.",
	},
	{
		q: "Where do the files go?",
		a: "Onto a folder on your computer. Plinth does not upload the video to a server of ours.",
	},
	{
		q: "Which sites work?",
		a: "The browse screen starts with YouTube, TikTok, Instagram, and nine other sources. Pasting a link uses yt-dlp, which covers a much wider catalog.",
	},
	{
		q: "Why does Windows or macOS warn me?",
		a: "The {version} builds are not signed with a paid certificate and the Mac app is not notarized. The download page explains the click-through for each system. Check SHA256SUMS if you want to confirm the file.",
	},
	{
		q: "How do updates work?",
		a: "The installed app checks GitHub releases and can update itself. Scoop, Homebrew, and Flatpak follow their own package sources.",
	},
	{
		q: "Do I have to sign in?",
		a: "No. Signing in is only for pages that hide the media until you are logged in. If you do, use a secondary account.",
	},
] as const

export const nav = [
	{ href: "/#product", label: "Product" },
	{ href: "/#download", label: "Download" },
	{ href: "/support", label: "Support" },
	{ href: "/privacy", label: "Privacy" },
] as const
