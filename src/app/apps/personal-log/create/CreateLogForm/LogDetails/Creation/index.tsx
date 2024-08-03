import { Subtype } from "@/src/types/apps/personal-log/Subtype";
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
	subtype,
	setSubtypeData,
}: {
	subtype: Subtype;
	setSubtypeData: (data: any) => void;
}) {
	return (
		<div>
            {subtype === "Programming" && <Programming setSubtypeData={setSubtypeData} />}
		</div>
	);
}
