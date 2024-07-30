"use server";

import { Tab, Tabs } from "@nextui-org/react";
import CreateLogForm from "./create/CreateLogForm";

/**
 * Here show personal logs
 */
export default async function PersonalLog() {
	
	return (
		<div>
			<h1>Personal log</h1>
			
			<p>Log your life, and work</p>
			
			<div className="flex flex-col justify-center items-center">
				{/* On the left show the logs */}
				<div className="w-full">
				</div>
				
				{/* On the right show form to create logs */}
				<Tabs>
					<Tab>
						{/* TODO: On the left, selected by default the fast log creation */}
						{/* The fast log creation form omits any field that requires a
							later update like: update, until, untilTimeAccurate */}
					</Tab>
					<Tab>
						{/* Complete create log form */}
						<CreateLogForm />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}
