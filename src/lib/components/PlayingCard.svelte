<script lang="ts">
	interface Props {
		rank?: string | number;
		suit?: string;
		faceDown?: boolean;
		class?: string;
	}

	let { rank = 'A', suit = 'hearts', faceDown = false, class: className = '' }: Props = $props();

	// Normalize suit to what Cardmeister expects (spades, hearts, diamonds, clubs)
	let s = $derived(suit.toString().toLowerCase());
	let isSpade = $derived(s.includes('spade') || s === 's');
	let isHeart = $derived(s.includes('heart') || s === 'h');
	let isDiamond = $derived(s.includes('diamond') || s === 'd');
	// Default to clubs if not matched
	let displaySuit = $derived(
		isSpade ? 'spades' : isHeart ? 'hearts' : isDiamond ? 'diamonds' : 'clubs'
	);

	// Normalize rank to what Cardmeister expects (1-13 or A, J, Q, K)
	let rawRank = $derived(rank.toString().toUpperCase());
	let displayRank = $derived(
		faceDown || rawRank === '0'
			? '0'
			: rawRank
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
	// Theme colors
	let isRed = $derived(s.includes('heart') || s.includes('diamond') || s === 'h' || s === 'd');
	let suitColor = $derived(isRed ? '#e60000' : '#1a1a1a');
	let cardColor = $derived(isRed ? '#fffdfd' : '#fcfcfc');
</script>

<svelte:head>
	<script src="https://cardmeister.github.io/elements.cardmeister.full.js"></script>
</svelte:head>

{#if faceDown || rawRank === '0'}
	<div
		class="bg-base-300 border-primary relative flex h-36 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border-[1.5px] shadow-md backdrop-blur-md transition-transform {className}"
	>
		<!-- Intricate card back pattern -->
		<div
			class="border-primary/50 bg-primary/5 absolute inset-1 flex items-center justify-center overflow-hidden rounded-[4px] border-[1.5px]"
		>
			<svg width="100%" height="100%" class="absolute inset-0">
				<defs>
					<pattern
						id="card-back-pattern"
						x="0"
						y="0"
						width="16"
						height="16"
						patternUnits="userSpaceOnUse"
					>
						<path
							d="M 8 0 L 16 8 L 8 16 L 0 8 Z"
							fill="none"
							class="stroke-primary"
							stroke-width="1.5"
							opacity="0.3"
						/>
						<circle cx="8" cy="8" r="1.5" class="fill-primary" opacity="0.5" />
						<path
							d="M 0 0 L 16 16 M 16 0 L 0 16"
							class="stroke-primary"
							stroke-width="0.5"
							opacity="0.2"
						/>
					</pattern>
				</defs>
				<rect x="0" y="0" width="100%" height="100%" fill="url(#card-back-pattern)" />
			</svg>
			<div
				class="border-primary/40 bg-base-300/90 absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm"
			>
				<svg
					viewBox="0 0 24 24"
					class="text-primary h-5 w-5 fill-current opacity-80"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" />
				</svg>
			</div>
		</div>
	</div>
{:else}
	<!-- We delegate entirely to Cardmeister's custom element -->
	<!-- Setting display: block ensures it adheres to the h-36 w-24 tailwind classes -->
	<playing-card 
		class="block h-36 w-24 shrink-0 transition-transform {className}" 
		rank={displayRank} 
		suit={displaySuit}
		cardcolor={cardColor}
		suitcolor={suitColor}
		rankcolor={suitColor}
		courtcolors="#d4af37,#bd1e1e,#2a4b7c,#1a1a1a,#1a1a1a,4"
		bordercolor="#d1d5db"
		borderline="1.5"
		borderradius="0.5rem"
	></playing-card>
{/if}
