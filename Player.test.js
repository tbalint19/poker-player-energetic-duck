const sinon = require('sinon')
const Player = require('./Player.js')
const defaultGameState = require('./game-state.json')

const betMock = sinon.stub()

test('should not go all-in with low pair in hand', () => {
  // given
  const gameState = defaultGameState
  gameState.players[gameState.in_action].hole_cards[0] = { "rank": "6", "suit": "hearts" }
  gameState.players[gameState.in_action].hole_cards[1] = { "rank": "6", "suit": "spades" }
  gameState.current_buy_in = 20
  gameState.minimum_raise = 20
  gameState.players[gameState.in_action].bet = 10

  // when
  Player.betRequest(gameState, betMock)

  // then
  sinon.assert.calledWith(betMock, 30);
})

test('should go all-in with high pair in hand', () => {
  // given
  const gameState = defaultGameState
  gameState.players[gameState.in_action].hole_cards[0] = { "rank": "K", "suit": "hearts" }
  gameState.players[gameState.in_action].hole_cards[1] = { "rank": "K", "suit": "spades" }

  // when
  Player.betRequest(gameState, betMock)

  // then
  sinon.assert.calledWith(betMock, 4000);
})

test('should fold with low pair when another player is all in', () => {
  // given
  const gameState = defaultGameState
  gameState.players[gameState.in_action].hole_cards[0] = { "rank": "6", "suit": "hearts" }
  gameState.players[gameState.in_action].hole_cards[1] = { "rank": "6", "suit": "spades" }
  gameState.current_buy_in = 20
  gameState.minimum_raise = 20
  gameState.players[gameState.in_action].bet = 10
  gameState.players[0].bet = gameState.players[0].stack

  // when
  Player.betRequest(gameState, betMock)

  // then
  sinon.assert.calledWith(betMock, 0);
});
