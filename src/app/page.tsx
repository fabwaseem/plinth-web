import { Home } from "@/components/home";
import { getLatestVersion } from "@/lib/release";

export default async function Page() {
	const version = await getLatestVersion();
	return <Home version={version} />;
}
