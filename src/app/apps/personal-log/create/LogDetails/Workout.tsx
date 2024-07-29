import { Input } from "@nextui-org/input";

export type Subtype = "Sport" | "Walk" | "Rope" | "Lifting";
export type Sport = "Run" | "Cyclism";

/**
 * Workout details
 */
export default function Workout() {
	return (
		<div>
			<div className="pt-3">
				<label htmlFor="subtype">Subtype</label>
				<Input
					name="subtype"
					placeholder="Subtype"
				/>
			</div>
		</div>
	);
}

