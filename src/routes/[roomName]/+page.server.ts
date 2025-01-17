import { error } from '@sveltejs/kit';
import { validateRoomAccess } from '$lib/utils/room';

export async function load({ params }): Promise<{ roomName: string }> {
	const { roomName } = params;

	const roomData = await validateRoomAccess(roomName);

	if (roomData?.error) {
		throw error(roomData.status, {
			message: roomData.error
		});
	}

	return {
		roomName
	};
}