import { Details, OptionalDetails } from "@/src/types/apps/personal-log/Details";
import { Subtype } from "@/src/types/apps/personal-log/Subtype";
import { SPORT_TYPES, Sport } from "@/src/types/apps/personal-log/Subtype/Sport";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

/**
 * Workout details
 */
export default function Workout({
	subtype,
	subtypeData,
	setSubtypeData,
}: {
	subtype: Subtype;
	subtypeData: Details<OptionalDetails>
	setSubtypeData: (data: any) => void;
}) {
	const [sport, setSport] = useState<Sport>("None");
	
	function selectSport(e: React.ChangeEvent<{ value: string }>) {
		const selected = e.target.value;
		if(typeof selected === "string") {
			if (SPORT_TYPES.includes(selected)) {
				setSport(selected as Sport);
			} else {
				throw Error(`Selected sport is not a valid sport: ${selected}`);
			}
		}
	}
	
	return (
		<div>
			{/* Sport subtype */}
			{subtype === "Sport" && (
				<div className="pt-3">
					<label htmlFor="type" className="pr-3">Sport subtype</label>
					<Select 
						label="Select sport subtype"
						aria-label="Select sport subtype" 
						name="type"
						onChange={selectSport}
						defaultSelectedKeys={["Miscellaneous"]}
					>
						{SPORT_TYPES.map((currentLogType) => {
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
			)}
		</div>
	);
}

