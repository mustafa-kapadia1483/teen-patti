import { writable } from 'svelte/store';
import { io } from 'socket.io-client';
import customParser from 'socket.io-msgpack-parser';
import { serverURL } from '$lib/config';

export const socket = writable(null);

export const setSocketConnection = () => {
    const newSocket = io(serverURL, {
        parser: customParser,
        transports: ['websocket', 'polling']
    });
    socket.set(newSocket);
}