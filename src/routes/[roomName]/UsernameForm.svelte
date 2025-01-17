<script lang="ts">
	import { socket } from '$lib/stores/socket-store.svelte.js';
	import { displayToast } from '$lib/components/Toasts';

	/** @type {{username: string, usernameCreated?: boolean, roomName: string}} */
	let { username = $bindable(), usernameCreated = $bindable(false), roomName } = $props();

	function createUserHandler(e: MouseEvent): void {
		e.preventDefault();
		if (!username) {
			displayToast('Could not Create User: Please enter valid username', 'error');
			return;
		}
		socket.emit('joinRoom', username, roomName);
		socket.once('message', ({ text }) => {
			usernameCreated = true;
		});

		socket.once('error', ({ message }) => {
			displayToast(message, 'error');
		});
	}
</script>

<form class="mt-4 flex items-end gap-2 rounded-md bg-slate-700 p-5 md:w-96">
	<div class="form-control w-full max-w-xs">
		<label class="label" for="username">
			<span class="label-text">Username</span>
		</label>
		<input
			bind:value={username}
			required
			type="text"
			id="username"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
		/>
	</div>

	<button class="btn btn-info" onclick={createUserHandler}> Create User </button>
</form>
