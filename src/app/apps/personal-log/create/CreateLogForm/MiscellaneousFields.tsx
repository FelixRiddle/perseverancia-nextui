"use client";

import { ZonedDateTime } from "@internationalized/date";
import { DatePicker } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";

import { OptionalDetails } from "@/src/types/apps/personal-log/Details";
import { OptPersonalLog } from "@/src/types/apps/personal-log/PersonalLog";

export interface MiscellaneousFieldsData {
	updated?: ZonedDateTime,
	until?: ZonedDateTime,
}

/**
 * Miscellaneous fields
 */
export default function MiscellaneousFields({
	simple = true,
	log,
	mixed,
	setMixed,
	untilTimeAccurate,
	setUntilTimeAccurate,
	miscellaneousFields,
	setMiscellaneousFields,
}: {
	simple?: boolean;
	log?: OptPersonalLog<OptionalDetails>;
	mixed: boolean;
	setMixed: (mixed: boolean) => void;
	untilTimeAccurate: boolean;
	setUntilTimeAccurate: (accurate: boolean) => void;
	miscellaneousFields: MiscellaneousFieldsData,
	setMiscellaneousFields: (miscellaneousFields: any) => void;
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
							variant="bordered"
							hideTimeZone
							showMonthAndYearPickers
							granularity="minute"
							value={miscellaneousFields.updated}
							onChange={(date) => {
								setMiscellaneousFields((prevFields: MiscellaneousFieldsData) => {
									return {
										...prevFields,
										updated: date,
									}
								});
							}}
						/>
					</div>
				</div>
			</div>
			
			<div className="pt-3">
				<label>Until</label>
				<div className="flex">
					<div
						className="flex-auto mr-3"
					>
						<DatePicker
							name="untilDate"
							aria-label="Until date"
							variant="bordered"
							hideTimeZone
							showMonthAndYearPickers
							granularity="minute"
							value={miscellaneousFields.until}
							onChange={(date) => {
								setMiscellaneousFields((prevFields: MiscellaneousFieldsData) => {
									return {
										...prevFields,
										until: date,
									}
								});
							}}
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

