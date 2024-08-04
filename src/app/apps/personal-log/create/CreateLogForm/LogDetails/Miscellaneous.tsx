import { Details, OptionalDetails } from "@/src/types/apps/personal-log/Details";
import { Subtype } from "@/src/types/apps/personal-log/Subtype";

/**
 * Miscellaneous details
 */
export default function Miscellaneous({
	subtype,
	subtypeData,
	setSubtypeData,
}: {
	subtype: Subtype;
	subtypeData: Details<OptionalDetails>
	setSubtypeData: (data: any) => void;
}) {
	return (
		<div>
		</div>
	);
}
