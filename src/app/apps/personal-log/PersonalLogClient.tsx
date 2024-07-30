'use client';

import { Tab, Tabs } from "@nextui-org/react";
import CreateLogForm from "./create/CreateLogForm";

/**
 * Personal log client
 */
export default function PersonalLogClient() {
	return (
		<div className="flex flex-col justify-center items-center">
			{/* On the left show the logs */}
			<div className="w-full">
			</div>
			
			{/* On the right show form to create logs */}
			<div>
				<Tabs aria-label="Create log formularies" variant="bordered">
					<Tab key="Fast create log" title="Simple">
						{/* The fast log creation form omits any field that requires a
							later update like: update, until, untilTimeAccurate */}
						{/* Also omit miscellaneous fields, like 'mixed' */}
						<CreateLogForm />
					</Tab>
					<Tab key="Complete create log" title="Complete">
						{/* Complete create log form */}
						<CreateLogForm simple={false} />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}
