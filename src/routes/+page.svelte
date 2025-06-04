<article class="bg-base-200/50 min-h-screen p-4 md:p-8">
	<div class="mx-auto max-w-6xl space-y-8">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h1 class="card-title text-primary text-4xl font-extrabold">What is Teen Patti?</h1>
				<p class="text-base-content/80 mt-2 text-xl">
					Teen Patti is one of the most popular card games played in India. Also known as 3 Patti (
					तीन पत्ती ), Flash, or Indian Poker, the game is closely related to the popular poker game
					but is played with only three cards.
				</p>
				<div class="divider"></div>
				<p class="text-base-content/70">
					Teen Patti originated in India with rules quite similar to that of the British game - 3
					Card Brag. The game involves making hand combinations, hand rankings, and winning the pot.
				</p>
			</div>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<div class="card bg-base-100 transition-all duration-300 hover:shadow-xl">
				<div class="card-body">
					<h2 class="card-title text-base-content text-2xl font-bold">Blind Player</h2>
					<p class="text-base-content/80">
						A player who opts not to view their cards and play blind. They can:
					</p>
					<ul class="menu bg-base-200 rounded-box">
						<li><a>Play blind</a></li>
						<li><a>Pack</a></li>
						<li><a>Show (if available)</a></li>
					</ul>
					<div class="badge badge-outline">Stake = Current or 2x Current</div>
				</div>
			</div>

			<div class="card bg-base-100 transition-all duration-300 hover:shadow-xl">
				<div class="card-body">
					<h2 class="card-title text-base-content text-2xl font-bold">Seen Player</h2>
					<p class="text-base-content/80">
						A player that has viewed their cards. Available actions:
					</p>
					<div class="join join-vertical w-full">
						<div class="collapse-arrow join-item border-base-300 collapse border">
							<input type="radio" name="seen-actions" checked="checked" />
							<div class="collapse-title text-xl font-medium">Chaal</div>
							<div class="collapse-content">
								<p>Required to stay in the game. Wager equals 2x or 4x the current stake amount.</p>
							</div>
						</div>
						<div class="collapse-arrow join-item border-base-300 collapse border">
							<input type="radio" name="seen-actions" />
							<div class="collapse-title text-xl font-medium">Slideshow</div>
							<div class="collapse-content">
								<p>
									Compare cards with the previous seen player. Requires equal or 2x current stake.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card bg-base-100 shadow-lg">
			<div class="card-body">
				<h2 class="card-title text-base-content text-2xl font-bold">Show</h2>
				<div class="alert shadow-lg">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="h-6 w-6 shrink-0 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path></svg
					>
					<p>
						When only two players remain, their cards are compared. The higher-ranking hand wins.
					</p>
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

				<div class="divider">Rankings</div>

				<div class="overflow-x-auto">
					<table class="table-zebra table">
						<thead>
							<tr>
								<th>Rank</th>
								<th>Hand</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>1</th>
								<td>Trail</td>
								<td>Three cards of same rank</td>
							</tr>
							<tr>
								<th>2</th>
								<td>Pure Sequence</td>
								<td>Three consecutive cards of same suit</td>
							</tr>
							<tr>
								<th>3</th>
								<td>Sequence</td>
								<td>Three consecutive cards</td>
							</tr>
							<tr>
								<th>4</th>
								<td>Color</td>
								<td>Three cards of same suit</td>
							</tr>
							<tr>
								<th>5</th>
								<td>Pair</td>
								<td>Two cards of same rank</td>
							</tr>
							<tr>
								<th>6</th>
								<td>High Card</td>
								<td>Highest card in hand</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</article>
