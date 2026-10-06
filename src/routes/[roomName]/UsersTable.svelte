<script lang="ts">
	import { Users, IndianRupee } from '@lucide/svelte';

	interface Props {
		table: number;
		usersList: User[];
	}
	let { table, usersList }: Props = $props();
</script>

<div class="card bg-base-100 border-primary/20 mx-auto my-6 w-full max-w-2xl border shadow-xl">
	<div class="card-body p-6">
		<h2 class="card-title text-primary mb-4 flex items-center gap-2 text-xl font-bold">
			<Users class="h-6 w-6" /> Players at the Table
		</h2>
		<div class="rounded-box border-base-300 overflow-x-auto border">
			<table class="table-zebra table w-full">
				<!-- head -->
				<thead class="bg-base-200 text-base-content/80 text-sm">
					<tr>
						<th>#</th>
						<th>Player</th>
						<th>Balance</th>
						<th>Net</th>
					</tr>
				</thead>
				<tbody>
					{#each usersList as user, i}
						<tr class="hover">
							<td class="text-base-content/60 font-semibold">{i + 1}</td>
							<td class="font-bold">{user.username}</td>
							<td class="flex items-center gap-1 font-mono">
								<IndianRupee class="h-3 w-3 opacity-60" />{user.balance}
							</td>
							<td class="font-mono {user.balance - table >= 0 ? 'text-success' : 'text-error'}">
								<div class="flex items-center gap-1">
									<IndianRupee class="h-3 w-3 opacity-60" />
									{user.balance - table > 0 ? '+' : ''}{user.balance - table}
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
