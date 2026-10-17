import type { NextConfig } from "next";

const contentSecurityPolicy = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline'",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: blob:",
	"font-src 'self'",
	"connect-src 'self'",
	"media-src 'self'",
	"worker-src 'self' blob:",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
	"frame-src 'none'",
	"upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
	{ key: "Content-Security-Policy", value: contentSecurityPolicy },
	{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
	{ key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
	cacheComponents: true,
	partialPrefetching: true,
	poweredByHeader: false,
	experimental: {
		useTypeScriptCli: true,
		optimizePackageImports: ["@phosphor-icons/react"],
		inlineCss: true,
	},
	turbopack: {
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: securityHeaders,
			},
			{
				source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|woff|woff2)",
				headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
			},
		];
	},
};

export default nextConfig;
