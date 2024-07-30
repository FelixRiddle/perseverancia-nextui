"use client";

import { ZonedDateTime, getLocalTimeZone, now, today } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { DatePicker, Select, SelectItem, TimeInput } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import { useRef, useState } from "react";

import StringList from "@/src/components/Array/StringList";
import useStringList from "@/src/lib/hooks/useStringList";
import LogDetails from "./LogDetails";
import { PersonalLog } from "@/src/types/apps/personal-log/PersonalLog";
import useMessages from "@/src/lib/hooks/useMessages";

// Creation / Work, is only a matter of perspective, I fall towards Creation that's why I chose the name like that.
export type CreationType = "Creation" | "Work";
export type LogType = "Miscellaneous" | "Entertainment" | "Workout" | "Learn" | "Investigation" | CreationType;

export const LOG_TYPES = [
	"Entertainment", "Creation", "Work", "Workout", "Miscellaneous", "Learn", "Investigation"
];

/**
 * Create log form
 * 
 * This form is so complex, I understimated how complex it would be.
 */
export default function CreateLogForm() {
	const tags = useStringList();
	const links = useStringList();
	const references = useStringList();
	const form = useRef(null);
	const messages = useMessages();
	
	const [logType, setLogType] = useState<LogType>("Miscellaneous");
	const [startDateCalendar, setStartDateCalendar] = useState(now(getLocalTimeZone()));
	const [additionalSubtypeData, setAdditionalSubtypeData] = useState<any>({});
	
	/**
	 * Select type
	 */
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
	
	/**
	 * Handle change start date
	 */
	function handleChangeStartDate(date: ZonedDateTime) {
		setStartDateCalendar(date);
	}
	
	/**
	 * Create log
	 */
	function createLog(e: any) {
        e.preventDefault();
		
		if(!form.current) {
			return;
		}
        
        // Get form data
        const formData = new FormData(form.current);
		const start = startDateCalendar.toDate();
        const type = formData.get("type");
        const description = formData.get("description");
        
        // Check for required fields
        if(!start || !description || !type) {
            console.log("Missing required fields");
            return;
        }
		
		// Create log
		let log: PersonalLog = {
			start,
            type: type as LogType,
            description: String(description),
			tags: tags.strings,
            links: links.strings,
            references: references.strings,
		};
		
		// Get until and updated
		const untilDate = formData.get("untilDate");
		const untilTime = formData.get("untilTime");
		
        const updatedDate = formData.get("updatedDate");
        const updatedTime = formData.get("updatedTime");
		
		if(untilTime) {
			const untilDateTime = `${untilDate} ${untilTime}`;
			const until = new Date(untilDateTime);
		
			// Validate dates
			if(until && until < start) {
				const message = "Until date must be after start date";
				messages.addMessage("error", message);
			    return;
			}
			
			log.until = until;
		}
		
		if(updatedTime) {
			const updated = new Date(`${updatedDate} ${updatedTime}`);
			
			if(updated && updated < start) {
			    const message = "Updated date must be after start date";
				messages.addMessage("error", message);
			    return;
			}
			
			log.updated = updated
		}
		
		// Details
		const subtype = formData.get("subtype");
		if(subtype && subtype !== "None") {
			// Fetch data of each subtype type
			let subtypeData = {};
			if(subtype === "Programming") {
				const appName = String(formData.get("appName"));
				const language = String(formData.get("language"));
				subtypeData = {
					appName,
					language
				};
			}
			
			console.log(`additionalSubtypeData data: `, additionalSubtypeData);
			log.details = {
                subtype: subtype as LogType,
				...subtypeData,
				...additionalSubtypeData,
            };
		}
        
        // Save log to database
        console.log(`Log created: `, log);
    }
	
	return (
		<form ref={form}>
			<div>
				<label htmlFor="start">Start date*</label>
				<DatePicker
					aria-label="Start date"
					name="start"
					variant="bordered"
					isRequired
					hideTimeZone
					showMonthAndYearPickers
					value={startDateCalendar}
					onChange={handleChangeStartDate}
				/>
			</div>
			
			<div className="pt-3">
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
				<label htmlFor="description">Description*</label>
				<Textarea
					aria-label="Description"
					name="description"
					placeholder="Log description"
				/>
			</div>
			
			{/* TODO: Details */}
			<div className="pt-3">
				<LogDetails
					logType={logType}
					setSubtypeData={setAdditionalSubtypeData}
				/>
			</div>
			
			<div className="pt-3">
				<label htmlFor="mixed" className="pr-3">Mixed</label>
				<Switch
					name="mixed"
					aria-label="Mixed"
				/>
			</div>
			
			{/* Miscellaneous fields */}
			<h1 className="pt-3">Miscellaneous date fields</h1>
			<div className="pt-3">
				<label htmlFor="timeAccurate" className="pr-3">Time accurate</label>
				<Switch
					name="timeAccurate"
					aria-label="Time accurate"
					defaultSelected
				/>
			</div>
			
			<div className="pt-3">
				<label>Until</label>
				{/* The only way to make this work is to split date and time */}
				<div className="flex">
					<div
						className="flex-auto mr-3"
					>
						<DatePicker
							name="untilDate"
							aria-label="Until date"
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
							name="untilTime"
							aria-label="Until time"
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
							name="updatedDate"
							aria-label="Updated date"
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
							name="updatedTime"
							aria-label="Until time"
							className="w-64"
							variant="bordered"
							hideTimeZone
						/>
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
			
			{/* (Optional) TODO: Address */}
			
			<div className="pt-3 flex justify-center">
				<Button
					aria-label="Create log"
					color="success"
					onClick={createLog}
				>
					Create log
				</Button>
			</div>
		</form>
	);
}
