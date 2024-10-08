'use client';

import { Accordion, AccordionItem, Tab, Tabs, TimeInput } from "@nextui-org/react";
import CreateLogForm from "./create/CreateLogForm";
import { ItemsWindowInfo } from "@/src/lib/apps/personalLog/PersonalLogWindowManager";
import { PersonalLog } from "@/src/types/apps/personal-log/PersonalLog";
import { OptionalDetails } from "@/src/types/apps/personal-log/Details";
import Log from "./Log";
import { MoonIcon } from "@/src/components/Icons/MoonIcon";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { useState } from "react";

/**
 * Personal log client
 * 
 * TODO: After submit, update the logs
 */
export default function PersonalLogClient({
	itemsWindow,
	logs: personalLogs
}: {
	itemsWindow: ItemsWindowInfo,
	logs: PersonalLog<OptionalDetails>[]
}) {
	const [editLog, setEditLog] = useState<undefined | PersonalLog<OptionalDetails>>(undefined);
	const [logs, setLogs] = useState(personalLogs);
	
	/**
	 * Remove log
	 */
	function handleRemoveLog(log: PersonalLog<OptionalDetails>) {
        setLogs(logs.filter((item) => item.id!== log.id));
    }
    
    /**
     * Update log
     */
    function handleUpdateLog(log: PersonalLog<OptionalDetails>) {
        setLogs(logs.map((item) => item.id === log.id? log : item));
        setEditLog(undefined);
    }
    
    /**
     * Create log
     */
    function handleCreateLog(log: PersonalLog<OptionalDetails>) {
        setLogs([...logs, log]);
    }
	
	return (
		<div className="flex flex-row justify-center items-start">
			{/* On the left show the logs */}
			<Accordion
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
							subtitle={subtype ? subtype : ""}
							indicator={subtype === "Sleep" && <MoonIcon /> }
							startContent={<TimeInput
								aria-label="Date"
								hideTimeZone
								variant="bordered"
								defaultValue={parseAbsoluteToLocal(log.start.toString())}
								isDisabled={true}
							/>}
						>
							<Log
								log={log}
								setSelected={setEditLog}
								removeLog={handleRemoveLog}
							/>
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
						<CreateLogForm
							log={editLog}
							setLog={setEditLog}
						/>
					</Tab>
					<Tab key="Complete create log" title="Complete">
						{/* Complete create log form */}
						<CreateLogForm
							simple={false}
							log={editLog}
							setLog={setEditLog}
						/>
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}
