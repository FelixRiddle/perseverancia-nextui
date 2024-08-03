import { Subtype } from "./Subtype";

export interface GeneralDetails {
	subtype: Subtype;
}

export interface EmptyDetails {
}

export interface ProgrammingDetails {
	appName?: string;
	language?: string;
	framework?: string;
	repositories?: string[];
}

export type OptionalDetails = EmptyDetails | ProgrammingDetails;

// export type Details = (ProgrammingDetails | EmptyDetails) & GeneralDetails;
export type Details<T extends OptionalDetails> = T & GeneralDetails;
