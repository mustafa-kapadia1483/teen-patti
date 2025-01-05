export const serverURL = import.meta.env.DEV
	? 'http://localhost:8080'
	: import.meta.env.VITE_SERVER_URL;
