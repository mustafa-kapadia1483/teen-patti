/**
 * The server URL for the Teen Patti game server.
 * In development mode (DEV=true), it connects to localhost:8080
 * In production, it uses the VITE_SERVER_URL environment variable
 */
export const serverURL: string = import.meta.env.DEV
	? 'https://teen-patti.onrender.com'
	: import.meta.env.VITE_SERVER_URL;
