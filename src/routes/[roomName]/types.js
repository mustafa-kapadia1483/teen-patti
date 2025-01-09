/**
 * @typedef Card
 * @property {number} rank
 * @property {string} suit
 */

/**
 * @typedef User
 * @property {string} id Socket ID of the user
 * @property {string} username
 * @property {number} balance Balance in units
 * @property {Array<Card>} cardsInHand Cards the user currently holds
 * @property {boolean} isBlind Whether the user is a blind player
 * @property {boolean} isPacked Whether the user is packed
 * @exports User
 */

/**
 *
 * @typedef RoomData Room data fetched from the websocket server
 * @property {number} currentPlayer Current player's turn
 * @property {boolean} gameShow Whether the game show is on
 * @property {boolean} isStarted Whether the game is started
 * @property {string|null} initiator
 * @property {number} maxStake Maximum stake in units
 * @property {string} name Name of the room
 * @property {number} pot Current pot
 * @property {number} table Table number
 * @property {Array<User>} usersList List of users in the room
 */
