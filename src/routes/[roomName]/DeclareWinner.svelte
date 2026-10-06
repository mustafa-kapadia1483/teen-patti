<script lang="ts">
	import { Trophy } from '@lucide/svelte';

	interface Props {
		selectedWinnerID: string;
		declareWinnerHandler: (e: MouseEvent) => void;
		usersPlaying: User[];
	}
	let { selectedWinnerID = $bindable(), declareWinnerHandler, usersPlaying }: Props = $props();
</script>

<div class="card bg-base-100 border-accent/30 mx-auto mt-6 w-full max-w-md border shadow-xl">
	<div class="card-body p-6 text-center">
		<h3
			class="card-title text-accent mb-4 flex items-center justify-center gap-2 text-xl font-bold"
		>
			<Trophy class="h-6 w-6" /> Declare Winner
		</h3>
		<div class="join w-full">
			<select bind:value={selectedWinnerID} class="select select-bordered join-item w-full flex-1">
				<option disabled value="">Pick Winner</option>
				{#each usersPlaying as user}
					<option value={user.id}>{user.username}</option>
				{/each}
			</select>
			<button
				onclick={declareWinnerHandler}
				class="btn btn-accent join-item font-bold"
				disabled={!selectedWinnerID}
			>
				Confirm
			</button>
		</div>
	</div>
</div>
