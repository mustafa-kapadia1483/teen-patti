import { io } from 'socket.io-client';
import customParser from 'socket.io-msgpack-parser';
import { serverURL } from '$lib/config';

/**
 * @class SocketStore
 * @description Manages Socket.IO connection for real-time communication with the server.
 * This class provides a singleton instance to handle WebSocket connections across the application.
 * It uses MessagePack parser for efficient data serialization and supports both WebSocket and polling transports.
 */
class SocketStore {
	/**
     * @type {import('socket.io-client').Socket | null}
     * Reactive socket instance for real-time communication.
     * Initially set to null before connection is established.
     */
	connection;

    constructor() {
        this.connection = null;
    }

    /**
     * Establishes a socket.io connection with the server.
     * Updates the `socket` store with the established connection.
     */
    setConnection() {
        this.connection = io(serverURL, {
            parser: customParser,
            transports: ['websocket', 'polling']
        });
    }
}


export const socket = new SocketStore();