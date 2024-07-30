import { LogType } from "@/src/app/apps/personal-log/create/CreateLogForm";
import { EmptyDetails, GeneralDetails, ProgrammingDetails } from "./Details";

export interface PersonalLog {
	start: Date;
	type: LogType;
	description: string;
	details?: (ProgrammingDetails | EmptyDetails) & GeneralDetails;
	until?: Date;
	updated?: Date;
	tags?: string[];
	links?: string[];
	references?: string[];
}
