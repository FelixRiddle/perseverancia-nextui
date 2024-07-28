"use server";

import CreateLogForm from "./create/CreateLogForm";

/**
 * Here show personal logs
 */
export default async function PersonalLog() {
	
	return (
		<div>
			<h1>Personal log</h1>
			
			<p>Log your life, and work</p>
			
			{/* On the left show the logs */}
			
			
			{/* On the right show form to create logs */}
			{/* Or the form could be at the top, and below the logs */}
			<CreateLogForm />
		</div>
	);
}
