<script>
	import { onMount } from 'svelte';
	import { navButtonText, socket } from '../../stores';
	export let data;
	$navButtonText = 'Leave Room';

	let username = '';
	let usernameCreated = false;
	let roomData = null;
	let cutAt = 0;
	let cardsToDeal = 3;

	function createUserHandler() {
		console.log(data.roomID);
		$socket.emit('joinRoom', username, data.roomID);
		usernameCreated = true;
	}

	onMount(() => {
		$socket.on('error', console.log);
		$socket.on('roomData', (res) => {
			roomData = res;
			console.log(res);
		});
	});

	function startGameHandler() {
		$socket.emit('start', data.roomID, cutAt, cardsToDeal);
	}
</script>

<svelte:head>
	<script src="/elements.cardmeister.min.js"></script>
</svelte:head>

<h1>{usernameCreated ? username : ''} Welcome to Room: {data.roomID}</h1>
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

{#if !usernameCreated}
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
							<card-t class="w-32" rank={card.rank} suit={card.suit} />
						{/each}
					</ol>
					{#if user.isPacked}
						<div class="div">packed</div>
					{:else}
						<div class="card-actions justify-end">
							<button class="btn btn-secondary">Blind</button>
							<button class="btn btn-primary">Chal</button>
							<button class="btn btn-outline btn-error">Pack</button>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{/if}
