"use server";

import axiosClient from "../config/axios";

/**
 * Put request
 */
export default async function putRequest(endpoint: string, formData: FormData) {
	try {
		const client = axiosClient();
		
		const response = await client.put(endpoint, formData);
		
		const data = response.data;
		
		return data;
	} catch(err: any) {
		if(err.response) {
			const data = err.response.data;
			return data;
		}
		
		console.error(err);
		
		return undefined;
	}
}
