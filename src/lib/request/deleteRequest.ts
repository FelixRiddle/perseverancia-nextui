"use server";

import axiosClient from "../config/axios";

/**
 * Seeing that behavior is many times similar, this is the generalization of sending a request.
 */
export default async function deleteRequest(endpoint: string) {
	try {
		const instance = axiosClient();
		
		const response = await instance.delete(endpoint);
		
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
