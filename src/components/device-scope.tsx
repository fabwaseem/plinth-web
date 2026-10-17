"use client";

import type { ReactNode } from "react";
import { useDevice } from "@/lib/device";

export function DeviceScope({ children }: { children: ReactNode }) {
	const device = useDevice();

	return (
		<div className="device-scope" data-os={device.os ?? undefined} data-chip={device.chip ?? undefined}>
			{children}
		</div>
	);
}
