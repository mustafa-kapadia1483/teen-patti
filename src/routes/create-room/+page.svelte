<!-- Input for create room -->
<script>
	import { run, preventDefault } from 'svelte/legacy';

	import { goto } from '$app/navigation';
	import { socket, setSocketConnection } from '$lib/stores/socket-store';
	import { displayToast } from '$lib/components/Toasts';
	import { validateRoomAccess } from '$lib/utils/room';

	let roomName = $state(),
		table = $state(50);

	function createRoomHanlder() {
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

	async function joinRoomHandler() {
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

	run(() => {
		roomName = roomName?.toLowerCase().trim();
	});
</script>

<form>
	<div class="form-control w-full max-w-xs">
		<label for="roomName" class="label">
			<span class="label-text">Room Name:</span>
		</label>
		<div class="input-group">
			<input
				bind:value={roomName}
				id="roomName"
				type="text"
				placeholder="Enter Room Name"
				class="input input-bordered w-full max-w-xs"
			/>
			<button onclick={preventDefault(joinRoomHandler)} class="btn btn-square"> Join </button>
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

	<button class="mt-4 btn btn-info" onclick={preventDefault(createRoomHanlder)}>
		Create Room
	</button>
</form>
