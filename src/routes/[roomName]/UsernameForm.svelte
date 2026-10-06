<script lang="ts">
	import { socket } from '#lib/stores/socket-store.svelte.js';
	import { displayToast } from '#lib/components/Toasts/index.js';
	import { User, LogIn } from '@lucide/svelte';

	/** @type {{username: string, usernameCreated?: boolean, roomName: string}} */
	let { username = $bindable(), usernameCreated = $bindable(false), roomName } = $props();

	function createUserHandler(e: Event): void {
		e.preventDefault();
		if (!username) {
			displayToast('Could not Create User: Please enter valid username', 'error');
			return;
		}
		socket.socket.emit('joinRoom', username, roomName);
		socket.socket.once('message', ({ text }) => {
			usernameCreated = true;
		});

		socket.socket.once('error', ({ message }) => {
			displayToast(message, 'error');
		});
	}
</script>

<div class="card bg-base-100 border-primary/20 mx-auto mt-10 w-full max-w-md border shadow-2xl">
	<div class="card-body gap-6 p-8">
		<div class="text-center">
			<h2
				class="card-title text-primary mb-1 justify-center text-3xl font-extrabold tracking-tight"
			>
				Take a Seat
			</h2>
			<p class="text-base-content/50 text-sm">Enter your player name to join the table</p>
		</div>

		<form class="flex flex-col gap-5" onsubmit={createUserHandler}>
			<fieldset class="fieldset gap-1">
				<legend
					class="fieldset-legend text-primary/80 flex items-center gap-1 text-xs font-semibold tracking-widest uppercase"
				>
					<User class="h-3 w-3" /> Player Name
				</legend>
				<div class="join w-full">
					<input
						bind:value={username}
						required
						type="text"
						id="username"
						placeholder="e.g. CardShark99"
						class="input join-item w-full"
						autocomplete="off"
						spellcheck="false"
					/>
					<button class="btn btn-primary join-item font-bold tracking-wide" type="submit">
						<LogIn class="h-4 w-4" /> Join
					</button>
				</div>
			</fieldset>
		</form>
	</div>
</div>
