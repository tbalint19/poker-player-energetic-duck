class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    bet(4000);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
