<script lang="ts">
	import PlayingCard from '#lib/components/PlayingCard.svelte';

	const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
	const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
</script>

<div class="container mx-auto p-8">
	<h1 class="text-primary mb-8 text-3xl font-bold">Playing Card Deck Test</h1>

	{#each suits as suit}
		<div class="mb-10">
			<h2 class="text-base-content/70 mb-4 text-xl font-bold tracking-widest uppercase">{suit}</h2>
			<div class="flex flex-wrap gap-4">
				{#each ranks as rank}
					<PlayingCard {suit} {rank} />
				{/each}
			</div>
		</div>
	{/each}

	<div class="mb-10">
		<h2 class="text-base-content/70 mb-4 text-xl font-bold tracking-widest uppercase">Face Down</h2>
		<div class="flex flex-wrap gap-4">
			<PlayingCard faceDown={true} />
		</div>
	</div>
</div>
