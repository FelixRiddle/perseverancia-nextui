import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

import { LogType } from "../CreateLogForm";
import Entertainment from "./Entertainment";
import Miscellaneous from "./Miscellaneous";
import Programming from "./Programming";
import Workout from "./Workout";

// The data is hard to describe because it's too dynamic.
export type CreationSubtypes = "Programming";
export type WorkoutSubtypes = "Sport" | "Walk" | "Rope" | "Lifting";
export type EntertainmentSubtypes = "Music" | "Movie" | "Book" | "Show" | "Novel" | "Podcast";
export type MiscellaneousSubtypes = "Sleep";
export type Subtype = CreationSubtypes | WorkoutSubtypes | undefined;

export const ENTERTAINMENT_SUBTYPES = ["Music", "Movie", "Book", "Show", "Novel", "Podcast"];
export const WORKOUT_SUBTYPES = ["Sport", "Walk", "Rope", "Lifting"];
export const MISCELLANEOUS_SUBTYPES = ["Sleep"];
export const SUBTYPE_TYPES = ["Sleep", ...WORKOUT_SUBTYPES];

/**
 * Log details
 * 
 * TODO: The user can create a custom form
 */
export default function LogDetails({
	logType
}: {
	logType?: LogType,
}) {
	if(!logType) {
		return null;
	}
	
	const [subtype, setSubtype] = useState<Subtype>(undefined);
	
	function selectType(e: React.ChangeEvent<{ value: string }>) {
		const selected = e.target.value;
		if(typeof selected === "string") {
			if (SUBTYPE_TYPES.includes(selected)) {
				setSubtype(selected as Subtype);
			} else {
				throw Error(`Selected subtype is not a valid subtype: ${selected}`);
			}
		}
	}
	
	return (
		<div>
			<h1>Details</h1>
			<div className="pt-3">
				<label htmlFor="type" className="pr-3">Subtype</label>
				<Select 
					label="Select log type"
					aria-label="Select log type" 
					className="max-w-xs"
					name="type"
					onChange={selectType}
					defaultSelectedKeys={["Miscellaneous"]}
				>
					{SUBTYPE_TYPES.map((currentLogType) => {
						return (
							<SelectItem
								key={currentLogType}
							>
								{currentLogType}
							</SelectItem>
						);
					})}
				</Select>
			</div>
			
			{subtype && (
				<>
					{subtype === "Programming" && (
						<Programming />
					) || WORKOUT_SUBTYPES.includes(subtype)  && (
						<Workout subtype={subtype} />
					) || ENTERTAINMENT_SUBTYPES.includes(subtype) && (
						<Entertainment />
					) || MISCELLANEOUS_SUBTYPES.includes(subtype) && (
						<Miscellaneous />
					)}
				</>
			)}
		</div>
	);
}
