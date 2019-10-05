class Player {
  static get VERSION() {
    return '0.1';
  }

  // Game State URL: http://leanpoker.org/assets/player-api.json
  static betRequest(gameState, bet) {
    const hand = Player.getHand(gameState);
    if (hand[0].rank === hand[1].rank) {
      bet(4000);
    } else {
      bet(0);
    }
  }

  static showdown(gameState) {
  }

  static getHand(gameState) {
    return gameState.players[gameState.in_action].hole_cards;
  }
}

module.exports = Player;
