import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState, useRef, useCallback, ChangeEvent } from "react";

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
	
	/**
     * Call on button click
     */
    const handleAddString = useCallback(() => {
        if(!inputRef.current) {
            return;
        }
        
		// Recover field focus
		inputRef.current.focus(); 
		
        // Insert string
        const newString = inputRef.current.value;
        if(newString) {
            stringList.addString(newString);
            setInputString("");
        }
    }, [stringList]);
	
	/**
     * Call on input change
     */
	function onInputChange(e: ChangeEvent<HTMLInputElement>) {
		setInputString(e.target.value);
	}
	
	/**
	 * Call on key down
	 */
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleAddString();
        }
    }, [handleAddString]);
	
    return (
        <div>
			<div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
                <Input
					ref={inputRef}
					type="text"
					placeholder="Add a tag"
					value={inputString}
					onChange={onInputChange}
					onKeyDown={handleKeyDown}
				/>
                <Button
					onClick={handleAddString}
					color="secondary"
				>Add</Button>
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
