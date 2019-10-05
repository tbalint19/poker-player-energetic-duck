class Player {
  static get VERSION() {
    return '0.1';
  }

  // Game State URL: http://leanpoker.org/assets/player-api.json
  static betRequest(gameState, bet) {
    const hand = Player.getHand(gameState);
    const [cardInHand1 ,cardInHand2] = hand;

    // Checks if we have pair in hand
    if (cardInHand1.rank === cardInHand2.rank) {
      if (rank2number(cardInHand1.rank) >= 10) {
        bet(4000); // max bet on pair 10 or above
      } else {
        bet(
          gameState.current_buy_in - gameState.players[gameState.in_action].bet + gameState.minimum_raise
        ); // bet minimum
      }
    } else {
      bet(0); // no pair = no bet
    }
  }

  static showdown(gameState) {
  }

  static getHand(gameState) {
    return gameState.players[gameState.in_action].hole_cards;
  }
}

function rank2number(rank) {
  switch(rank) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 11;
    default:
      return rank*1;
  }
}

module.exports = Player;
