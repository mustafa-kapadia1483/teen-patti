<script lang="ts">
	import { Info, EyeOff, Eye, Swords, Sparkles, Trophy, Coins } from '@lucide/svelte';
	import PlayingCard from '#lib/components/PlayingCard.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount, onDestroy } from 'svelte';

	let mounted = $state(false);
	let activeMechanic = $state(-1);
	
	onMount(() => {
		mounted = true;
		
		const interval = setInterval(() => {
			activeMechanic = (activeMechanic + 1) % 4; // 0, 1, 2, and 3 (none)
		}, 3000); 
		
		return () => clearInterval(interval);
	});

	const hands = [
		{
			rank: 1,
			name: 'Trail (Set)',
			desc: 'Three cards of same rank',
			cards: [
				{ r: 'A', s: 'hearts' },
				{ r: 'A', s: 'spades' },
				{ r: 'A', s: 'diamonds' }
			]
		},
		{
			rank: 2,
			name: 'Pure Sequence',
			desc: 'Three consecutive cards of same suit',
			cards: [
				{ r: 'A', s: 'hearts' },
				{ r: 'K', s: 'hearts' },
				{ r: 'Q', s: 'hearts' }
			]
		},
		{
			rank: 3,
			name: 'Sequence (Run)',
			desc: 'Three consecutive cards',
			cards: [
				{ r: 'A', s: 'hearts' },
				{ r: 'K', s: 'spades' },
				{ r: 'Q', s: 'diamonds' }
			]
		},
		{
			rank: 4,
			name: 'Color (Flush)',
			desc: 'Three cards of same suit',
			cards: [
				{ r: 'A', s: 'spades' },
				{ r: 'J', s: 'spades' },
				{ r: '8', s: 'spades' }
			]
		},
		{
			rank: 5,
			name: 'Pair',
			desc: 'Two cards of same rank',
			cards: [
				{ r: 'K', s: 'hearts' },
				{ r: 'K', s: 'clubs' },
				{ r: '7', s: 'diamonds' }
			]
		},
		{
			rank: 6,
			name: 'High Card',
			desc: 'Highest card in hand',
			cards: [
				{ r: 'A', s: 'diamonds' },
				{ r: 'J', s: 'clubs' },
				{ r: '9', s: 'hearts' }
			]
		}
	];
</script>

<article class="bg-base-200/50 min-h-screen p-4 md:p-8">
	<div class="mx-auto max-w-6xl space-y-8">
		<!-- Hero Section -->
		<div
			class="from-primary/90 to-secondary/90 relative overflow-hidden rounded-3xl bg-gradient-to-br shadow-2xl"
		>
			<!-- Abstract background elements -->
			<div class="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
			<div class="absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

			<div
				class="relative z-10 flex flex-col items-center p-8 text-center md:flex-row md:p-12 md:text-left"
			>
				<div class="mb-8 md:mb-0 md:w-1/2">
					<div
						class="mb-2 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-md"
					>
						<Sparkles class="mr-2 h-4 w-4" /> The Ultimate Card Game
					</div>
					<h1 class="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
						Teen Patti
					</h1>
					<p class="mb-6 text-lg text-white/90 md:text-xl">
						Experience the thrill of India's favorite card game. Master the art of playing blind,
						calling the bluff, and winning the pot.
					</p>
				</div>

				<!-- Hero Visual (Floating Cards) -->
				<div class="flex h-64 w-full items-center justify-center md:w-1/2">
					<div class="relative flex h-full w-full max-w-sm items-center justify-center">
						{#if mounted}
							<div class="absolute" in:fly={{ x: 200, y: -200, duration: 600, delay: 200, easing: cubicOut }}>
								<div class="animate-[bounce_3s_ease-in-out_infinite] [animation-delay:0ms]">
									<PlayingCard
										rank="A"
										suit="spades"
										class="!h-28 !w-20 -translate-x-12 translate-y-4 -rotate-12 shadow-2xl sm:!h-40 sm:!w-28"
									/>
								</div>
							</div>
							<div class="absolute z-10" in:fly={{ x: 200, y: -200, duration: 600, delay: 400, easing: cubicOut }}>
								<div
									class="animate-[bounce_3.5s_ease-in-out_infinite] [animation-delay:200ms]"
								>
									<PlayingCard
										rank="K"
										suit="hearts"
										class="!h-28 !w-20 shadow-2xl sm:!h-40 sm:!w-28"
									/>
								</div>
							</div>
							<div class="absolute" in:fly={{ x: 200, y: -200, duration: 600, delay: 600, easing: cubicOut }}>
								<div class="animate-[bounce_4s_ease-in-out_infinite] [animation-delay:400ms]">
									<PlayingCard
										rank="Q"
										suit="diamonds"
										class="!h-28 !w-20 translate-x-12 translate-y-4 rotate-12 shadow-2xl sm:!h-40 sm:!w-28"
									/>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- How to Play Mechanics -->
		<div class="grid gap-6 md:grid-cols-3">
			<!-- Blind Player -->
			<div
				class="card group bg-base-100 border-base-200 overflow-hidden border shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer {activeMechanic === 0 ? '-translate-y-2 shadow-2xl' : ''}"
				tabindex="0"
				role="button"
				onclick={() => activeMechanic = 0}
				onfocus={() => activeMechanic = 0}
			>
				<div class="card-body items-center text-center">
					<div
						class="bg-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-content {activeMechanic === 0 ? 'scale-110 bg-primary !text-primary-content' : ''}"
					>
						<EyeOff class="h-8 w-8" />
					</div>
					<h2 class="card-title text-2xl font-bold">Play Blind</h2>
					<p class="text-base-content/70">
						Trust your luck and play without seeing your cards. Keep the stakes low and pressure
						high!
					</p>
					<div class="mt-4 relative flex justify-center -space-x-4">
						<!-- Badge -->
						<div class="absolute -top-6 opacity-0 transition-all duration-300 group-hover:-top-8 group-hover:opacity-100 badge badge-primary font-bold shadow-md z-20 {activeMechanic === 0 ? '-top-8 !opacity-100' : ''}">
							Stake: 1x
						</div>
						
						<!-- Card 1 -->
						<div
							class="translate-y-2 -rotate-12 transition-all duration-300 group-hover:translate-x-6 group-hover:rotate-0 {activeMechanic === 0 ? 'translate-x-6 rotate-0' : ''}"
						>
							<PlayingCard faceDown={true} class="!h-16 !w-12 shadow-md" />
						</div>
						
						<!-- Card 2 (Middle card) -->
						<div class="z-10 relative transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 {activeMechanic === 0 ? '-translate-y-1 scale-105' : ''}">
							<PlayingCard faceDown={true} class="!h-16 !w-12 shadow-md" />
							
							<!-- Centered Lock Icon overlay -->
							<div class="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all duration-500 scale-50 group-hover:scale-100 group-hover:opacity-100 pointer-events-none {activeMechanic === 0 ? '!scale-100 !opacity-100' : ''}">
								<div class="bg-primary text-primary-content rounded-full p-2 shadow-xl shadow-primary/40 ring-2 ring-primary-content/20">
									<EyeOff class="h-6 w-6" />
								</div>
							</div>
						</div>
						
						<!-- Card 3 -->
						<div
							class="translate-y-2 rotate-12 transition-all duration-300 group-hover:-translate-x-6 group-hover:rotate-0 {activeMechanic === 0 ? '-translate-x-6 rotate-0' : ''}"
						>
							<PlayingCard faceDown={true} class="!h-16 !w-12 shadow-md" />
						</div>
					</div>
				</div>
			</div>

			<!-- Seen Player -->
			<div
				class="card group bg-base-100 border-base-200 overflow-hidden border shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-secondary/30 cursor-pointer {activeMechanic === 1 ? '-translate-y-2 shadow-2xl' : ''}"
				tabindex="0"
				role="button"
				onclick={() => activeMechanic = 1}
				onfocus={() => activeMechanic = 1}
			>
				<div class="card-body items-center text-center">
					<div
						class="bg-secondary/10 text-secondary mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-content {activeMechanic === 1 ? 'scale-110 bg-secondary !text-secondary-content' : ''}"
					>
						<Eye class="h-8 w-8" />
					</div>
					<h2 class="card-title text-2xl font-bold">Play Seen</h2>
					<p class="text-base-content/70">
						View your cards and make calculated bets. Chaal, pack, or slide-show based on your hand.
					</p>
					<div class="mt-4 relative flex justify-center -space-x-4 [perspective:1000px]">
						<!-- Badge -->
						<div class="absolute -top-6 opacity-0 transition-all duration-300 group-hover:-top-8 group-hover:opacity-100 badge badge-secondary font-bold shadow-md z-20 {activeMechanic === 1 ? '-top-8 !opacity-100' : ''}">
							Stake: 2x
						</div>
						
						<!-- Card 1 -->
						<div class="translate-y-2 -rotate-12 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-rotate-6 z-0 {activeMechanic === 1 ? '-translate-x-2 -rotate-6' : ''}">
							<div class="relative !h-16 !w-12 [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)] shadow-md rounded-lg {activeMechanic === 1 ? '[transform:rotateY(180deg)]' : ''}">
								<div class="absolute inset-0 [backface-visibility:hidden]">
									<PlayingCard faceDown={true} class="!h-16 !w-12" />
								</div>
								<div class="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
									<PlayingCard rank="10" suit="clubs" class="!h-16 !w-12" />
								</div>
							</div>
						</div>

						<!-- Card 2 -->
						<div class="z-10 transition-transform duration-500 group-hover:-translate-y-2 {activeMechanic === 1 ? '-translate-y-2' : ''}">
							<div class="relative !h-16 !w-12 [transform-style:preserve-3d] transition-transform duration-700 delay-100 group-hover:[transform:rotateY(180deg)] shadow-md rounded-lg {activeMechanic === 1 ? '[transform:rotateY(180deg)]' : ''}">
								<div class="absolute inset-0 [backface-visibility:hidden]">
									<PlayingCard faceDown={true} class="!h-16 !w-12" />
								</div>
								<div class="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
									<PlayingCard rank="J" suit="diamonds" class="!h-16 !w-12" />
								</div>
							</div>
						</div>

						<!-- Card 3 -->
						<div class="translate-y-2 rotate-12 transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-6 z-20 {activeMechanic === 1 ? 'translate-x-2 rotate-6' : ''}">
							<div class="relative !h-16 !w-12 [transform-style:preserve-3d] transition-transform duration-700 delay-200 group-hover:[transform:rotateY(180deg)] shadow-md rounded-lg {activeMechanic === 1 ? '[transform:rotateY(180deg)]' : ''}">
								<div class="absolute inset-0 [backface-visibility:hidden]">
									<PlayingCard faceDown={true} class="!h-16 !w-12" />
								</div>
								<div class="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
									<PlayingCard rank="Q" suit="hearts" class="!h-16 !w-12" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Showdown -->
			<div
				class="card group bg-base-100 border-base-200 overflow-hidden border shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-accent/30 cursor-pointer {activeMechanic === 2 ? '-translate-y-2 shadow-2xl' : ''}"
				tabindex="0"
				role="button"
				onclick={() => activeMechanic = 2}
				onfocus={() => activeMechanic = 2}
			>
				<div class="card-body items-center text-center">
					<div
						class="bg-accent/10 text-accent mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-content {activeMechanic === 2 ? 'scale-110 bg-accent !text-accent-content' : ''}"
					>
						<Swords class="h-8 w-8" />
					</div>
					<h2 class="card-title text-2xl font-bold">The Showdown</h2>
					<p class="text-base-content/70">
						When only two players remain, compare cards. The highest-ranking hand takes the pot!
					</p>
					<div
						class="mt-4 relative flex w-full items-center justify-center space-x-2 h-24"
					>
						<!-- Losing hand -->
						<div class="-rotate-6 transition-all duration-500 group-hover:translate-y-4 group-hover:-rotate-[25deg] group-hover:grayscale group-hover:opacity-50 relative {activeMechanic === 2 ? 'translate-y-4 -rotate-[25deg] grayscale opacity-50' : ''}">
							<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-error text-error-content text-[10px] font-bold px-1.5 rounded opacity-0 transition-opacity duration-300 delay-300 group-hover:opacity-100 z-10 {activeMechanic === 2 ? '!opacity-100' : ''}">LOSE</div>
							<PlayingCard rank="K" suit="spades" class="!h-20 !w-14 shadow-md" />
						</div>

						<!-- VS Text (Fades out) -->
						<div class="text-accent flex items-center justify-center px-1 text-2xl font-bold italic transition-opacity duration-300 group-hover:opacity-0 relative w-8 {activeMechanic === 2 ? '!opacity-0' : ''}">
							<span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">VS</span>
							<!-- Flying Chips (Animate from left to right across VS) -->
							<div class="absolute left-[-20px] top-1/2 -translate-y-1/2 opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:left-[20px] group-hover:-rotate-45 z-20 pointer-events-none scale-50 group-hover:scale-100 {activeMechanic === 2 ? '!opacity-100 left-[20px] -rotate-45 scale-100' : ''}">
								<Coins class="text-warning h-6 w-6 absolute -top-4 -left-2 drop-shadow-md fill-warning" />
								<Coins class="text-warning h-5 w-5 absolute top-0 left-2 delay-100 drop-shadow-md fill-warning" />
							</div>
						</div>

						<!-- Winning hand -->
						<div class="rotate-6 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-0 relative {activeMechanic === 2 ? 'scale-110 -translate-y-2 rotate-0' : ''}">
							<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-success text-success-content text-[10px] font-bold px-1.5 rounded opacity-0 transition-opacity duration-300 delay-300 group-hover:opacity-100 shadow-sm z-20 {activeMechanic === 2 ? '!opacity-100' : ''}">WIN!</div>
							<div class="transition-shadow duration-500 group-hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.8)] rounded-lg {activeMechanic === 2 ? 'drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]' : ''}">
								<PlayingCard rank="A" suit="hearts" class="!h-20 !w-14 shadow-md" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title text-primary text-3xl font-bold">Hand Rankings</h2>
				<p class="text-base-content/80 text-lg">
					Best hand: Trail (Three of a kind)<br />
					Highest sequence: A-K-Q followed by A-2-3
				</p>

				<div class="divider">Visual Guide</div>

				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each hands as hand}
						<div
							class="group border-base-300 bg-base-200/30 hover:bg-base-200 focus:bg-base-200 relative rounded-xl border p-6 transition-all hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
							tabindex="0"
							role="button"
						>
							<div
								class="bg-primary text-primary-content absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full font-bold shadow-sm"
							>
								{hand.rank}
							</div>
							<h3 class="text-base-content mb-1 text-xl font-bold">{hand.name}</h3>
							<p class="text-base-content/70 mb-6 h-10 text-sm">{hand.desc}</p>

							<div class="flex justify-center pt-2 pb-4">
								<div class="relative flex h-32 w-full justify-center">
									{#each hand.cards as card, j}
										<div
											class="absolute origin-bottom drop-shadow-lg transition-all duration-500 ease-out
											{j === 0
												? '-translate-x-6 translate-y-2 -rotate-12 group-hover:-translate-x-10 group-focus:-translate-x-10 group-hover:-translate-y-2 group-focus:-translate-y-2 group-hover:-rotate-[25deg] group-focus:-rotate-[25deg]'
												: ''}
											{j === 1 ? 'z-10 group-hover:-translate-y-6 group-focus:-translate-y-6' : ''}
											{j === 2
												? 'z-20 translate-x-6 translate-y-2 rotate-12 group-hover:translate-x-10 group-focus:translate-x-10 group-hover:-translate-y-2 group-focus:-translate-y-2 group-hover:rotate-[25deg] group-focus:rotate-[25deg]'
												: ''}
										"
										>
											<PlayingCard
												rank={card.r}
												suit={card.s}
												class="!h-24 !w-16 sm:!h-28 sm:!w-20"
											/>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</article>
