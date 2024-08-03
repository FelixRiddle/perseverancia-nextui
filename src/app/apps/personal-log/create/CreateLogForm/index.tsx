"use client";

import { ZonedDateTime, getLocalTimeZone, now, parseAbsoluteToLocal } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { DatePicker, Select, SelectItem, Switch } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

import StringList from "@/src/components/Array/StringList";
import useStringList from "@/src/lib/hooks/useStringList";
import LogDetails from "./LogDetails";
import useMessages from "@/src/lib/hooks/useMessages";
import { Details, EmptyDetails, OptionalDetails, ProgrammingDetails } from "@/src/types/apps/personal-log/Details";
import { createLog, updateLog } from "@/src/lib/requestTypes";
import MiscellaneousFields from "./MiscellaneousFields";
import { OptPersonalLog, PersonalLog } from "@/src/types/apps/personal-log/PersonalLog";
import { LOG_TYPES, LogType } from "@/src/types/apps/personal-log/Logtype";
import { Subtype } from "@/src/types/apps/personal-log/Subtype";

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
	const isEditing = log && true;
	
	// String lists
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
	
	// State
	const [logType, _setLogType] = useState<LogType>(
		"Miscellaneous"
	);
	const [startDateCalendar, setStartDateCalendar] = useState(
		log?.start ? parseAbsoluteToLocal(log.start.toString()) : now(getLocalTimeZone())
	);
	const [additionalSubtypeData, setAdditionalSubtypeData] = useState<Details<OptionalDetails>>(
		// {} cannot be assigned.
		log?.details ? log.details : {
			// None can be used on any details type
			subtype: "None"
		}
	);
	const [description, setDescription] = useState<string>("");
	const [timeAccurate, setTimeAccurate] = useState<boolean>(log?.timeAccurate ? true : false);
	const [untilTimeAccurate, setUntilTimeAccurate] = useState<boolean>(log?.untilTimeAccurate ? true : false);
	const [mixed, setMixed] = useState<boolean>(log?.mixed ? true : false);
	
	// Starting values
	useEffect(() => {
		// Miscellaneous boolean properties
		if(typeof log === "undefined") {
            setTimeAccurate(true);
            setUntilTimeAccurate(true);
            setMixed(false);
		}
		
		// Log type
		if(!log) {
			handleSetLogType("Miscellaneous");
        } else {
			handleSetLogType(log.type);
		}
	}, []);
	
	/**
	 * Just in case, to catch bad set states
	 */
	function handleSetLogType(logType: LogType) {
		if(!logType) {
			console.error("The log type is incorrect, default to miscellaneous");
			_setLogType("Miscellaneous");
			return;
		}
		
		_setLogType(logType);
	}
	
	// Update when selecting a log type
	useEffect(() => {
		if(!log) {
			return;
        }
		
		// That's good continues, that is not stops code execution
		if(log.type) {
			// Set fields
			handleSetLogType(log.type);
		}
		
		if(log.start) {
			setStartDateCalendar(parseAbsoluteToLocal(log.start.toString()));
		}
		
		if(log.description) {
			setDescription(log.description);
		}
		
		if(log.details) {
            setAdditionalSubtypeData(log.details);
        }
	}, [log]);
	
	/**
	 * Handle change description
	 */
	function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
        setDescription(e.target.value);
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
			const message = "Log type is required";
			messages.addMessage("error", message);
			return;
		}
		
		let logData: Partial<PersonalLog<OptionalDetails>> = {
			id: log?.id ? log.id : 0,
            start,
            type: logType,
            description,
			timeAccurate,
            untilTimeAccurate,
            mixed,
        };
		
		// Only add if there's something
		const tagsList = tags.strings;
		if(tagsList.length > 0) {
			logData.tags = tagsList;
		}
		
		const linkList = links.strings;
		if(linkList.length > 0) {
            logData.links = linkList;
        }
		
		const referenceList = references.strings;
		if(referenceList.length > 0) {
            logData.references = referenceList;
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
			
			logData.until = until;
		}
		
		if(updatedTime) {
			const updated = new Date(`${updatedDate} ${updatedTime}`);
			
			if(updated && updated < start) {
			    const message = "Updated date must be after start date";
				messages.addMessage("error", message);
			    return;
			}
			
			logData.updated = updated
		}
		
		// Details
		const subtype = formData.get("subtype") as Subtype;
		if(subtype) {
			logData.details = {
				...additionalSubtypeData
			};
			
			switch(subtype) {
				case "None":
					return logData as PersonalLog<EmptyDetails>;
				case "Programming":
					return logData as PersonalLog<ProgrammingDetails>;
				case "Sleep":
					return logData as PersonalLog<EmptyDetails>;
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
	
	/**
	 * Handle update log
	 */
	async function handleUpdateLog(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
        
        const log = createLogFromForm();
        if(log) {
            // Save log to database
            await updateLog(log);
        }
	}
	
	/**
	 * Log type
	 */
	function handleLogTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
		const logType = e.target.value as LogType;
		handleSetLogType(logType);
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
					isSelected={timeAccurate}
					onValueChange={setTimeAccurate}
				/>
			</div>
			
			<div className="pt-3">
				<label htmlFor="type">Type*</label>
				<Select
					// The typescript errors cannot be fixed I've wasted too much time already
					label="Select log type"
					aria-label="Select log type"
					name="type"
					onChange={handleLogTypeChange}
					value={logType}
					selectedKeys={[logType]}
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
					onChange={handleChangeDescription}
					value={description}
				/>
			</div>
			
			{/* Details */}
			<div className="pt-3">
				<LogDetails
					logType={logType}
					subtypeData={additionalSubtypeData}
					setSubtypeData={setAdditionalSubtypeData}
				/>
			</div>
			
			<MiscellaneousFields
				simple={simple}
				log={log}
				mixed={mixed}
				setMixed={setMixed}
				untilTimeAccurate={untilTimeAccurate}
				setUntilTimeAccurate={setUntilTimeAccurate}
			/>
			
			<div className="pt-3">
				<h1>Tags</h1>
				<StringList
					stringList={tags}
					placeholder="Add tags"
				>
				</StringList>
			</div>
			
			{/* TODO: Shouldn't use a string list with these two */}
			<div className="pt-3">
				<h1>Links</h1>
				<StringList
					stringList={links}
					placeholder="Add links"
				>
				</StringList>
			</div>
			
			<div className="pt-3">
				<h1>References</h1>
				<StringList
					stringList={references}
					placeholder="Add references"
				>
				</StringList>
			</div>
			
			{/* TODO: Notes; Cannot use a string list */}
			
			{/* (Optional) TODO: Address */}
			
			<div className="pt-3 flex justify-center">
				<Button
					aria-label={isEditing ? "Update log" : "Create log"}
					color="success"
					onClick={isEditing ? handleUpdateLog : handleCreateLog}
				>
					{isEditing ? "Update log" : "Create log"}
				</Button>
			</div>
		</form>
	);
}
