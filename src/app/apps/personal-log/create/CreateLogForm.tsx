"use client";

import { getLocalTimeZone, now, today } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { DatePicker, Select, SelectItem, TimeInput } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import { useEffect, useState } from "react";

import StringList from "@/src/components/Array/StringList";
import useStringList from "@/src/lib/hooks/useStringList";
import LogDetails from "./LogDetails";

// Creation / Work, is only a matter of perspective, I fall towards Creation that's why I chose the name like that.
export type CreationType = "Creation" | "Work";
export type LogType = "Miscellaneous" | "Entertainment" | "Workout" | "Learn" | "Investigation" | CreationType;

export const LOG_TYPES = [
	"Entertainment", "Creation", "Work", "Workout", "Miscellaneous", "Learn", "Investigation"
];

/**
 * Create log form
 */
export default function CreateLogForm() {
	const tags = useStringList();
	const links = useStringList();
	const references = useStringList();
	
	const [logType, setLogType] = useState<LogType>("Miscellaneous");
	
	useEffect(() => {
		
	}, []);
	
	function selectType(e: React.ChangeEvent<{ value: string }>) {
		const selected = e.target.value;
		if(typeof selected === "string") {
			if (LOG_TYPES.includes(selected)) {
				setLogType(selected as LogType);
				console.log(`Selected: `, selected);
			} else {
				throw Error(`Selected type is not a valid log type: ${selected}`);
			}
		}
	}
	
	return (
		<form>
			<div>
				<label htmlFor="start">Start date*</label>
				<DatePicker
					name="start"
					variant="bordered"
					hideTimeZone
					showMonthAndYearPickers
					defaultValue={now(getLocalTimeZone())}
				/>
			</div>
			
			<div className="pr-3">
				<label htmlFor="type">Type*</label>
				<Select 
					label="Select log type"
					aria-label="Select log type"
					name="type"
					onChange={selectType}
					defaultSelectedKeys={["Miscellaneous"]}
				>
					{LOG_TYPES.map((currentLogType) => {
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
					<label>Until</label>
					{/* The only way to make this work is to split date and time */}
					<div className="flex">
						<div
							className="flex-auto mr-3"
						>
							<DatePicker
								className="w-64"
								variant="bordered"
								hideTimeZone
								showMonthAndYearPickers
								defaultValue={today(getLocalTimeZone())}
							/>
						</div>
						<div
							className="flex-auto"
						>
							<TimeInput
								className="w-64"
								variant="bordered"
								hideTimeZone
							/>
						</div>
					</div>
				</div>
				
				<div className="pt-3">
					<label>Updated</label>
					<div className="flex">
						<div
							className="flex-auto mr-3"
						>
							<DatePicker
								className="w-64"
								variant="bordered"
								hideTimeZone
								showMonthAndYearPickers
								defaultValue={today(getLocalTimeZone())}
							/>
						</div>
						<div
							className="flex-auto"
						>
							<TimeInput
								className="w-64"
								variant="bordered"
								hideTimeZone
							/>
						</div>
					</div>
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
					logType={logType}
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
