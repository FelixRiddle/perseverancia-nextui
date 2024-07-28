"use server";

import { appsInfo } from "@/src/config/appsInfo";
import AppCard from "./AppCard";

/**
 * Apps page
 */
export default async function Page() {
	return (
		<div>
			<h1>Apps</h1>
			
			{appsInfo.map((appInfo) => {
				return (
					<AppCard key={appInfo.pagePath} app={appInfo} />
				)
			})}
		</div>
	);
}
