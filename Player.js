class Player {
  static get VERSION() {
    return '0.1';
  }

  // Game State URL: http://leanpoker.org/assets/player-api.json
  static betRequest(gameState, bet) {
    bet(4000);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
