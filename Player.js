class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    bet(4000);
  }

  static showdown(gameState) {
  }

  static getHand(gameState) {
    gameState.players[gameState.in_action].hole_cards;
  }
}

module.exports = Player;
