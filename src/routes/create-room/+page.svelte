<!-- Input for create room -->
<script>
	import { goto } from '$app/navigation';
	import { socket } from '../../stores';
	import { displayToast } from '$lib/components/Toasts';
	import { io } from 'socket.io-client';
	import { serverURL } from '../../constants';
	import { onMount } from 'svelte';
	import customParser from 'socket.io-msgpack-parser';

	let roomName,
		table = 50;

	function createRoomHanlder() {
		if (!roomName) {
			displayToast('Could not Create Room: Please enter valid room name', 'error');
			return;
		}
		$socket.emit('createRoom', roomName, table);
		$socket.on('message', ({ text }) => {
			displayToast(text, 'success');
			goto(roomName);
		});
	}

	function joinRoomHandler() {
		if (!roomName) {
			displayToast('Could not Join Room: Please enter valid room name', 'error');
			return;
		}
		$socket.emit('joinRoom', roomName);
		$socket.on('message', ({ text }) => {
			displayToast(text, 'success');
			goto(roomName);
		});
	}

	$: {
		roomName = roomName?.toLowerCase().trim();
	}

	onMount(() => {
		console.log(serverURL);
		const newSocket = io(serverURL, {
			parser: customParser,
			transports: ['websocket', 'polling']
		});
		$socket = newSocket;
		$socket.on('error', ({ message }) => {
			displayToast(message, 'error');
		});
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
			<button on:click|preventDefault={joinRoomHandler} class="btn btn-square"> Join </button>
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

	<button class="mt-4 btn btn-info" on:click|preventDefault={createRoomHanlder}>
		Create Room
	</button>
</form>
