import { LogType } from "@/src/app/apps/personal-log/create/CreateLogForm";

export interface PersonalLog {
	start: Date;
	type: LogType;
	description: string;
	until?: Date;
	updated?: Date;
}
