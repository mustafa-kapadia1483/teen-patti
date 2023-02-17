<script>
	import { navButtonText, socket } from '../stores';
	import { io } from 'socket.io-client';
	import { serverURL } from '../constants';

	const newSocket = io(serverURL, {
		transports: ['websocket']
	});
	$socket = newSocket;
	$navButtonText = 'Create Room';
</script>

<article>
	<h1 class="text-2xl mt-5 font-bold">What is Teen Patti ?</h1>
	<p class="mt-2">
		Teen Patti is one of the most popular card games played in India. Also known as 3 Patti ( तीन
		पत्ती ), Flash, or Indian Poker, the game is closely related to the popular poker game but is
		played with only three cards. Teen Patti originated in India with rules quite similar to that of
		the British game - 3 Card Brag.
		<br />
		The teen patti online game is similar yet different from the poker game as it involves making hand
		combinations, hand rankings, and winning the pot. Here are the rules to learn how to play teen patti
		online and win real money.
	</p>
	<dl class="mt-6">
		<dt class="font-medium mt-4">Blind Player</dt>
		<dd class="mt-2">
			A player who opts not to view their cards and play blind is called a blind player. A blind
			player can play blind, pack, and show if available. The blind amount equals the current stake
			amount of is twice the current stake amount. If the blind player is also the first player, the
			current stake is equal to the boot amount.
		</dd>

		<dt class="font-medium mt-4">Seen Player</dt>
		<dd class="mt-2">
			A player that has viewed their cards is a seen player. The seen player can play chaal, pack,
			show, or slide show, depending on the stage of the game.

			<ul>
				<li class="mt-2">
					<strong>Chaal - </strong>The seen player must play chaal or a slide show, if available, to
					stay in the game. To play chaal, the player wagers an amount in the pot, which is equal to
					two or four times the current stake amount. The stake amount equals the amount wagered by
					the previous player if that player is a blind player. However, if the previous player is a
					seen player, the stake amount equals half the wagered amount by that player.
				</li>
				<li class="mt-2">
					<strong>Slideshow - </strong> Slideshow refers to comparing the cards with that of the previous
					player. The slide show option is available only if the previous player is a seen player and
					there are more player still in the hand. To play a slide show, the player must place a qual
					or twice the amount of the current stake in the pot. The previous player can choose to accept
					or deny the slide show.
				</li>
			</ul>
		</dd>

		<dt class="font-medium mt-4">Show</dt>
		<dd class="mt-2">
			When all the player except two players fold in the teen patti game, the cards of the remaining
			two players are compared, called Show. The hand with a higher ranking wins.
		</dd>

		<dt class="font-medium mt-4">Teen Patti Hand Rankings</dt>
		<dd class="mt-2">
			The best Hand in the teen patti game is a Trail, and the lowest is a High Card. The highest
			ranked sequence in the game is A-K-Q followed by A-2-3. The Teen Patti rules chart hand
			ranking from high to low is as follows:

			<ol class="list-decimal list-inside mt-2">
				<li class="mt-1">Trail or set of three cards of the same rank</li>
				<li class="mt-1">Pure sequence</li>
				<li class="mt-1">Sequence or run</li>
				<li class="mt-1">Colour</li>
				<li class="mt-1">Pair of two cards of the same rank</li>
				<li class="mt-1">High card</li>
			</ol>
		</dd>
	</dl>
</article>
