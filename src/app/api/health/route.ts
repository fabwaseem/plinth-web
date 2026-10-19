import { connection } from "next/server"
import { isDraining } from "@/lib/drain"

export async function GET() {
	// Wait for a real request so Cache Components cannot freeze a prerendered 200.
	await connection()
	const draining = isDraining()
	return Response.json(
		{ status: draining ? "draining" : "ok" },
		{
			status: draining ? 503 : 200,
			headers: { "Cache-Control": "no-store" },
		},
	)
}
