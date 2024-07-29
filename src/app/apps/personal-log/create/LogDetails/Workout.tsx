import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { Subtype } from ".";

export type Sport = "Run" | "Cyclism" | undefined;

export const SPORT_TYPES = ["Sport", "Cyclism"];

/**
 * Workout details
 */
export default function Workout({
	subtype
}: {
	subtype: Subtype
}) {
	const [sport, setSport] = useState<Sport>(undefined);
	
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
						className="max-w-xs"
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

