import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const regular = readFileSync(join(process.cwd(), "src/assets/fonts/Poppins-Regular.ttf"));
const semibold = readFileSync(join(process.cwd(), "src/assets/fonts/Poppins-SemiBold.ttf"));

export function createOgImage({
	eyebrow,
	title,
	subtitle,
}: {
	eyebrow: string;
	title: string;
	subtitle: string;
}) {
	return new ImageResponse(
				(
					<div
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							background: "#F3EFE8",
							padding: 48,
							fontFamily: "Poppins",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								width: "100%",
								height: "100%",
								borderRadius: 28,
								background: "#FBFAF7",
								borderWidth: 1,
								borderStyle: "solid",
								borderColor: "#E4DCD2",
								padding: "52px 56px",
								color: "#2A2420",
							}}
						>
							<div style={{ display: "flex", alignItems: "center", gap: 18 }}>
								<PlinthMark size={64} />
								<div style={{ display: "flex", fontSize: 32, fontWeight: 600 }}>Plinth</div>
							</div>
<div style={{ display: "flex", flexDirection: "column", width: 980 }}>
								<div
									style={{
										display: "flex",
										fontSize: 18,
										letterSpacing: 3,
										textTransform: "uppercase",
										color: "#5C564F",
										fontWeight: 600,
									}}
								>
									{eyebrow}
								</div>
								<div
									style={{
										display: "flex",
										width: 960,
										fontSize: 58,
										fontWeight: 600,
										lineHeight: 1.08,
										letterSpacing: -1.2,
										marginTop: 14,
									}}
								>
									{title}
								</div>
								<div
									style={{
										display: "flex",
										width: 900,
										fontSize: 26,
										lineHeight: 1.35,
										color: "#3F3A35",
										marginTop: 16,
										fontWeight: 600,
									}}
								>
									{subtitle}
								</div>
							</div>
						<div style={{ display: "flex", fontSize: 22, color: "#5C564F" }}>plinth.fabwaseem.com</div>
					</div>
				</div>
			),
		{
			...ogSize,
			fonts: [
				{ name: "Poppins", data: regular, weight: 400, style: "normal" },
				{ name: "Poppins", data: semibold, weight: 600, style: "normal" },
			],
		},
	);
}

export function createIcon(size: number) {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					background: "#2A2420",
				}}
			>
				<PlinthMark size={size} />
			</div>
		),
		{ width: size, height: size },
	);
}

function PlinthMark({ size }: { size: number }) {
	const bar = Math.max(4, Math.round(size * 0.11));
	return (
		<div
			style={{
				width: size,
				height: size,
				borderRadius: Math.round(size * 0.22),
				background: "#2A2420",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: Math.max(3, Math.round(size * 0.07)),
			}}
		>
			<div style={{ width: Math.round(size * 0.32), height: bar, borderRadius: 2, background: "#F4EFE6" }} />
			<div style={{ width: Math.round(size * 0.5), height: bar, borderRadius: 2, background: "#E4DCD2" }} />
			<div style={{ width: Math.round(size * 0.68), height: bar, borderRadius: 2, background: "#F4EFE6" }} />
		</div>
	);
}
