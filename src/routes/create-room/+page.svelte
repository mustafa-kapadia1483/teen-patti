<!-- Input for create room -->
<script>
	import { goto } from '$app/navigation';
	import { socket } from '../../stores';
	import { io } from 'socket.io-client';
	import { serverURL } from '../../constants';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';

	let roomName, table;

	function createRoomHanlder() {
		console.log(roomName);
		$socket.emit('createRoom', roomName, table);
		goto(roomName);
	}

	$: {
		roomName = roomName?.toLowerCase().trim();
	}

	onMount(() => {
		const newSocket = io(serverURL, {
			transports: ['websocket']
		});
		$socket = newSocket;
		$socket.on('error', console.log);
	});

	onDestroy(() => {
		$socket.off('error');
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
			<button on:click|preventDefault={() => goto(roomName)} class="btn btn-square"> Join </button>
		</div>
	</div>
	<div class="form-control w-full max-w-xs">
		<label for="table" class="label">
			<span class="label-text">Table:</span>
		</label>
		<input
			bind:value={table}
			id="table"
			type="number"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
		/>
	</div>

	<button class="mt-4 btn btn-info" on:click|preventDefault={createRoomHanlder}>
		Create Room
	</button>
</form>
