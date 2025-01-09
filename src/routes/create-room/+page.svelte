<!-- Input for create room -->
<script>
	import { goto } from '$app/navigation';
	import { socket, setSocketConnection } from '$lib/stores/socket-store';
	import { displayToast } from '$lib/components/Toasts';
	import { validateRoomAccess } from '$lib/utils/room';

	/** @type {string} Room name */
	let roomName = $state("");

	/** @type {number} Table value */
	let table = $state(50);

	function createRoomHanlder(e) {
		e.preventDefault();
		if (!roomName) {
			displayToast('Could not Create Room: Please enter valid room name', 'error');
			return;
		}
		setSocketConnection();

		$socket.emit('createRoom', roomName, table);
		
		$socket.once('message', ({ text }) => {
			displayToast(text, 'success');
			goto(roomName);
		});
		
		$socket.once('error', ({ message }) => {
			displayToast(message, 'error');
		});
	}

	async function joinRoomHandler(e) {
		e.preventDefault();
		if (!roomName) {
			displayToast('Could not Join Room: Please enter valid room name', 'error');
			return;
		}

		const roomAcess = await validateRoomAccess(roomName);
		if (roomAcess.hasOwnProperty('error')) {
			displayToast(roomAcess.error, 'error');
			return;
		}

		goto(roomName);
	}
</script>

<form>
	<div class="form-control w-full max-w-xs">
		<label for="roomName" class="label">
			<span class="label-text">Room Name:</span>
		</label>
		<div class="join">
			<input
				bind:value={roomName}
				oninput={() => {
					roomName = roomName?.toLowerCase().trim();
				}}
				id="roomName"
				type="text"
				placeholder="Enter Room Name"
				class="input input-bordered w-full max-w-xs join-item"
			/>
			<button onclick={joinRoomHandler} class="btn btn-square join-item">Join</button>
		</div>
	</div>
	<div class="form-control w-full max-w-xs">
		<label for="table" class="label">
			<span class="label-text">Table:</span>
		</label>
		<input
			min="50"
			bind:value={table}
			id="table"
			type="number"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
		/>
	</div>

	<button class="mt-4 btn btn-info" onclick={createRoomHanlder}>
		Create Room
	</button>
</form>
