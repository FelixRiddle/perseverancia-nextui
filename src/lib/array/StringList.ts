/**
 * StringList - A class to manage a list of strings.
 *
 * ## Installation
 * To use this class, you need to install the `@nextui-org/card` library and its types. You can install them using npm or yarn:
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
 * To use the `StringList` class, create a new instance of the class with an optional `initialStrings` parameter, which is an array of strings that will be used to initialize the list. You can then use the `addString` and `removeString` methods to add and remove strings from the list.
 *
 * ```javascript
 * import { StringList } from "./StringList";
 *
 * const myStringList = new StringList(["initial string 1", "initial string 2"]);
 *
 * // Use the myStringList instance to add and remove strings
 *
 * myStringList.addString("new string");
 * console.log(myStringList.getStrings()); // Output: ["initial string 1", "initial string 2", "new string"]
 *
 * myStringList.removeString(1);
 * console.log(myStringList.getStrings()); // Output: ["initial string 1", "new string"]
 * ```
 *
 * ## Properties
 * The `StringList` class has the following properties:
 *
 * - `strings`: An array of strings that represents the list of strings.
 */
export default class StringList {
	private strings: string[] = [];
	
    constructor(initialStrings: string[] = []) {
        this.strings = initialStrings;
    }
	
	public addString(newString: string): void {
		this.strings.push(newString);
	}

	public removeString(index: number): void {
		this.strings.splice(index, 1);
	}

	public getStrings(): string[] {
		return this.strings;
	}
}
