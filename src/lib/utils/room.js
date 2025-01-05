import { serverURL } from '$lib/config';

export async function validateRoomAccess(roomName) {
    try {
        const response = await fetch(`${serverURL}/room/${roomName}`);
        
        if (response.status === 404) {
            return {
                status: response.status,
                error: "Room not found, create room instead"
            };
        }

        const result = await response.json();

        if (result.isStarted) {
            return {
                status: 400,
                error: 'Room already has a game in process'
            };
        }

        return result;
    } catch (error) {
        return {
            status: 500,
            error: 'Internal Server Error: Failed to fetch room data'
        };
    }
}
