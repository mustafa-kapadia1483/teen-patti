import { io } from 'socket.io-client';
import customParser from 'socket.io-msgpack-parser';
import { serverURL } from '#lib/config.js';

class SocketStore {
	// autoConnect: false — no WebSocket is opened until connect() is called explicitly
	socket = io(serverURL, {
		parser: customParser,
		transports: ['websocket', 'polling'],
		autoConnect: false
	});
	connected = $state<boolean>(false);

	constructor() {
		this.socket.on('connect', () => {
			this.connected = true;
		});

		this.socket.on('disconnect', () => {
			this.connected = false;
		});
	}

	/** Open the connection. Safe to call multiple times — no-ops if already connected. */
	connect() {
		if (!this.socket.connected) {
			this.socket.connect();
		}
	}

	/** Close the connection and reset state. */
	disconnect() {
		this.socket.disconnect();
		this.connected = false;
	}
}

export const socket = new SocketStore();
