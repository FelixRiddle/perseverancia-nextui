import { Input } from "@nextui-org/input";

import StringList from "@/src/components/Array/StringList";
import useStringList from "@/src/lib/hooks/useStringList";

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
				{/* TODO: Suggest apps by usage frequency */}
            </div>
			
            <div className="pt-3">
                <label htmlFor="language">Language</label>
                <Input name="language" placeholder="Language" />
				{/* TODO: Suggest languages by usage frequency */}
            </div>
			
            <div className="pt-3">
                <label htmlFor="framework">Framework</label>
                <Input name="framework" placeholder="Framework" />
				{/* TODO: Suggest frameworks by usage frequency */}
            </div>
			
            <div className="pt-3">
                <label htmlFor="repositories">Repositories</label>
				<StringList
					stringList={repositories}
				>
				</StringList>
				{/* TODO: Suggest repositories by usage frequency */}
            </div>
		</div>
	);
}

