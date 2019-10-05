const sinon = require('sinon')
const Player = require('./Player.js')
const defaultGameState = require('./game-state.json')

const betMock = sinon.stub()

test('should go all-in with pair in hand', () => {
  // given
  const gameState = defaultGameState
  gameState.players[gameState.in_action].hole_cards[0] = { "rank": "K", "suit": "hearts" }
  gameState.players[gameState.in_action].hole_cards[1] = { "rank": "K", "suit": "spades" }

  // when
  Player.betRequest(gameState, betMock)

  // then
  sinon.assert.calledWith(betMock, 4000);
})

// test('should go all-in with pair in hand', () => {
//   // given
//   const gameState = defaultGameState
//   gameState.players[gameState.in_action].hole_cards[0] = { "rank": "6", "suit": "hearts" }
//   gameState.players[gameState.in_action].hole_cards[1] = { "rank": "6", "suit": "spades" }
//
//   // when
//   Player.betRequest(gameState, betMock)
//
//   // then
//   sinon.assert.calledWith(betMock, 4000);
// })
