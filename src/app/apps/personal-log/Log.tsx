import { MoonIcon } from "@/src/components/Icons/MoonIcon";
import { OptionalDetails } from "@/src/types/apps/personal-log/Details";
import { PersonalLog } from "@/src/types/apps/personal-log/PersonalLog";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateInput } from "@nextui-org/react";

export default function Log({
	log
}: {
	log: PersonalLog<OptionalDetails>
}) {
	
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
		</div>
	);
}
