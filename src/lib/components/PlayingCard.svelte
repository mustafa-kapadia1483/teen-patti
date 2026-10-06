<script lang="ts">
	import { Heart, Spade, Club, Diamond, Crown } from '@lucide/svelte';

	interface Props {
		rank?: string | number;
		suit?: string;
		faceDown?: boolean;
		class?: string;
	}

	let { rank = 'A', suit = 'hearts', faceDown = false, class: className = '' }: Props = $props();

	// Normalize suit
	let s = $derived(suit.toString().toLowerCase());
	let isRed = $derived(s.includes('heart') || s.includes('diamond') || s === 'h' || s === 'd');
	let isHeart = $derived(s.includes('heart') || s === 'h');
	let isDiamond = $derived(s.includes('diamond') || s === 'd');
	let isSpade = $derived(s.includes('spade') || s === 's');
	let isClub = $derived(s.includes('club') || s === 'c');

	// Normalize rank
	let displayRank = $derived(
		rank
			.toString()
			.toUpperCase()
			.replace(/^11$/, 'J')
			.replace(/^12$/, 'Q')
			.replace(/^13$/, 'K')
			.replace(/^14$/, 'A')
			.replace(/^1$/, 'A')
			.replace(/^JACK$/, 'J')
			.replace(/^QUEEN$/, 'Q')
			.replace(/^KING$/, 'K')
			.replace(/^ACE$/, 'A')
	);
</script>

{#if faceDown || rank === '0' || rank === 0}
	<div
		class="border-primary bg-base-300 flex h-36 w-24 items-center justify-center rounded-xl border-2 shadow-xl {className} relative shrink-0 overflow-hidden backdrop-blur-md transition-transform"
	>
		<!-- Card back pattern -->
		<div
			class="border-primary/30 absolute inset-1 flex items-center justify-center rounded-lg border-2"
		>
			<div
				class="text-primary absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,currentColor_4px,currentColor_8px)] opacity-20"
			></div>
			<Crown class="text-primary z-10 h-10 w-10 opacity-80" />
		</div>
	</div>
{:else}
	<div
		class="flex h-36 w-24 flex-col justify-between rounded-xl border border-gray-300 bg-white p-2 shadow-lg {className} relative shrink-0 overflow-hidden transition-transform"
	>
		<!-- Top left -->
		<div class="flex flex-col items-center self-start {isRed ? 'text-red-600' : 'text-gray-900'}">
			<span class="text-xl leading-none font-black">{displayRank}</span>
			{#if isHeart}
				<Heart class="h-4 w-4 fill-current" />
			{:else if isDiamond}
				<Diamond class="h-4 w-4 fill-current" />
			{:else if isSpade}
				<Spade class="h-4 w-4 fill-current" />
			{:else if isClub}
				<Club class="h-4 w-4 fill-current" />
			{/if}
		</div>

		<!-- Center large icon -->
		<div
			class="pointer-events-none absolute inset-0 flex items-center justify-center {isRed
				? 'text-red-600'
				: 'text-gray-900'}"
		>
			{#if isHeart}
				<Heart class="h-12 w-12 fill-current opacity-100" />
			{:else if isDiamond}
				<Diamond class="h-12 w-12 fill-current opacity-100" />
			{:else if isSpade}
				<Spade class="h-12 w-12 fill-current opacity-100" />
			{:else if isClub}
				<Club class="h-12 w-12 fill-current opacity-100" />
			{/if}
		</div>

		<!-- Bottom right (inverted) -->
		<div
			class="flex rotate-180 flex-col items-center self-end {isRed
				? 'text-red-600'
				: 'text-gray-900'}"
		>
			<span class="text-xl leading-none font-black">{displayRank}</span>
			{#if isHeart}
				<Heart class="h-4 w-4 fill-current" />
			{:else if isDiamond}
				<Diamond class="h-4 w-4 fill-current" />
			{:else if isSpade}
				<Spade class="h-4 w-4 fill-current" />
			{:else if isClub}
				<Club class="h-4 w-4 fill-current" />
			{/if}
		</div>
	</div>
{/if}
