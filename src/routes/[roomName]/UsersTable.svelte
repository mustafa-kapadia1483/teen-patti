<script>
	export let table;
	export let usersList;
</script>

<div class="overflow-x-auto">
	<h2>Users Table:</h2>
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th />
				<th>Username</th>
				<th>Balance</th>
				<th>Gain / Lost</th>
			</tr>
		</thead>
		<tbody>
			{#each usersList as user, i}
				<tr>
					<td>{i + 1}</td>
					<td>{user.username}</td>
					<td>{user.balance}</td>
					<td>{user.balance - table}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
