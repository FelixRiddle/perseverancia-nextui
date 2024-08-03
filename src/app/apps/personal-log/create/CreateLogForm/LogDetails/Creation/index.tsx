import { Subtype } from "@/src/types/apps/personal-log/Subtype";
import Programming from "./Programming";
import { Details, OptionalDetails } from "@/src/types/apps/personal-log/Details";

export type Design = "None" | "Logo" | "Brand" | "Website" |
	"3D Modelling" | "Vector image" | "Image" | "Pixel art";

export const DESIGN_TYPES = [
	"None", "Logo", "Brand", "Website",
	"3D Modelling", "Vector image", "Image", "Pixel art"
];

/**
 * Creation details
 */
export default function Creation({
	subtype,
	subtypeData,
	setSubtypeData,
}: {
	subtype: Subtype;
	subtypeData: Details<OptionalDetails>
	setSubtypeData: (data: any) => void;
}) {
	return (
		<div>
            {subtype === "Programming" && (
				<Programming
					subtypeData={subtypeData}
					setSubtypeData={setSubtypeData}
				/>
			)}
		</div>
	);
}
