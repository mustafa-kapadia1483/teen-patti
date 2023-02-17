<script>
	import '../../cardmeister';
	import { navButtonText } from '../../stores';
	export let data;
	$navButtonText = 'Leave Room';

	let username = '';
	let usernameCreated = false;

	$: {
		if (usernameCreated) {
			users[0].username = username;
		}
	}

	let users = [
		{
			username,
			cards: [
				{ Value: 'Ace', Suit: 'Spades' },
				{ Value: 'Ace', Suit: 'Diamonds' }
			]
		},
		{
			username: 'Mami',
			cards: [
				{ Value: 'Ace', Suit: 'Spades' },
				{ Value: 'Ace', Suit: 'Clubs' }
			]
		},
		{
			username: 'Qusai',
			cards: [
				{ Value: 'King', Suit: 'Spades' },
				{ Value: 'Ace', Suit: 'Clubs' }
			]
		}
	];

	console.log(users);
</script>

<h1>{usernameCreated ? username : ''} Welcome to Room: {data.roomID}</h1>

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

		<button class="btn btn-info" on:click|preventDefault={() => (usernameCreated = true)}>
			Create User
		</button>
	</form>
{/if}

<div class="grid md:grid-cols-3 gap-3">
	{#each users as user}
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<div class="card-title">{user.username}</div>
				<p>Cards:</p>
				<ol class="flex gap-2 my-2">
					{#each user.cards as card}
						<card-t class="w-32" rank={card.Value} suit={card.Suit} />
					{/each}
				</ol>
				<div class="card-actions justify-end">
					<button class="btn btn-secondary">Blind</button>
					<button class="btn btn-primary">Chal</button>
					<button class="btn btn-outline btn-error">Pack</button>
				</div>
			</div>
		</div>
	{/each}
</div>
