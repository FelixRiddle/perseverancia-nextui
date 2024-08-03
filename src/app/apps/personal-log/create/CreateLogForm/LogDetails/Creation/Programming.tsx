import { Input } from "@nextui-org/input";

import StringList from "@/src/components/Array/StringList";
import useStringList from "@/src/lib/hooks/useStringList";
import { Details, ProgrammingDetails } from "@/src/types/apps/personal-log/Details";

/**
 * Programming details
 */
export default function Programming({
	subtypeData,
	setSubtypeData,
}: {
	subtypeData: Details<ProgrammingDetails>;
	setSubtypeData: (data: any) => void;
}) {
	// Store repositories in a list and send them back when requested
	const repositories = useStringList({
		initialStrings: subtypeData.repositories || [],
		onChange: (repositoryList: string[]) => {
			setSubtypeData((data: any) => {
				// Only set if there are repositories in the list
				if (repositoryList.length > 0) {
					setSubtypeData({
						...subtypeData,
						repositories: repositoryList,
					});
					
					return {
						...data,
						// Subscribes to the hook data
						repositories: repositoryList,
					};
                }
				setSubtypeData({
					...subtypeData,
				});
				
                return data;
			});
		}
	});
	
    /**
     * Update app name
     */
    function handleAppName(e: React.ChangeEvent<HTMLInputElement>) {
        setSubtypeData((data: Details<ProgrammingDetails>) => ({
            ...data,
            appName: e.target.value,
        }));
    }
    
    /**
     * Update language
     */
    function handleLanguage(e: React.ChangeEvent<HTMLInputElement>) {
        setSubtypeData((data: Details<ProgrammingDetails>) => ({
            ...data,
            language: e.target.value,
        }));
    }
    
    /**
     * Update framework
     */
    function handleFramework(e: React.ChangeEvent<HTMLInputElement>) {
        setSubtypeData((data: Details<ProgrammingDetails>) => ({
            ...data,
            framework: e.target.value,
        }));
    }
	
	return (
		<div>
            <div className="pt-3">
                <label htmlFor="appName">App name</label>
                <Input
					name="appName"
					placeholder="App name"
					value={subtypeData.appName || ""}
					onChange={handleAppName}
				/>
				{/* TODO: Suggest apps by usage frequency */}
            </div>
			
            <div className="pt-3">
                <label htmlFor="language">Language</label>
                <Input
					name="language"
					placeholder="Language"
					value={subtypeData.language || ""}
					onChange={handleLanguage}
				/>
				{/* TODO: Suggest languages by usage frequency */}
            </div>
			
            <div className="pt-3">
                <label htmlFor="framework">Framework</label>
                <Input
					name="framework"
					placeholder="Framework"
					value={subtypeData.framework || ""}
					onChange={handleFramework}
				/>
				{/* TODO: Suggest frameworks by usage frequency */}
            </div>
			
            <div className="pt-3">
                <label htmlFor="repositories">Repositories</label>
				<StringList
					stringList={repositories}
					placeholder="Add repositories"
				>
				</StringList>
				{/* TODO: Suggest repositories by usage frequency */}
            </div>
		</div>
	);
}

