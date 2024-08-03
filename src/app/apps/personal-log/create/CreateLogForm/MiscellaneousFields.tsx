"use client";

import { OptionalDetails } from "@/src/types/apps/personal-log/Details";
import { OptPersonalLog } from "@/src/types/apps/personal-log/PersonalLog";
import { getLocalTimeZone, parseAbsoluteToLocal, parseTime, today } from "@internationalized/date";
import { DatePicker, TimeInput } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";

/**
 * Miscellaneous fields
 */
export default function MiscellaneousFields({
	simple = true,
	log,
	mixed,
	setMixed,
	untilTimeAccurate,
	setUntilTimeAccurate
}: {
	simple?: boolean;
	log?: OptPersonalLog<OptionalDetails>;
	mixed: boolean;
	setMixed: (mixed: boolean) => void;
	untilTimeAccurate: boolean;
	setUntilTimeAccurate: (accurate: boolean) => void;
}) {
	return (
		<div hidden={simple}>
			{/* Complete view */}
			<div className="pt-3">
				<label htmlFor="mixed" className="pr-3">Mixed</label>
				<Switch
					name="mixed"
					aria-label="Mixed"
					isSelected={mixed}
					onValueChange={setMixed}
				/>
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
							defaultValue={
								log?.updated
								? parseAbsoluteToLocal(log.updated.toString())
								: today(getLocalTimeZone())
							}
						/>
					</div>
					<div
						className="flex-auto"
					>
						<TimeInput
							name="updatedTime"
							aria-label="Updated time"
							className="w-64"
							variant="bordered"
							hideTimeZone
							defaultValue={
								log?.updated
								? parseAbsoluteToLocal(log.updated.toString())
								: null
							}
						/>
					</div>
				</div>
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
							defaultValue={
								log?.until
								? parseAbsoluteToLocal(log.until.toString())
								: today(getLocalTimeZone())
							}
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
							defaultValue={
								log?.until
								? parseAbsoluteToLocal(log.until.toString())
								: null
							}
						/>
					</div>
				</div>
			</div>
			
			<div className="pt-3">
				<label htmlFor="untilTimeAccurate" className="pr-3">Until time accurate</label>
                <Switch
                    name="untilTimeAccurate"
                    aria-label="Until time accurate"
					isSelected={untilTimeAccurate}
					onValueChange={setUntilTimeAccurate}
                />
			</div>
		</div>
	);
}

