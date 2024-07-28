"use client";

import { getLocalTimeZone, now } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Accordion, AccordionItem, DatePicker } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import { useState } from "react";

import StringList from "@/src/components/Array/StringList";
import useStringList from "@/src/lib/hooks/useStringList";

/**
 * Create log form
 */
export default function CreateLogForm() {
	const stringList = useStringList();
	
	return (
		<form>
			<div className="pt-3">
				<label htmlFor="start">Start date</label>
				<DatePicker
					label="Log date"
					variant="bordered"
					hideTimeZone
					showMonthAndYearPickers
					defaultValue={now(getLocalTimeZone())}
				/>
			</div>
			
			<div className="pt-3">
				<label htmlFor="type">Type</label>
				<Input name="type" placeholder="Type" />
			</div>
			
			<div className="pt-3">
				<label htmlFor="description">Description</label>
				<Textarea name="description" placeholder="Log description" />
			</div>
			
			{/* Miscellaneous fields */}
			<div className="pt-3">
				<Accordion variant="splitted">
					<AccordionItem key="1" aria-label="Miscellaneous" title="Miscellaneous">
						<div className="pt-3">
							<label htmlFor="timeAccurate" className="pr-3">Time accurate</label>
							<Switch name="timeAccurate" />
						</div>
						
						<div className="pt-3">
							<label htmlFor="mixed" className="pr-3">Mixed</label>
							<Switch name="mixed" />
						</div>
					</AccordionItem>
				</Accordion>
			</div>
			
			<div className="pt-3">
				<h1>Tags</h1>
				<StringList
					stringList={stringList}
				>
				</StringList>
			</div>
			
			<div className="pt-3">
				<Button className="">Create log</Button>
			</div>
		</form>
	);
}
