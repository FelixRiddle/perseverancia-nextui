import { parseAbsoluteToLocal } from "@internationalized/date";
import { Button, DateInput } from "@nextui-org/react";

import { MoonIcon } from "@/src/components/Icons/MoonIcon";
import { OptionalDetails } from "@/src/types/apps/personal-log/Details";
import { PersonalLog } from "@/src/types/apps/personal-log/PersonalLog";
import { deleteLog } from "@/src/lib/requestTypes";
import useMessages from "@/src/lib/hooks/useMessages";
import Message from "@/src/types/message/Message";
import { requestWasSuccessful } from "@/src/lib/status/requestWasSuccessful";

/**
 * Log component
 */
export default function Log({
	log,
	setSelected,
	removeLog,
}: {
	log: PersonalLog<OptionalDetails>
	setSelected: (log: PersonalLog<OptionalDetails>) => void;
	removeLog: (log: PersonalLog<OptionalDetails>) => void;
}) {
	const messages = useMessages();
	
	/**
	 * Set selected log
	 */
	function setSelectedLog() {
		setSelected(log);
	}
	
	/**
	 * Delete log
	 */
	async function handleDeleteLog() {
		const response = await deleteLog(log.id);
		
		const responseMessages = response.messages;
		if(responseMessages.length > 0) {
			// Add messages
			responseMessages.forEach((message: Message) => {
				messages.addMessage(message);
			});
		}
		
		const success = requestWasSuccessful(response);
		if(success) {
			// Remove log
			removeLog(log);
		}
	}
	
	return (
		<div>
			<div>
				<span className="text-gray-600 text-xs">
					<DateInput
						aria-label="Date"
						variant="bordered"
						defaultValue={parseAbsoluteToLocal(log.start.toString())}
						hideTimeZone
						isDisabled={true}
					/>
                </span>
                {log.details?. subtype === "Sleep" && <MoonIcon className="ml-2" />}
			</div>
			<p className="mt-2">{log.description}</p>
			
			<div>
				<Button
					className="mt-2 mr-3"
					aria-label="Edit"
					color="warning"
					onClick={setSelectedLog}
				>
					Edit
				</Button>
				
				<Button
					aria-label="Edit"
					color="danger"
					onClick={handleDeleteLog}
				>
					Delete
				</Button>
			</div>
		</div>
	);
}
