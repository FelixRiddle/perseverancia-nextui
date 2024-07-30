import { LogType } from "@/src/app/apps/personal-log/create/CreateLogForm";
import { Details, OptionalDetails } from "./Details";

export interface PersonalLog<T extends OptionalDetails> {
	start: Date;
	type: LogType;
	description: string;
	details?: Details<T>;
	until?: Date;
	updated?: Date;
	tags?: string[];
	links?: string[];
	references?: string[];
}
