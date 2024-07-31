import { LogType } from "@/src/app/apps/personal-log/create/CreateLogForm";
import { Details, OptionalDetails } from "./Details";

export interface PersonalLog<T extends OptionalDetails> {
	id: number;
	start: Date;
	type: LogType;
	description: string;
	details?: Details<T>;
	mixed?: boolean;
	timeAccurate?: boolean;
	untilTimeAccurate?: boolean;
	until?: Date;
	updated?: Date;
	tags?: string[];
	links?: string[];
	references?: string[];
	notes?: string[];
}

/**
 * It's assumed the log was created on the database so everything
 * except id is optional, used for editing.
 */
export interface OptPersonalLog<T extends OptionalDetails> {
	id: number;
	start?: Date;
	type?: LogType;
	description?: string;
	details?: Details<T>;
	mixed?: boolean;
	timeAccurate?: boolean;
	untilTimeAccurate?: boolean;
	until?: Date;
	updated?: Date;
	tags?: string[];
	links?: string[];
	references?: string[];
	notes?: string[];
}
