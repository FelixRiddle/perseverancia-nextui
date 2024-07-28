"use client";

import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

import AppInfo from "@/src/types/AppInfo";

/**
 * App card
 */
export default function AppCard({
	app,
}: {
	app: AppInfo
}) {
	function redirectToAppUrl() {
		if(app.pagePath) {
			window.location.href = app.pagePath;
		}
	}
	
	return (
		<Card className="max-w-[400px]" isPressable onPress={redirectToAppUrl}>
			<CardHeader className="flex gap-3">
				<div>
					<h1>{app.displayName}</h1>
				</div>
			</CardHeader>
			<CardBody>
				<p>{app.description}</p>
			</CardBody>
		</Card>
	);
}

