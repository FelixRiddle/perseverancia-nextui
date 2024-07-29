import { Input } from "@nextui-org/input";

export type Subtype = "Sleep" | undefined;

/**
 * Miscellaneous details
 */
export default function Miscellaneous() {
	return (
		<div>
			<div className="pt-3">
				<label htmlFor="subtype">Subtype</label>
				<Input name="subtype" placeholder="Subtype" />
			</div>
		</div>
	);
}
