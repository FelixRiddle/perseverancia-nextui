import Entertainment from "./Entertainment";
import Programming from "./Programming";
import Workout from "./Workout";

export type DetailsType = "Entertainment" | "Programming" | "Workout" | undefined;

/**
 * Log details
 * 
 * TODO: The user can create a custom form
 */
export default function LogDetails({
	detailsType
}: {
	detailsType?: DetailsType,
}) {
	if(!detailsType) {
		return null;
	}
	
	return (
		<div>
			{detailsType === "Programming" && (
				<Programming />
			) || detailsType === "Workout" && (
				<Workout />
			) || detailsType === "Entertainment" && (
				<Entertainment />
			)}
		</div>
	);
}
