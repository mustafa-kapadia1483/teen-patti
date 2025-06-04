<script lang="ts">
	import { onMount } from 'svelte';
	import { socket } from '$lib/stores/socket-store.svelte.js';
	import { displayToast } from '$lib/components/Toasts';
	import { goto } from '$app/navigation';
	import UsernameForm from './UsernameForm.svelte';
	import UsersTable from './UsersTable.svelte';
	import DeclareWinner from './DeclareWinner.svelte';

	let { data } = $props();

	/** Username of the current player */
	let username = $state<string>('');

	/** To check whether user has been created and joined the room */
	let usernameCreated = $state<boolean>(false);
		
	let roomData = $state<RoomData|null>(null);
	$inspect(roomData);

	/** Value to cut the deck at */
	let cutAt = $state<number>(0);

	/** Number of cards to deal to each player */
	let cardsToDeal = $state<number>(3);

	/** ID of the user who won the round */
	let selectedWinnerID = $state<string>("");

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
	const myChance = $derived<boolean>(roomData?.usersList?.[roomData?.currentPlayer]?.id === socket.socket?.id);

	/** To check whether the current player is allowed to play blind */
	const currentPlayerIsBlind = $derived(roomData?.usersList?.[roomData?.currentPlayer]?.isBlind);

	function leaveRoomHandler() {
		socket.socket.emit('leaveRoom');
		goto('create-room');
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
		socket.socket.on('error', ({ message }) => {
			displayToast(message, 'error');
		});

		socket.socket.on('message', ({ text }) => {
			if (text.includes('won')) {
				displayToast(text, 'success');
				return;
			}
			displayToast(text, 'info');
		});

		socket.socket.on('roomData', (res) => {
			roomData = { ...roomData, ...res };
			// Whenever the roomData changes, reset the chal based on the current player's blind status
			chal = Math.ceil(maxStake / (currentPlayerIsBlind ? 2 : 1));
		});

		socket.socket.on('disconnect', (reason) => {
			if (reason === 'io server disconnect') {
				// the disconnection was initiated by the server, you need to reconnect manually
				socket.socket.connect();
			}
			// else the socket will automatically try to reconnect
		});
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

<svelte:head>
	<script src="/elements.cardmeister.min.js"></script>
</svelte:head>

<div class="mt-3 text-center md:flex md:flex-row md:justify-between">
	<h1>{usernameCreated ? username : ''} Welcome to Room: {data.roomName}</h1>
	<div class="mt-3 md:mt-0 flex items-center flex-col md:items-end gap-2">
		{#if roomData?.isStarted}
			<div class="flex">
				<p>Current Pot: {roomData.pot}</p>
				<div class="divider divider-horizontal"></div>
				<p>Max Stake: {maxStake}</p>
				<div class="divider divider-horizontal"></div>
				<p>Users Playing: {usersPlaying.length}</p>
			</div>
		{/if}
		{#if usernameCreated}
			<button class="btn btn-error btn-sm" onclick={leaveRoomHandler}>Leave Room</button>
		{/if}
	</div>
</div>

<!-- Once game ends, show the game initiater the option to select the winner -->
{#if roomData?.gameShow && socket.socket?.id === roomData.initiator}
	<DeclareWinner bind:selectedWinnerID {declareWinnerHandler} {usersPlaying} />
{/if}

{#if roomData && !roomData.isStarted}
	<form>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="cardsToDeal">
				<span class="label-text">Cards to Deal: {cardsToDeal}</span>
			</label>
			<input
				bind:value={cardsToDeal}
				required
				min="1"
				max={52 / roomData?.usersList?.length}
				type="range"
				id="cardsToDeal"
				placeholder="Type here"
				class="range"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="cutAt">
				<span class="label-text">Cut At: {cutAt}</span>
			</label>
			<input
				bind:value={cutAt}
				required
				type="range"
				id="cutAt"
				min="0"
				max={52 - cardsToDeal * roomData?.usersList?.length}
				placeholder="Type here"
				class="range"
			/>
		</div>
		<button class="btn btn-success mt-2" onclick={startGameHandler}>Start Game</button>
	</form>
{/if}

{#if !usernameCreated}
	<UsernameForm bind:username bind:usernameCreated roomName={data.roomName} />
{/if}

{#if roomData && !roomData.isStarted}
	<UsersTable usersList={roomData.usersList} table={roomData.table} />
{/if}

{#if roomData?.isStarted}
	<div class="mt-16 space-y-8 md:grid md:grid-cols-3 md:gap-3 md:space-y-0">
		{#each roomData.usersList as user, userIndex}
			<div class="indicator w-full">
				{#if userIndex === roomData.currentPlayer}
					<span class="badge indicator-item badge-secondary indicator-center indicator-top"
						>playing…</span
					>
				{/if}
				<div
					class="card w-full bg-base-100 shadow-xl"
					class:card-bordered={userIndex === roomData.currentPlayer}
					class:bg-base-300={userIndex === roomData.currentPlayer}
				>
					<div class="card-body">
						<div class="card-title">{user.username}</div>
						<div class="flex justify-between">
							<span>Cards:</span>
							<span class="flex items-center gap-1"
								><small>Balance:</small> <strong>{user.balance}</strong></span
							>
						</div>
						<ol class="my-2 flex justify-center gap-2">
							{#each user.cardsInHand as card}
								<!-- Only show cards when current user is not blind  -->
								<!-- Only show cards when gameShow is true and current user is not packed (only show cards for last 2 remaining players)  -->
								{#if (!user.isBlind && user.id === socket.socket.id) || (roomData.gameShow && !user.isPacked)}
									<card-t class="w-32" rank={card.rank} suit={card.suit}></card-t>
								{:else}
									<card-t class="w-32" rank="0" backcolor="green" backtext=" "></card-t>
								{/if}
							{/each}
						</ol>

						{#if user.isPacked}
							<p>Packed</p>
						{:else if roomData.gameShow}
							<p>Show Called</p>
						{:else if user.id === socket.socket.id}
							<div class="flex flex-wrap justify-end gap-2">
								<button onclick={seeCardsHandler} disabled={!user.isBlind} class="btn btn-accent"
									>See</button
								>
								{#if myChance}
									<div class="form-control">
										<div class="input-group">
											<input
												bind:value={chal}
												min={roomData.maxStake / (user.isBlind ? 2 : 1)}
												max={user.balance}
												type="number"
												class="input input-bordered w-16"
												disabled={!myChance}
											/>
											<button
												disabled={!myChance}
												onclick={chalHandler}
												class="btn btn-square btn-secondary"
											>
												{user.isBlind ? 'Blind' : 'Chal'}
											</button>
										</div>
									</div>
									<button
										disabled={!myChance}
										onclick={packHandler}
										class="btn btn-outline btn-error">Pack</button
									>
									<button
										disabled={usersPlaying.length > 2 || !myChance}
										onclick={showHandler}
										class="btn btn-success">Show</button
									>
								{/if}
							</div>
						{:else}
							<div>{user.isBlind ? 'Playing Blind' : 'Cards Seen'}</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
