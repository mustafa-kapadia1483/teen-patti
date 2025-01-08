import { error } from '@sveltejs/kit';
import { validateRoomAccess } from '$lib/utils/room';

export async function load({ params }) {
	const { roomName } = params;

	const roomData = await validateRoomAccess(roomName);

	if (roomData.hasOwnProperty('error')) {
		error(roomData.status, {
        			message: roomData.error
        		});
	}

	return {
		roomName
	};
}
