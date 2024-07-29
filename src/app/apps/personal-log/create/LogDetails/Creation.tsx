import StringList from "@/src/components/Array/StringList";
import useStringList from "@/src/lib/hooks/useStringList";
import { Input } from "@nextui-org/input";

export type Design = "None" | "Logo" | "Brand" | "Website" |
	"3D Modelling" | "Vector image" | "Image" | "Pixel art";

export const DESIGN_TYPES = [
	"None", "Logo", "Brand", "Website",
	"3D Modelling", "Vector image", "Image", "Pixel art"
];

/**
 * Programming details
 */
export default function Programming() {
	// TODO: Objectify the form data to use when sending the request
	const repositories = useStringList();
	
	return (
		<div>
            <div className="pt-3">
                <label htmlFor="appName">App name</label>
                <Input name="appName" placeholder="App name" />
            </div>
			
            <div className="pt-3">
                <label htmlFor="language">Language</label>
                <Input name="language" placeholder="Language" />
            </div>
			
            <div className="pt-3">
                <label htmlFor="framework">Framework</label>
                <Input name="framework" placeholder="Framework" />
            </div>
			
            <div className="pt-3">
                <label htmlFor="repositories">Repositories</label>
				<StringList
					stringList={repositories}
				>
				</StringList>
            </div>
		</div>
	);
}

