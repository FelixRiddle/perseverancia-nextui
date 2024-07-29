import { Subtype } from "..";
import Programming from "./Programming";

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
	subtype
}: {
	subtype: Subtype
}) {
	return (
		<div>
            {subtype === "Programming" && <Programming />}
		</div>
	);
}

