/**
 * Api url
 */
export default function apiUrl() {
	const API_PORT = process.env.API_PORT || 3010;
	const API_HOST = process.env.API_HOST || 'localhost';
	const API_DOMAIN = process.env.API_DOMAIN;
	const API_PATH = process.env.API_PATH || "";
	
	if(API_DOMAIN) {
		return `https://${API_DOMAIN}${API_PATH}`;
	}
	
	return `http://${API_HOST}:${API_PORT}${API_PATH}`;
}
