"use client";

import { getLocalTimeZone, now } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Accordion, AccordionItem, DatePicker } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import { useState } from "react";

import StringList from "@/src/components/Array/StringList";
import useStringList from "@/src/lib/hooks/useStringList";

const labelStyle = `
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const inputStyle = `
    width: 100%;
    margin-bottom: 1rem;
`;

const switchStyle = `
    margin-bottom: 1rem;
`;

/**
 * Create log form
 */
export default function CreateLogForm() {
	const stringList = useStringList();
	
	return (
		<form>
			<div className="flex flex-col">
				<div>
					<label htmlFor="start">Start date</label>
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
				<label htmlFor="type">Type</label>
				<Input name="type" placeholder="Type" />
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
					<Switch name="timeAccurate" />
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
					stringList={stringList}
				>
				</StringList>
			</div>
			
			<div className="pt-3 flex justify-center">
				<Button color="success">
					Create log
				</Button>
			</div>
		</form>
	);
}
