/**
 * The server URL for the Teen Patti game server.
 * In development mode (DEV=true), it connects to localhost:8080
 * In production, it uses the VITE_SERVER_URL environment variable
 */
export const serverURL: string = import.meta.env.DEV
	? 'http://localhost:8080'
	: import.meta.env.VITE_SERVER_URL;
