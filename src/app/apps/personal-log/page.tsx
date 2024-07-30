"use server";

import PersonalLogClient from "./PersonalLogClient";

/**
 * Here show personal logs
 */
export default async function PersonalLog() {
	
	return (
		<div>
			<h1>Personal log</h1>
			
			<p>Log your life, and work</p>
			
			<PersonalLogClient />
		</div>
	);
}
