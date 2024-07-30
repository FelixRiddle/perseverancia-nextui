import { useState } from "react";

export interface IStringListsHook {
	strings: string[],
	addString: (newString: string) => void,
	removeString: (index: number) => void,
	clear: () => void,
}

/**
 * useStringList - A custom hook to manage a StringListManager instance and provide methods to add and remove strings.
 *
 * ## Installation
 * To use this custom hook, you need to install the `@nextui-org/card` library and its types. You can install them using npm or yarn:
 *
 * ```bash
 * npm install @nextui-org/card @types/nextui-org
 * ```
 *
 * ```bash
 * yarn add @nextui-org/card @types/nextui-org
 * ```
 *
 * ## Usage
 * To use the `useStringList` custom hook, import it into your component and call it with the initial strings as an argument. The hook returns an object that contains the `StringListManager` instance, the `addString` function, and the `removeString` function.
 *
 * ```javascript
 * import { useState, useRef } from "react";
 * import StringListManager from "@/src/lib/array/StringList";
 * import { useStringList } from "./useStringList";
 *
 * const MyComponent = () => {
 *   const { stringList, addString, removeString } = useStringList(["initial string 1", "initial string 2"]);
 *
 *   // Use the stringList, addString, and removeString functions as needed
 *
 *   // TODO: Your component logic
 *   return (
 *     <div>
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 *
 * ## Parameters
 * The `useStringList` custom hook accepts an optional `initialStrings` parameter, which is an array of strings that will be used to initialize the `StringListManager` instance. If no `initialStrings` parameter is provided, the `useStringList` custom hook will create a new `StringListManager` instance with an empty array of strings.
 */
export default function useStringList(initialStrings: string[] = []): IStringListsHook {
    const [strings, setStrings] = useState(initialStrings);
	
    const addString = (newString: string) => {
        setStrings([
			...strings,
            newString
		]);
    };
	
    const removeString = (index: number) => {
		setStrings([
            ...strings.slice(0, index),
            ...strings.slice(index + 1)
        ]);
    };
	
	function clear() {
		setStrings([]);
	}
	
    return {
		strings,
		addString,
		removeString,
		clear
	};
};
