"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";

/**
 * Create log form
 */
export default function CreateLogForm() {
	return (
		<form>
			<div>
				<label htmlFor="type">Type</label>
				<Input name="type" placeholder="Type" />
			</div>
			
			<div>
				<label htmlFor="description">Description</label>
				<Textarea name="description" placeholder="Log description" />
			</div>
			
			<div>
				<Button className="">Create log</Button>
			</div>
		</form>
	);
}
