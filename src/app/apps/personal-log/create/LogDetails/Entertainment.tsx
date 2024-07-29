import { Input } from "@nextui-org/input";

/**
 * Entertainment details
 * 
 * TODO: Not using this one very much lately, so not gonna really develop it until I need it.
 */
export default function Entertainment() {
	return (
		<div>
			<div className="pt-3">
				<label htmlFor="subtype">Subtype</label>
				<Input name="subtype" placeholder="Subtype" />
			</div>
		</div>
	);
}
