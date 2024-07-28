import { Card } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { FiX } from "react-icons/fi";
import { IStringListsHook } from "@/src/lib/hooks/useStringList";

/**
 * StringListCard component to show strings in a Card format with NextUI's Chip and a close icon
 */
export default function StringListCard({
    stringList,
}: {
    stringList: IStringListsHook
}) {
    return (
        <Card className="mt-2">
            <ul className="flex flex-row">
                {stringList.strings.map((string, index) => (
                    <li key={index} className="m-1">
						<Chip
							key={index}
							color="primary"
							onClick={(e: any) => {
								stringList.removeString(index);
							}}
						>
							<span style={{ display: "inline" }}>
								{string}
							</span>
							<FiX size={20} color="currentColor" style={{ display: "inline" }}/>
						</Chip>
					</li>
				))}
			</ul>
        </Card>
    );
}
