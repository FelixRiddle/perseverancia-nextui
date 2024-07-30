"use server";

import axiosClient from "../config/axios";

/**
 * Seeing that behavior is many times similar, this is the generalization of sending a request.
 */
export default async function postRequest(endpoint: string, formData: FormData) {
	try {
		const client = axiosClient();
		
		const response = await client.post(endpoint, formData);
		
		const data = response.data;
		
		return data;
	} catch(err: any) {
		console.error(err);
		
		if(err.response) {
			const data = err.response.data;
			return data;
		}
		
		return undefined;
	}
}
