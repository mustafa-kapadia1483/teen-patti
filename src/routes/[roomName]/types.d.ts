interface Card {
	rank: number;
	suit: string;
}

interface User {
	/** Socket ID of the user */
	id: string;
	username: string;
	/** Balance in units */
	balance: number;
	/** Cards the user currently holds */
	cardsInHand: Array<Card>;
	/** Whether the user is a blind player */
	isBlind: boolean;
	/** Whether the user is packed */
	isPacked: boolean;
}

/** Room data fetched from the websocket server */
interface RoomData {
	/** Socket id of the current player to play */
	currentPlayer: number;
	/** Whether show was called for the active game in the room */
	gameShow: boolean;
	/** Whether a game is currently in play in the room */
	isStarted: boolean;
	/** Determines the player that started the current active game in the room */
	initiator: string | null;
	/** Max stake in units played yet in the active game */
	maxStake: number;
	/** Name of the room */
	name: string;
	/** Pot count for a game in room */
	pot: number;
	/** Table that each player stakes */
	table: number;
	/** List of users in the room */
	usersList: Array<User>;
}
