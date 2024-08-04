import { Details, OptionalDetails } from "@/src/types/apps/personal-log/Details";
import { Subtype } from "@/src/types/apps/personal-log/Subtype";

/**
 * Entertainment details
 * 
 * TODO: Not using this one very much lately, so not gonna really develop it until I need it.
 */
export default function Entertainment({
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
