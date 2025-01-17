<script lang="ts">
	interface Props {
		table: number;
		usersList: User[];
	}
	let { table, usersList }: Props = $props();
</script>

<div class="overflow-x-auto max-w-fit">
	<h2>Players Table:</h2>
	<table class="table table-zebra">
		<!-- head -->
		<thead>
			<tr>
				<th>Sr.</th>
				<th>Username</th>
				<th>Balance</th>
				<th>Gain / Lost</th>
			</tr>
		</thead>
		<tbody>
			{#each usersList as user, i}
				<tr class="hover">
					<td>{i + 1}</td>
					<td>{user.username}</td>
					<td>{user.balance}</td>
					<td>{user.balance - table}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
