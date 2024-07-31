"use server";

import PersonalLogWindowManager from "@/src/lib/apps/personalLog/PersonalLogWindowManager";
import PersonalLogClient from "./PersonalLogClient";
import { countLogs } from "@/src/lib/requestTypes";

/**
 * Here show personal logs
 */
export default async function PersonalLog({
    searchParams,
}: {
    searchParams: {
        query?: string;
        page?: string;
    }
}) {
	// Count logs or start from zero
	const logsCount = (await countLogs())?.count as number || 0;
	
	const personalLogWindowManager = new PersonalLogWindowManager({
		pages: logsCount
	});
    personalLogWindowManager.setPerPage(10);
    personalLogWindowManager.setQueryFromSearchParams(searchParams);
    await personalLogWindowManager.update();
	const itemsWindow = personalLogWindowManager.itemsWindow();
	
	return (
		<div>
			<h1>Personal log</h1>
			
			<p>Log your life, and work</p>
			
			<PersonalLogClient
				itemsWindow={itemsWindow}
				logs={personalLogWindowManager.logs}
			/>
		</div>
	);
}
