const Player = require('./Player.js')

function getAmountToAllIn(gameState) {
  return 4000;
}

function getAmountToFold(gameState) {
  return 0;
}

function getAmountToCall(gameState) {
  const player = Player.getPlayer(gameState);
  return gameState.current_buy_in - player.bet;
}

function getAmountToRaise(gameState, amountToRaise) {
  let value = amountToRaise ? amountToRaise : 0; // simple catch to ensure integer result
  return getAmountToCall(gameState) + value;
}

module.exports = {
  getAmountToAllIn,
  getAmountToFold,
  getAmountToCall,
  getAmountToRaise
};
