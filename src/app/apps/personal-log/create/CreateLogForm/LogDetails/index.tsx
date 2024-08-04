import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

import Entertainment from "./Entertainment";
import Miscellaneous from "./Miscellaneous";
import Workout from "./Workout";
import Creation from "./Creation";
import { Details, OptionalDetails } from "@/src/types/apps/personal-log/Details";
import { SUBTYPE_OPTIONS, Subtype } from "@/src/types/apps/personal-log/Subtype";
import { LogType } from "@/src/types/apps/personal-log/Logtype";

/**
 * Log details
 * 
 * TODO: The user can create a custom form
 */
export default function LogDetails({
	logType,
	subtypeData,
	setSubtypeData,
}: {
	logType?: LogType;
	subtypeData: Details<OptionalDetails>;
	setSubtypeData: (data: any) => void;
}) {
	const [possibleSubtypes, setPossibleSubtypes] = useState<Subtype[]>(["None"]);
	const [subtype, setSubtype] = useState<Subtype>("None");
	
	/**
	 * Update subtype
	 */
	function updateSubtype(subtype: Subtype) {
		
		if(!subtype) {
			console.error("Illegal operation: No subtype provided");
			const defaultSubtype = "None";
			setSubtype(defaultSubtype);
			setSubtypeData({
				...subtypeData,
				defaultSubtype,
			});
			return;
		}
		
		setSubtype(subtype);
		setSubtypeData({
			...subtypeData,
			subtype,
		});
	}
	
	/**
	 * Update subtypes
	 */
	function updateSubtypes() {
		if(!logType) {
			console.error("Illegal operation: No log type");
			return;
		} else {
			const newSubtypes = SUBTYPE_OPTIONS[logType as LogType];
			
			if(!newSubtypes) {
				console.error(`Illegal operation: No subtypes defined for log type: ${logType}`);
                return;
			}
			
			setPossibleSubtypes(newSubtypes);
		}
		
		// Set
		const newSubtype = subtypeData?.subtype ? subtypeData.subtype : "None";
		if(newSubtype !== subtypeData.subtype) {
			updateSubtype(newSubtype);
		}
	}
	
	// Set log type at start
	useEffect(() => {
		updateSubtypes();
	}, []);
	
	// Change subtype options based on logType
	useEffect(() => {
		updateSubtypes();
	}, [logType]);
	
	useEffect(() => {
		setSubtype(subtypeData.subtype);
	}, [subtypeData]);
	
	/**
	 * Handle subtype change
	 */
	function handleSubtypeChange(e: React.ChangeEvent<{ value: string }>) {
		const subtype = e.target.value as Subtype;
		updateSubtype(subtype);
	}
	
	return (
		<div>
			<h1>Details</h1>
			<div className="pt-3">
				<label htmlFor="type" className="pr-3">Subtype</label>
				<Select
					label="Select subtype"
					aria-label="Select subtype"
					name="subtype"
					onChange={handleSubtypeChange}
					value={subtype}
					selectedKeys={[subtype]}
				>
					{possibleSubtypes.map((subtype) => {
						if(!subtype) {
							return <></>;
						}
						
						return (
							<SelectItem key={subtype}>
								{subtype}
							</SelectItem>
						);
					})}
				</Select>
			</div>

			{subtype && (
				<>
					{subtype === "Programming" && <Creation
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Design" && <Creation
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Sport" && <Workout
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Walk" && <Workout
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Rope" && <Workout
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Lifting" && <Workout
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Music" && <Entertainment
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Movie" && <Entertainment
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Book" && <Entertainment
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Show" && <Entertainment
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Novel" && <Entertainment
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Podcast" && <Entertainment
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
					{subtype === "Sleep" && <Miscellaneous
						subtype={subtype}
						subtypeData={subtypeData}
						setSubtypeData={setSubtypeData}
					/>}
				</>
			)}
		</div>
	);
}
