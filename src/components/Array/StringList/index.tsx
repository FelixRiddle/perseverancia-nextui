import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState, useRef, useCallback } from "react";
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
	const [inputString, setInputString] = useState("");
	
    const handleAddString = useCallback(() => {
        if(!inputRef.current) {
            return;
        }
        
        // Insert string
        const newString = inputRef.current.value;
        if(newString) {
            stringList.addString(newString);
            setInputString("");
        }
    }, [stringList]);
	
	function onInputChange(e: any) {
		setInputString(e.target.value);
	}
	
    return (
        <div>
            <div>
                <Input
					ref={inputRef}
					type="text"
					placeholder="Add a tag"
					className="pt-3"
					value={inputString}
					onChange={onInputChange}
				/>
                <Button className="mt-3" onClick={handleAddString} color="secondary">Add</Button>
            </div>
			
			{/* Show string lists */}
			{stringList.strings.length > 0 && (
				<StringListCard
					stringList={stringList}
				/>
			)}
		</div>
	);
}
