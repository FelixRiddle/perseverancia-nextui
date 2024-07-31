"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { DatePicker, TimeInput } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";

/**
 * Miscellaneous fields
 */
export default function MiscellaneousFields({
	simple = true
}: {
	simple?: boolean;
}) {
	return (
		<div hidden={simple}>
			{/* Complete view */}
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
		</div>
	);
}

