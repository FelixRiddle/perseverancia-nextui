import { OptionalDetails } from "@/src/types/apps/personal-log/Details";
import { PersonalLog } from "@/src/types/apps/personal-log/PersonalLog";

export default function Log({
	log
}: {
	log: PersonalLog<OptionalDetails>
}) {
	
	return (
		<div className="p-4 border-b border-gray-200">
			<p>{log.description}</p>
		</div>
	);
}
