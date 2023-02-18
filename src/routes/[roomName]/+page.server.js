import { error } from '@sveltejs/kit';
import { serverURL } from '../../constants';

export async function load({ params }) {
	const { roomName } = params;

	const roomData = await fetch(`${serverURL}/room/${roomName}`).then((res) => {
		if (res.status == '404') {
			return { error: 'Room Not Found' };
		}
		return res.json();
	});

	if (roomData.hasOwnProperty('error')) {
		throw error(404, {
			message: roomData.error
		});
	}

	const isGameStarted = roomData.isStarted;

	if (isGameStarted) {
		throw error(404, {
			message: `${roomName} already has a game in process`
		});
	}

	return {
		roomName
	};
}
