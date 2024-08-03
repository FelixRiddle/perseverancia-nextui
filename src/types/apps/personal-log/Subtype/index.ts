import { LogType } from "../Logtype";

// Subtypes is a broad list of concepts
export type Subtype =
	| "Design"
	| "Programming"
	| "Sport"
	| "Walk"
	| "Rope"
	| "Lifting"
	| "Music"
	| "Movie"
	| "Book"
	| "Show"
	| "Novel"
	| "Podcast"
	| "Sleep"
	| "None";

// Create subtype groups
export const SUBTYPE_OPTIONS: { [key in LogType]?: Subtype[] } = {
	Creation: ["None", "Programming", "Design"],
	Work: ["None", "Programming", "Design"],
	
	Workout: ["None", "Sport", "Walk", "Rope", "Lifting"],
	Entertainment: ["None", "Music", "Movie", "Book", "Show", "Novel", "Podcast"],
	Miscellaneous: ["None", "Sleep"],
};
