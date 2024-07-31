"use client";

import { ZonedDateTime, getLocalTimeZone, now, parseAbsoluteToLocal } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { DatePicker, Select, SelectItem, Switch } from "@nextui-org/react";
import { useRef, useState } from "react";

import StringList from "@/src/components/Array/StringList";
import useStringList from "@/src/lib/hooks/useStringList";
import LogDetails, { Subtype } from "./LogDetails";
import useMessages from "@/src/lib/hooks/useMessages";
import { Details, EmptyDetails, OptionalDetails, ProgrammingDetails } from "@/src/types/apps/personal-log/Details";
import { createLog } from "@/src/lib/requestTypes";
import MiscellaneousFields from "./MiscellaneousFields";
import { OptPersonalLog, PersonalLog } from "@/src/types/apps/personal-log/PersonalLog";

// Creation / Work, is only a matter of perspective, I fall towards Creation that's why I chose the name like that.
export type CreationType = "Creation" | "Work";
export type LogType = "Miscellaneous" | "Entertainment" | "Workout" | "Learn" | "Investigation" | CreationType;

export const LOG_TYPES = [
	"Entertainment", "Creation", "Work", "Workout", "Miscellaneous", "Learn", "Investigation"
];

/**
 * Create log form
 * 
 * The log is given for editing a log.
 */
export default function CreateLogForm({
	simple=true,
	log,
}: {
	simple?: boolean;
	log?: OptPersonalLog<OptionalDetails>;
}) {
	const tags = useStringList({
		initialStrings: log?.tags ? log.tags : [],
	});
	const links = useStringList({
		initialStrings: log?.links ? log.links : [],
	});
	const references = useStringList({
		initialStrings: log?.links ? log.links : [],
	});
	const form = useRef(null);
	const messages = useMessages();
	
	const [logType, setLogType] = useState<LogType>(
		log?.type ? log.type : "Miscellaneous"
	);
	const [startDateCalendar, setStartDateCalendar] = useState(
		log?.start ? parseAbsoluteToLocal(log.start.toString()) : now(getLocalTimeZone())
	);
	const [additionalSubtypeData, setAdditionalSubtypeData] = useState<any>(
		log?.details ? log.details : {}
	);
	
	/**
	 * Select type
	 */
	function selectType(e: React.ChangeEvent<{ value: string }>) {
		const selected = e.target.value;
		if(typeof selected === "string") {
			if (LOG_TYPES.includes(selected)) {
				setLogType(selected as LogType);
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
	 * Create log from form
	 */
	function createLogFromForm() {
		if(!form.current) {
			return;
		}
		
		// Get form data
        const formData = new FormData(form.current);
		const start = startDateCalendar.toDate();
        const logType = formData.get("type");
        const description = formData.get("description");
        
		if(!start) {
			const message = "Start date is required";
			messages.addMessage("error", message);
			return;
		}
		
		if(!description) {
			const message = "Description is required";
			messages.addMessage("error", message);
			return;
		}
		
		if(!logType) {
			const message = "Type is required";
			messages.addMessage("error", message);
			return;
		}
		
		let log: Partial<PersonalLog<OptionalDetails>> = {
            start,
            type: logType as LogType,
            description: String(description),
        };
		
		// Only add if there's something
		const tagsList = tags.strings;
		if(tagsList.length > 0) {
			log.tags = tagsList;
		}
		
		const linkList = links.strings;
		if(linkList.length > 0) {
            log.links = linkList;
        }
		
		const referenceList = references.strings;
		if(referenceList.length > 0) {
            log.references = referenceList;
        }
		
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
		const subtype = formData.get("subtype") as Subtype;
		if(subtype) {
			switch(subtype) {
				case "Programming":
					// Fetch data of each subtype type
					let subtypeData: Details<ProgrammingDetails> = {
						subtype,
					};
					
					const appName = String(formData.get("appName"));
					const language = String(formData.get("language"));
					if(appName) {
						subtypeData.appName = appName;
					}
					
					if(language) {
						subtypeData.language = language;
					}
					
					log.details = {
						...subtypeData,
						...additionalSubtypeData,
					};
					
					return log as PersonalLog<ProgrammingDetails>;
				case "None":
					return log as PersonalLog<EmptyDetails>;
                default:
					throw Error("Unknown type");
			}
		}
	}
	
	/**
	 * Create log
	 */
	async function handleCreateLog(e: any) {
        e.preventDefault();
        
        const log = createLogFromForm();
        if(log) {
			// Save log to database
			await createLog(log);
		}
    }
	
	return (
		<form ref={form} className="block">
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
			
			<div className="pt-3" hidden={simple}>
				<label htmlFor="timeAccurate" className="pr-3">Time accurate</label>
				<Switch
					name="timeAccurate"
					aria-label="Time accurate"
					defaultSelected={log?.timeAccurate ? true : false}
				/>
			</div>
			
			<div className="pt-3">
				<label htmlFor="type">Type*</label>
				<Select 
					label="Select log type"
					aria-label="Select log type"
					name="type"
					onChange={selectType}
					defaultSelectedKeys={[logType]}
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
					defaultValue={log?.description ? log.description : ""}
				/>
			</div>
			
			{/* Details */}
			<div className="pt-3">
				<LogDetails
					logType={logType}
					setSubtypeData={setAdditionalSubtypeData}
				/>
			</div>
			
			<MiscellaneousFields
				simple={simple}
				log={log}
			/>
			
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
			
			{/* TODO: Notes, cannot use a string list */}
			
			{/* (Optional) TODO: Address */}
			
			<div className="pt-3 flex justify-center">
				<Button
					aria-label="Create log"
					color="success"
					onClick={handleCreateLog}
				>
					Create log
				</Button>
			</div>
		</form>
	);
}
