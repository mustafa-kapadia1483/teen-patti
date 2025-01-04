<script>
	import { socket } from '../../stores';
	import { displayToast } from '$lib/components/Toasts';

	export let username;
	export let usernameCreated = false;
	export let roomName;

	function createUserHandler() {
		if (!username) {
			displayToast('Could not Create User: Please enter valid username', 'error');
			return;
		}
		$socket.emit('joinRoom', username, roomName);
		$socket.on('message', ({ text }) => {
			usernameCreated = true;
		});
	}
</script>

<form class="bg-slate-700 flex md:w-96 items-end p-5 rounded-md mt-4 gap-2">
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

	<button class="btn btn-info" on:click|preventDefault={createUserHandler}> Create User </button>
</form>
