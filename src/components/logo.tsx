import Image from "next/image";

export function Logo({ size = 28, priority = false }: { size?: number; priority?: boolean }) {
	return <Image src="/logo.svg" alt="" width={size} height={size} priority={priority} unoptimized />;
}
