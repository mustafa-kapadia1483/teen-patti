import { io } from 'socket.io-client';
import customParser from 'socket.io-msgpack-parser';
import { serverURL } from '$lib/config';

class SocketStore {
	socket = io(serverURL, {
		parser: customParser,
		transports: ['websocket', 'polling']
	});
	connected = $state<boolean>(this.socket.connected);
	constructor() {
		this.socket.on('connect', () => {
			this.connected = true;
		});

		this.socket.on('disconnect', () => {
			this.connected = false;
		});
	}
}

export const socket = new SocketStore();
