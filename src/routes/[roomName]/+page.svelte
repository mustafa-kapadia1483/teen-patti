<script lang="ts">
	import { onMount } from 'svelte';
	import { socket } from '#lib/stores/socket-store.svelte.js';
	import { displayToast } from '#lib/components/Toasts/index.js';
	import { goto } from '$app/navigation';
	import UsernameForm from './UsernameForm.svelte';
	import UsersTable from './UsersTable.svelte';
	import DeclareWinner from './DeclareWinner.svelte';
	import PlayingCard from '#lib/components/PlayingCard.svelte';
	import { fly } from 'svelte/transition';
	import {
		LogOut,
		Coins,
		Users,
		IndianRupee,
		Play,
		Eye,
		Hand,
		EyeOff,
		Gavel,
		Crown,
		Swords
	} from '@lucide/svelte';

	let { data } = $props();

	/** Username of the current player */
	let username = $state<string>('');

	/** To check whether user has been created and joined the room */
	let usernameCreated = $state<boolean>(false);

	let roomData = $state<RoomData | null>(null);
	$inspect(roomData);

	/** Value to cut the deck at */
	let cutAt = $state<number>(0);

	/** Number of cards to deal to each player */
	let cardsToDeal = $state<number>(3);

	/** ID of the user who won the round */
	let selectedWinnerID = $state<string>('');

	/** Stake / Chal value that player wants to wager */
	let chal = $state<number>(1);

	let maxStake = $derived<number>(roomData?.maxStake || 1);

	/** Users who are still in the game */
	const usersPlaying = $derived.by((): Array<User> => {
		if (roomData && roomData.usersList) {
			return roomData.usersList.filter(({ isPacked }) => !isPacked);
		}

		return [];
	});

	/** To check whether the current player is allowed to play */
	const myChance = $derived<boolean>(
		roomData?.usersList?.[roomData?.currentPlayer]?.id === socket.socket?.id
	);

	/** To check whether the current player is allowed to play blind */
	const currentPlayerIsBlind = $derived(roomData?.usersList?.[roomData?.currentPlayer]?.isBlind);

	function leaveRoomHandler() {
		socket.socket.emit('leaveRoom');
		goto('/create-room');
	}

	function seeCardsHandler() {
		socket.socket.emit('seeCards');
		chal = maxStake;
	}

	function chalHandler() {
		socket.socket.emit('play', false, chal);
	}

	function showHandler() {
		socket.socket.emit('show', data.roomName);
	}

	onMount(() => {
		// Fix #1: open the connection only when the room page is active
		socket.connect();

		// Named handlers so they can be cleanly removed on unmount (Fix #2)
		function onError({ message }: { message: string }) {
			displayToast(message, 'error');
		}

		function onMessage({ text }: { text: string }) {
			if (text.includes('won')) {
				displayToast(text, 'success');
				return;
			}
			displayToast(text, 'info');
		}

		function onRoomData(res: RoomData) {
			roomData = { ...roomData, ...res };
			// Whenever the roomData changes, reset the chal based on the current player's blind status
			chal = Math.ceil(maxStake / (currentPlayerIsBlind ? 2 : 1));
		}

		function onDisconnect(reason: string) {
			if (reason === 'io server disconnect') {
				// the disconnection was initiated by the server, you need to reconnect manually
				socket.connect();
			}
			// else the socket will automatically try to reconnect
		}

		socket.socket.on('error', onError);
		socket.socket.on('message', onMessage);
		socket.socket.on('roomData', onRoomData);
		socket.socket.on('disconnect', onDisconnect);

		// Fix #2: tear down all listeners and the connection when leaving the room
		return () => {
			socket.socket.off('error', onError);
			socket.socket.off('message', onMessage);
			socket.socket.off('roomData', onRoomData);
			socket.socket.off('disconnect', onDisconnect);
			socket.disconnect();
		};
	});

	function startGameHandler(e: Event) {
		e.preventDefault();
		socket.socket.emit('start', data.roomName, cutAt, cardsToDeal);
	}

	function packHandler() {
		const confirmResult = confirm('Do you want to Pack ?');
		if (!confirmResult) {
			return;
		}
		socket.socket.emit('play', true);
	}

	/** Handler for declaring the winner */
	function declareWinnerHandler(): void {
		socket.socket.emit('confirmWin', selectedWinnerID, data.roomName);
	}
</script>

<div
	class="bg-base-100/95 border-primary/20 sticky top-0 z-50 flex flex-col items-center justify-between gap-4 rounded-b-box border-b px-4 py-3 shadow-md backdrop-blur-md md:flex-row md:gap-0"
>
	<div class="flex w-full flex-1 flex-col items-center justify-center md:items-start md:justify-start">
		<h1 class="text-primary flex items-center gap-2 text-xl font-bold">
			<Crown class="text-accent h-5 w-5" />
			{usernameCreated ? username + ' @ ' : ''}{data.roomName}
		</h1>
		{#if roomData?.isStarted && roomData?.usersList?.[roomData.currentPlayer]}
			<div class="text-base-content/70 mt-1 flex items-center gap-1.5 text-xs font-medium">
				<span class="loading loading-ring loading-xs text-warning"></span>
				Waiting on: <span class="text-warning font-bold">{roomData.usersList[roomData.currentPlayer].username}</span>
			</div>
		{/if}
	</div>

	<div class="flex w-full flex-none flex-wrap items-center justify-center gap-3 md:w-auto md:justify-end">
		{#if roomData?.isStarted}
			<div class="bg-base-200 flex items-center gap-2 rounded-lg px-3 py-2 text-xs md:gap-4 md:px-4 md:text-sm">
				<div class="flex items-center gap-1 font-semibold">
					<Coins class="text-primary h-4 w-4" /> Pot:
					<div class="grid overflow-hidden px-1">
						{#key roomData.pot}
							<span class="col-start-1 row-start-1" in:fly={{ y: -15, duration: 300 }} out:fly={{ y: 15, duration: 300 }}>
								{roomData.pot || 0}
							</span>
						{/key}
					</div>
				</div>
				<div class="divider divider-horizontal m-0"></div>
				<div class="flex items-center gap-1 font-semibold">
					<IndianRupee class="h-4 w-4 opacity-60" /> Max:
					<div class="grid overflow-hidden px-1">
						{#key maxStake}
							<span class="col-start-1 row-start-1" in:fly={{ y: -15, duration: 300 }} out:fly={{ y: 15, duration: 300 }}>
								{maxStake}
							</span>
						{/key}
					</div>
				</div>
				<div class="divider divider-horizontal m-0"></div>
				<div class="flex items-center gap-1 font-semibold">
					<Users class="text-accent h-4 w-4" />
					{usersPlaying.length}
				</div>
			</div>
		{/if}
		{#if usernameCreated}
			<button class="btn btn-outline btn-error btn-sm" onclick={leaveRoomHandler}>
				<LogOut class="h-4 w-4" /> <span class="hidden sm:inline">Leave</span>
			</button>
		{/if}
	</div>
</div>

<!-- Once game ends, show the game initiater the option to select the winner -->
{#if roomData?.gameShow && socket.socket?.id === roomData.initiator}
	<DeclareWinner bind:selectedWinnerID {declareWinnerHandler} {usersPlaying} />
{/if}

{#if roomData && !roomData.isStarted}
	<div class="card bg-base-100 border-primary/20 mx-auto mt-6 max-w-lg shadow-xl">
		<div class="card-body p-6">
			<h2 class="card-title text-primary mb-4 justify-center">
				<Swords class="h-5 w-5" /> Game Settings
			</h2>
			<form class="flex flex-col gap-4">
				<div class="form-control w-full">
					<label class="label" for="cardsToDeal">
						<span class="label-text font-semibold"
							>Cards to Deal: <span class="text-primary">{cardsToDeal}</span></span
						>
					</label>
					<input
						bind:value={cardsToDeal}
						required
						min="1"
						max={52 / (roomData?.usersList?.length || 1)}
						type="range"
						id="cardsToDeal"
						class="range range-primary"
					/>
				</div>
				<div class="form-control w-full">
					<label class="label" for="cutAt">
						<span class="label-text font-semibold"
							>Cut At: <span class="text-primary">{cutAt}</span></span
						>
					</label>
					<input
						bind:value={cutAt}
						required
						type="range"
						id="cutAt"
						min="0"
						max={52 - cardsToDeal * (roomData?.usersList?.length || 1)}
						class="range range-primary"
					/>
				</div>
				<button
					class="btn btn-primary mt-4 w-full font-bold tracking-widest uppercase"
					onclick={startGameHandler}
				>
					<Play class="h-4 w-4" /> Start Game
				</button>
			</form>
		</div>
	</div>
{/if}

{#if !usernameCreated}
	<UsernameForm bind:username bind:usernameCreated roomName={data.roomName} />
{/if}

{#if roomData && !roomData.isStarted}
	<UsersTable usersList={roomData.usersList} table={roomData.table} />
{/if}

{#if roomData?.isStarted}
	<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each roomData.usersList as user, userIndex}
			<div class="indicator w-full">
				{#if userIndex === roomData.currentPlayer}
					<span class="badge indicator-item badge-primary z-20 font-bold shadow-sm">Turn</span>
				{/if}
				<div
					class="card w-full shadow-2xl transition-all {userIndex === roomData.currentPlayer
						? 'bg-base-200 border-primary ring-primary ring-offset-base-100 ring-2 ring-offset-2'
						: 'bg-base-100 border-base-300'} relative overflow-hidden border"
				>
					{#if user.isPacked}
						<div
							class="bg-base-300/80 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px]"
						>
							<span
								class="text-base-content/50 border-base-content/20 rotate-[-15deg] rounded-lg border-4 p-2 text-2xl font-black tracking-widest uppercase"
								>Packed</span
							>
						</div>
					{/if}
					<div class="card-body p-5">
						<div class="border-base-300 mb-2 flex items-center justify-between border-b pb-2">
							<div class="card-title flex items-center gap-2 text-lg">
								{user.username}
								{#if user.id === socket.socket.id}
									<span class="badge badge-sm badge-outline">You</span>
								{/if}
							</div>
							<span
								class="bg-base-300 flex items-center gap-1 rounded-md px-2 py-1 font-mono text-sm"
							>
								<IndianRupee class="h-3 w-3 opacity-60" />
								{user.balance}
							</span>
						</div>

						<ol class="relative my-4 flex h-36 justify-center -space-x-12">
							{#each user.cardsInHand as card, cIdx}
								<div
									class="relative transition-transform hover:-translate-y-4 focus:-translate-y-4 focus:outline-none cursor-pointer"
									style="z-index: {cIdx};"
									tabindex="0"
									role="button"
								>
									{#if (!user.isBlind && user.id === socket.socket.id) || (roomData.gameShow && !user.isPacked)}
										<PlayingCard rank={card.rank} suit={card.suit} />
									{:else}
										<PlayingCard faceDown={true} />
									{/if}
								</div>
							{/each}
						</ol>

						<div class="border-base-300 mt-4 flex min-h-16 flex-col justify-end border-t pt-4">
							{#if roomData.gameShow}
								<div class="badge badge-accent badge-lg mx-auto font-bold">
									<Eye class="mr-1 h-4 w-4" /> Showdown
								</div>
							{:else if user.id === socket.socket.id && !user.isPacked}
								<div class="flex flex-wrap items-center justify-between gap-2">
									<div class="flex gap-2">
										<button
											onclick={seeCardsHandler}
											disabled={!user.isBlind}
											class="btn btn-sm btn-outline {user.isBlind ? 'btn-info' : 'btn-disabled'}"
										>
											{#if user.isBlind}<Eye class="h-4 w-4" /> See{:else}<EyeOff class="h-4 w-4" /> Seen{/if}
										</button>
										{#if myChance}
											<button
												disabled={!myChance}
												onclick={packHandler}
												class="btn btn-sm btn-error btn-outline"
											>
												<Hand class="h-4 w-4" /> Pack
											</button>
										{/if}
									</div>

									{#if myChance}
										<div class="join">
											<input
												bind:value={chal}
												min={roomData.maxStake / (user.isBlind ? 2 : 1)}
												max={user.balance}
												type="number"
												class="input input-bordered input-sm join-item w-20 text-center font-mono"
											/>
											<button onclick={chalHandler} class="btn btn-sm btn-primary join-item">
												{user.isBlind ? 'Blind' : 'Chal'}
											</button>
										</div>
									{/if}
								</div>

								{#if myChance && usersPlaying.length === 2}
									<button onclick={showHandler} class="btn btn-accent btn-sm mt-3 w-full font-bold">
										<Gavel class="h-4 w-4" /> Show
									</button>
								{/if}
							{:else}
								<div class="text-base-content/60 text-center text-sm font-semibold">
									{#if !user.isPacked}
										{user.isBlind ? 'Playing Blind' : 'Cards Seen'}
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
