<script>
	import { onMount } from 'svelte';
	import { socket } from '../../stores';
	import { goto } from '$app/navigation';
	export let data;

	let username = '';
	let usernameCreated = false;
	let roomData = null;
	let cutAt = 0;
	let cardsToDeal = 3;
	let chal = 1;

	$: myChance = roomData?.usersList[roomData?.currentPlayer].id === $socket.id;

	function createUserHandler() {
		console.log(data.roomName);
		$socket.emit('joinRoom', username, data.roomName);
		usernameCreated = true;
	}

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

	onMount(() => {
		$socket.on('error', console.log);
		$socket.on('roomData', (res) => {
			roomData = { ...roomData, ...res };
			console.log(res);
		});
	});

	function startGameHandler() {
		$socket.emit('start', data.roomName, cutAt, cardsToDeal);
	}

	function packHandler() {
		$socket.emit('play', true);
	}
</script>

<svelte:head>
	<script src="/elements.cardmeister.min.js"></script>
</svelte:head>

<div class="mt-3 flex justify-between">
	<h1>{usernameCreated ? username : ''} Welcome to Room: {data.roomName}</h1>
	{#if roomData}
		<h2 class="text-3xl">Current Pot: {roomData.pot}</h2>
	{/if}
</div>

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
{/if}

{#if roomData?.isStarted}
	<div class="grid md:grid-cols-3 gap-3">
		{#each roomData.usersList as user}
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="card-title">{user.username}</div>
					<p>Cards:</p>
					<ol class="flex gap-2 my-2">
						{#each user.cardsInHand as card}
							{#if user.isBlind || user.id != $socket.id}
								<card-t class="w-32" rank="0" backcolor="green" backtext="" />
							{:else}
								<card-t class="w-32" rank={card.rank} suit={card.suit} />
							{/if}
						{/each}
					</ol>

					{#if user.isPacked}
						<div class="div">Packed</div>
					{:else}
						<div class="card-actions justify-between items-center">
							<span class="flex items-center gap-1"
								><small>Balance:</small> <strong>{user.balance}</strong></span
							>
							{#if user.id === $socket.id}
								<div class="flex gap-2">
									<button
										on:click|preventDefault={seeCardsHandler}
										disabled={!user.isBlind || !myChance}
										class="btn btn-accent">See</button
									>
									<div class="form-control">
										<div class="input-group">
											<input
												bind:value={chal}
												min="0"
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
									<button on:click={packHandler} class="btn btn-outline btn-error">Pack</button>
								</div>
							{:else}
								<div>{user.isBlind ? 'Playing Blind' : 'Cards Seen'}</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{/if}
