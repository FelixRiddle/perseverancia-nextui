import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

import { LogType } from "../CreateLogForm";
import Entertainment from "./Entertainment";
import Miscellaneous from "./Miscellaneous";
import Workout from "./Workout";
import Creation from "./Creation";

// Subtypes is a broad list of concepts
export type Subtype =
	| "Design"
	| "Programming"
	| "Sport"
	| "Walk"
	| "Rope"
	| "Lifting"
	| "Music"
	| "Movie"
	| "Book"
	| "Show"
	| "Novel"
	| "Podcast"
	| "Sleep"
	| "None";

// Create subtype groups
export const SUBTYPE_OPTIONS: { [key in LogType]?: Subtype[] } = {
	Creation: ["None", "Programming", "Design"],
	Work: ["None", "Programming", "Design"],
	
	Workout: ["None", "Sport", "Walk", "Rope", "Lifting"],
	Entertainment: ["None", "Music", "Movie", "Book", "Show", "Novel", "Podcast"],
	Miscellaneous: ["None", "Sleep"],
};

/**
 * Log details
 * 
 * TODO: The user can create a custom form
 */
export default function LogDetails({
	logType,
}: {
	logType?: LogType;
}) {
	if (!logType) {
		return null;
	}

	const [subtypes, setSubtypes] = useState<Subtype[]>([]);
	const [selectedSubtype, setSelectedSubtype] = useState<Subtype>("None");

	// Change subtype options based on logType
	useEffect(() => {
		const newSubtypes = SUBTYPE_OPTIONS[logType] || [];
		setSubtypes(newSubtypes);
		
		// Set none
		setSelectedSubtype("None");
	}, [logType]);

	function handleSubtypeChange(e: React.ChangeEvent<{ value: string }>) {
		setSelectedSubtype(e.target.value as Subtype);
	}

	return (
		<div>
			<h1>Details</h1>
			<div className="pt-3">
				<label htmlFor="type" className="pr-3">Subtype</label>
				<Select
					label="Select log type"
					aria-label="Select log type"
					name="type"
					onChange={handleSubtypeChange}
					value={selectedSubtype}
					defaultSelectedKeys={["None"]}
				>
					{subtypes.map((subtype) => {
						if(!subtype) {
							return <></>;
						}
						
						return (
							<SelectItem key={subtype}>{subtype}</SelectItem>
						);
					})}
				</Select>
			</div>

			{selectedSubtype && (
				<>
					{selectedSubtype === "Programming" && <Creation subtype={selectedSubtype} />}
					{selectedSubtype === "Design" && <Creation subtype={selectedSubtype} />}
					{selectedSubtype === "Sport" && <Workout subtype={selectedSubtype} />}
					{selectedSubtype === "Walk" && <Workout subtype={selectedSubtype} />}
					{selectedSubtype === "Rope" && <Workout subtype={selectedSubtype} />}
					{selectedSubtype === "Lifting" && <Workout subtype={selectedSubtype} />}
					{selectedSubtype === "Music" && <Entertainment subtype={selectedSubtype}/>}
					{selectedSubtype === "Movie" && <Entertainment subtype={selectedSubtype}/>}
					{selectedSubtype === "Book" && <Entertainment subtype={selectedSubtype}/>}
					{selectedSubtype === "Show" && <Entertainment subtype={selectedSubtype}/>}
					{selectedSubtype === "Novel" && <Entertainment subtype={selectedSubtype}/>}
					{selectedSubtype === "Podcast" && <Entertainment subtype={selectedSubtype}/>}
					{selectedSubtype === "Sleep" && <Miscellaneous />}
				</>
			)}
		</div>
	);
}
