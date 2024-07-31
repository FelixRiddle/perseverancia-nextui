'use client';

import { Accordion, AccordionItem, Tab, Tabs, TimeInput } from "@nextui-org/react";
import CreateLogForm from "./create/CreateLogForm";
import { ItemsWindowInfo } from "@/src/lib/apps/personalLog/PersonalLogWindowManager";
import { PersonalLog } from "@/src/types/apps/personal-log/PersonalLog";
import { OptionalDetails } from "@/src/types/apps/personal-log/Details";
import Log from "./Log";
import { MoonIcon } from "@/src/components/Icons/MoonIcon";
import { parseAbsoluteToLocal } from "@internationalized/date";

/**
 * Personal log client
 */
export default function PersonalLogClient({
	itemsWindow,
	logs
}: {
	itemsWindow: ItemsWindowInfo,
	logs: PersonalLog<OptionalDetails>[]
}) {
	return (
		<div className="flex flex-row justify-center items-start">
			{/* On the left show the logs */}
			<Accordion
				// className="w-full flex flex-col"
				style={{maxWidth: "50%", minWidth: "50%"}}
				variant="bordered"
				className="mr-3"
			>
				{logs.map((log) => {
					const subtype = log.details?.subtype;
					return (
						<AccordionItem
							key={log.id}
							aria-label={log.description}
							title={log.type}
							subtitle={log.description}
							indicator={subtype === "Sleep" && <MoonIcon /> }
							startContent={<TimeInput
								aria-label="Date"
								hideTimeZone
								variant="bordered"
								defaultValue={parseAbsoluteToLocal(log.start.toString())}
								isDisabled={true}
							/>}
						>
							<Log log={log} />
						</AccordionItem>
                    );
				})}
			</Accordion>
			
			{/* On the right show form to create logs */}
			<div style={{maxWidth: "50%", minWidth: "50%"}}>
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
