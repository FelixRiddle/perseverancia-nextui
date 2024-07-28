import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState, useRef } from "react";
import StringListManager from "@/src/lib/array/StringList";
import StringListCard from "./StringListCard";
import { IStringListsHook } from "@/src/lib/hooks/useStringList";

/**
 * StringList component to add and remove strings from a list
 */
/**
 * StringList component to add and remove strings from a list
 */
export default function StringList({
    stringList
}: {
	stringList: IStringListsHook
}) {
    const inputRef = useRef<HTMLInputElement>(null);
	
    const handleAddString = () => {
		if(!inputRef.current) {
			return;
		}
		
		// Insert string
		const newString = inputRef.current.value;
        if(inputRef.current.value) {
            stringList.addString(newString);
            inputRef.current.value = "";
        }
    };
	
    return (
        <div>
            <div>
                <Input
					ref={inputRef}
					type="text"
					placeholder="Add a tag"
					className="pt-3"
				/>
                <Button className="mt-3" onClick={handleAddString} color="secondary">Add</Button>
            </div>
			<StringListCard
				stringList={stringList}
			/>
		</div>
	);
}
