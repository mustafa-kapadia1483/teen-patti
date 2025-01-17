import { io, Socket } from 'socket.io-client';
import customParser from 'socket.io-msgpack-parser';
import { serverURL } from '$lib/config';

export const socket: Socket = io(serverURL, {
	parser: customParser,
	transports: ['websocket', 'polling']
});