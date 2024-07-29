import Entertainment from "./Entertainment";
import Miscellaneous from "./Miscellaneous";
import Programming from "./Programming";
import Workout from "./Workout";

export type DetailsType = "Entertainment" | "Programming" | "Workout" | "Miscellaneous" | undefined;

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
			<h1>Details</h1>
			{detailsType === "Programming" && (
				<Programming />
			) || detailsType === "Workout" && (
				<Workout />
			) || detailsType === "Entertainment" && (
				<Entertainment />
			) || detailsType === "Miscellaneous" && (
				<Miscellaneous />
			)}
		</div>
	);
}
