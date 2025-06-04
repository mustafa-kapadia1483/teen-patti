<!-- Input for create room -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { socket } from '$lib/stores/socket-store.svelte.js';
	import { displayToast } from '$lib/components/Toasts';
	import { validateRoomAccess } from '$lib/utils/room';

	let roomName = $state<string>('');

	let table = $state<number>(50);

	function createRoomHanlder(e: MouseEvent) {
		e.preventDefault();
		if (!roomName) {
			displayToast('Could not Create Room: Please enter valid room name', 'error');
			return;
		}

		socket.socket.emit('createRoom', roomName, table);

		socket.socket.once('message', ({ text }) => {
			displayToast(text, 'success');
			goto(roomName);
		});

		socket.socket.once('error', ({ message }) => {
			displayToast(message, 'error');
		});

		if (!socket.socket.connected) {
			displayToast('Could not create room, please try again after sometime', 'error');
			return;
		}
	}

	async function joinRoomHandler(e: MouseEvent) {
		e.preventDefault();
		if (!roomName) {
			displayToast('Could not Join Room: Please enter valid room name', 'error');
			return;
		}

		const roomAcess = await validateRoomAccess(roomName);
		if (roomAcess?.error) {
			displayToast(roomAcess.error, 'error');
			return;
		}

		goto(roomName);
	}
</script>

<form>
	<div class="form-control w-full max-w-xs space-y-6">
		<div class="join">
			<label class="floating-label">
				<span>Room Name:</span>
				<input
					min="50"
					bind:value={roomName}
					oninput={() => {
						roomName = roomName.toLowerCase().trim();
					}}
					id="roomName"
					type="text"
					placeholder="Enter Room Name"
					class="input input-md"
				/>
			</label>
			<button onclick={joinRoomHandler} class="btn btn-square join-item">Join</button>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="floating-label">
				<span>Table</span>
				<input
					min="50"
					bind:value={table}
					id="table"
					type="number"
					placeholder="Table"
					class="input input-md"
				/>
			</label>
		</div>
		{#if socket.connected}
			<button class="btn btn-info mt-4" onclick={createRoomHanlder}>Create Room</button>
		{:else}
			<div class="btn btn-info mt-4">
				<span class="loading loading-spinner loading-md"></span> Connecting
			</div>
		{/if}
	</div>
</form>
