import { MoonIcon } from "@/src/components/Icons/MoonIcon";
import { OptionalDetails } from "@/src/types/apps/personal-log/Details";
import { PersonalLog } from "@/src/types/apps/personal-log/PersonalLog";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { Button, DateInput } from "@nextui-org/react";
import { useEffect } from "react";

/**
 * Log component
 */
export default function Log({
	log,
	setSelected,
}: {
	log: PersonalLog<OptionalDetails>
	setSelected: (log: PersonalLog<OptionalDetails>) => void;
}) {
	/**
	 * Set selected log
	 */
	function setSelectedLog() {
		setSelected(log);
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
			<Button
				className="mt-2"
				aria-label="Edit"
				color="warning"
				onClick={setSelectedLog}
			>
				Edit
			</Button>
		</div>
	);
}
