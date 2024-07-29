"use client";

import { getLocalTimeZone, now } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import { useState } from "react";

import StringList from "@/src/components/Array/StringList";
import useStringList from "@/src/lib/hooks/useStringList";
import LogDetails, { DetailsType } from "./LogDetails";

// Creation / Work, is only a matter of perspective, I fall towards Creation that's why I chose the name like that.
export type CreationType = "Creation" | "Work";
export type LogType = "Miscellaneous" | "Workout" | "Learn" | "Investigation" | CreationType;

export const logTypes = ["Creation", "Work", "Workout", "Miscellaneous", "Learn", "Investigation"];

/**
 * Create log form
 */
export default function CreateLogForm() {
	const tags = useStringList();
	const links = useStringList();
	const references = useStringList();
	
	const [detailsType, setDetailsType] = useState<DetailsType>("Entertainment");
	const [logType, setLogType] = useState<LogType>("Miscellaneous");
	
	function selectType(e: React.ChangeEvent<{ value: string }>) {
		const selected = e.target.value;
		if(typeof selected === "string") {
			if (logTypes.includes(selected)) {
				setLogType(selected as LogType);
				console.log(`Selected: `, selected);
			} else {
				console.error(`Selected type is not a valid log type: ${selected}`);
			}
		}
	}
	
	return (
		<form>
			<div className="flex flex-col">
				<div>
					<label htmlFor="start">Start date*</label>
				</div>
				<div>
					<DatePicker
						name="start"
						variant="bordered"
						hideTimeZone
						showMonthAndYearPickers
						defaultValue={now(getLocalTimeZone())}
					/>
				</div>
			</div>
			
			<div className="pt-3">
				<label htmlFor="type" className="pr-3">Type*</label>
				<Select 
					label="Select log type"
					aria-label="Select log type" 
					className="max-w-xs"
					name="type"
					onChange={selectType}
					defaultSelectedKeys={["Miscellaneous"]}
				>
					{logTypes.map((currentLogType) => {
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
			
			<div className="pt-3">
				<label htmlFor="description">Description</label>
				<Textarea name="description" placeholder="Log description" />
			</div>
			
			<div className="pt-3">
				<label htmlFor="mixed" className="pr-3">Mixed</label>
				<Switch name="mixed" />
			</div>
			
			{/* Miscellaneous fields */}
			<h1 className="pt-3">Miscellaneous date fields</h1>
			<div>
				<div className="pt-3">
					<label htmlFor="timeAccurate" className="pr-3">Time accurate</label>
					<Switch name="timeAccurate" defaultSelected />
				</div>
				
				<div className="pt-3">
					<label htmlFor="until">Until</label>
					<DatePicker
						name="until"
						variant="bordered"
						hideTimeZone
						showMonthAndYearPickers
					/>
				</div>
				
				<div className="pt-3">
					<label htmlFor="updated">Updated</label>
					<DatePicker
						name="updated"
						variant="bordered"
						hideTimeZone
						showMonthAndYearPickers
					/>
				</div>
			</div>
			
			<div className="pt-3">
				<h1>Tags</h1>
				<StringList
					stringList={tags}
				>
				</StringList>
			</div>
			
			<div className="pt-3">
				<h1>Links</h1>
				<StringList
					stringList={links}
				>
				</StringList>
			</div>
			
			<div className="pt-3">
				<h1>References</h1>
				<StringList
					stringList={references}
				>
				</StringList>
			</div>
			
			{/* TODO: Details */}
			<div className="pt-3">
				<LogDetails
					detailsType={detailsType}
				/>
			</div>
			
			{/* (Optional) TODO: Address */}
			
			<div className="pt-3 flex justify-center">
				<Button color="success">
					Create log
				</Button>
			</div>
		</form>
	);
}
