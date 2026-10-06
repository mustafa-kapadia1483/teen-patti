<!-- Input for create room -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { socket } from '#lib/stores/socket-store.svelte.js';
	import { displayToast } from '#lib/components/Toasts/index.js';
	import { validateRoomAccess } from '#lib/utils/room.js';

	let roomName = $state<string>('');

	let table = $state<number>(50);

	onMount(() => {
		// Connect here so the "Create Room" button becomes visible once connected.
		// We do NOT disconnect on leave — if the user is navigating to a room,
		// disconnecting here would sever the connection before [roomName] can take over.
		// The [roomName] page owns the full connect/disconnect lifecycle.
		socket.connect();
	});

	function createRoomHanlder(e: MouseEvent) {
		e.preventDefault();

		// Guard first — before registering any listeners or emitting
		if (!socket.socket.connected) {
			displayToast('Could not create room, please try again after sometime', 'error');
			return;
		}

		if (!roomName) {
			displayToast('Could not Create Room: Please enter valid room name', 'error');
			return;
		}

		// Use named handlers so they can be cleaned up if either fires
		function onSuccess({ text }: { text: string }) {
			socket.socket.off('error', onFailure);
			displayToast(text, 'success');
			goto('/' + roomName);
		}

		function onFailure({ message }: { message: string }) {
			socket.socket.off('message', onSuccess);
			displayToast(message, 'error');
		}

		socket.socket.once('message', onSuccess);
		socket.socket.once('error', onFailure);

		socket.socket.emit('createRoom', roomName, table);
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

		goto('/' + roomName);
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
