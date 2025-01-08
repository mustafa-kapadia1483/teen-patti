<script>
	import { onMount } from 'svelte';
	import { socket, setSocketConnection } from '$lib/stores/socket-store';
	import { displayToast } from '$lib/components/Toasts';
	import { goto } from '$app/navigation';
	import UsernameForm from './UsernameForm.svelte';
	import UsersTable from './UsersTable.svelte';
	export let data;

	let username = '';
	let usernameCreated = false;
	let roomData = null;
	let cutAt = 0;
	let cardsToDeal = 3;
	let chal = 1;
	let selectedWinnerID;

	$: myChance = roomData?.usersList[roomData?.currentPlayer]?.id === $socket?.id;
	$: usersPlaying = roomData?.usersList?.filter(({ isPacked }) => !isPacked);

	function leaveRoomHandler() {
		$socket.emit('leaveRoom');
		goto('create-room');
	}

	function seeCardsHandler() {
		$socket.emit('seeCards');
	}

	function chalHandler() {
		$socket.emit('play', false, chal);
	}

	function showHandler() {
		$socket.emit('show', data.roomName);
	}

	onMount(() => {
		if ($socket === null) {
			setSocketConnection();
		}

		$socket.on('error', ({ message }) => {
			displayToast(message, 'error');
		});

		$socket.on('message', ({ text }) => {
			if (text.includes('won')) {
				displayToast(text, 'success');
				return;
			}
			displayToast(text, 'info');
		});

		$socket.on('roomData', (res) => {
			roomData = { ...roomData, ...res };
		});

		$socket.on('disconnect', (reason) => {
			if (reason === 'io server disconnect') {
				// the disconnection was initiated by the server, you need to reconnect manually
				socket.connect();
			}
			// else the socket will automatically try to reconnect
		});
	});

	function startGameHandler() {
		$socket.emit('start', data.roomName, cutAt, cardsToDeal);
	}

	function packHandler() {
		const confirmResult = confirm('Do you want to Pack ?');
		if (!confirmResult) {
			return;
		}
		$socket.emit('play', true);
	}

	function setChal(user) {
		chal = roomData?.maxStake / (user.isBlind ? 2 : 1);
		if (chal < 1) chal = 1;
		return '';
	}
</script>

<svelte:head>
	<script src="/elements.cardmeister.min.js"></script>
</svelte:head>

<div class="mt-3 md:flex md:flex-row justify-between">
	<h1>{usernameCreated ? username : ''} Welcome to Room: {data.roomName}</h1>
	{#if roomData?.isStarted}
		<h2 class="text-3xl">Current Pot: {roomData.pot}</h2>
	{/if}
</div>

{#if roomData?.gameShow && $socket?.id === roomData.initiator}
	<div class="form-control">
		<div class="input-group">
			<select bind:value={selectedWinnerID} class="select select-bordered">
				<option disabled selected>Pick Winner</option>
				{#each usersPlaying as user}
					<option value={user.id}>{user.username}</option>
				{/each}
			</select>
			<button
				on:click={() => $socket.emit('confirmWin', selectedWinnerID, data.roomName)}
				class="btn">Go</button
			>
		</div>
	</div>
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
				max={52 / roomData.usersList.length}
				type="range"
				id="cardsToDeal"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
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
				max={52 - cardsToDeal * roomData.usersList.length}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</div>
		<button class="btn" on:click|preventDefault={startGameHandler}>Start Game</button>
	</form>
{/if}

{#if usernameCreated}
	<button class="btn btn-ghost" on:click={leaveRoomHandler}>Leave Room</button>
{:else}
	<UsernameForm bind:username bind:usernameCreated roomName={data.roomName} />
{/if}

{#if roomData && !roomData.isStarted}
	<UsersTable usersList={roomData.usersList} table={roomData.table} />
{/if}

{#if roomData?.isStarted}
	<div class="space-y-8 md:grid md:grid-cols-3 md:gap-3 md:space-y-0">
		{#each roomData.usersList as user, userIndex}
			<div class="indicator w-full">
				{#if userIndex === roomData.currentPlayer}
					<span class="indicator-item indicator-top indicator-center badge badge-secondary"
						>playing…</span
					>
				{/if}
				<div
					class="card bg-base-100 shadow-xl w-full"
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
						<ol class="flex gap-2 my-2 justify-center">
							{#each user.cardsInHand as card}
								<!-- Only show cards when current user is not blind  -->
								<!-- Only show cards when gameShow is true and current user is not packed (only show cards for last 2 remaining players)  -->
								{#if (!user.isBlind && user.id === $socket.id) || (roomData.gameShow && !user.isPacked)}
									<card-t class="w-32" rank={card.rank} suit={card.suit} />
								{:else}
									<card-t class="w-32" rank="0" backcolor="green" backtext=" " />
								{/if}
							{/each}
						</ol>

						{#if user.isPacked}
							<p>Packed</p>
						{:else if roomData?.gameShow}
							<p>Show Called</p>
						{:else if user.id === $socket.id}
							<div class="flex gap-2 justify-end flex-wrap">
								<button
									on:click|preventDefault={seeCardsHandler}
									disabled={!user.isBlind}
									class="btn btn-accent">See</button
								>
								<div class="form-control">
									<div class="input-group">
										{setChal(user)}
										<input
											bind:value={chal}
											min={roomData?.maxStake / (user.isBlind ? 2 : 1)}
											max={user.balance}
											type="number"
											class="input w-16 input-bordered"
											disabled={!myChance}
										/>
										<button
											disabled={!myChance}
											on:click={chalHandler}
											class="btn btn-square btn-secondary"
										>
											{user.isBlind ? 'Blind' : 'Chal'}
										</button>
									</div>
								</div>
								<button
									disabled={!myChance}
									on:click={packHandler}
									class="btn btn-outline btn-error">Pack</button
								>
								<button
									disabled={usersPlaying.length > 2 || !myChance}
									on:click={showHandler}
									class="btn btn-success">Show</button
								>
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
