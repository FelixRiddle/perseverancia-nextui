"use server";

import axiosClient from "../config/axios";

/**
 * Send a get request with authentication if possible
 */
export default async function getRequest(endpoint: string) {
	try {
		const client = axiosClient();
		
		const response = await client.get(endpoint);
		
		const data = response.data;
		
		return data;
	} catch(err: any) {
		if(err.response) {
			const data = err.response.data;
			return data;
		}
		
		// console.error(err);
		
		return undefined;
	}
}
