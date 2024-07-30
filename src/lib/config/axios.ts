import axios from "axios";
import apiUrl from "./apiUrl";

/**
 * Create axios instance
 */
export default function axiosClient() {
	const url = apiUrl();
	
	let headers = {
		'Content-Type': 'application/json',
	};
	
	const axiosClient = axios.create({
		baseURL: url,
		withCredentials: true,
		headers,
	});
	
	return axiosClient;
}
