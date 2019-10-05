class Player {
  static get VERSION() {
    return '0.1';
  }

  // Game State URL: http://leanpoker.org/assets/player-api.json
  static betRequest(gameState, bet) {
    const player = getPlayer(gameState);

    if (theyAllSeemWeak(gameState)) return bet(gameState.current_buy_in * 2)

    // Checks if we have pair in hand
    const pairValue = getPairValue(gameState);
    if (pairValue > 0) {
      if (pairValue >= 10) {
        bet(4000); // max bet on pair 10 or above
      } else {
        if (isAnotherPlayerAllIn(gameState)) {
          bet(0);
        } else {
          bet(
            gameState.current_buy_in - player.bet + gameState.minimum_raise
          ); // bet minimum
        }
      }
    } else {
      bet(0); // no pair = no bet
    }
  }

  static showdown(gameState) {
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

/**
 * Include these methods onto Player this way we can access them with require
 * in external modules and tests
 */
Player.getPlayer = getPlayer;

function getPlayer(gameState) {
  return gameState.players[gameState.in_action];
}

function getHand(gameState) {
  return getPlayer(gameState).hole_cards;
}

function getCommunity(gameState) {
  return gameState.community_cards;
}

function getBothHandAndCommunity(gameState) {
  let a = getHand(gameState);
  let b = getCommunity(gameState);
  return a.concat(b);
}

function theyAllSeemWeak(gameState) {
  return (gameState.current_buy_in < (gameState.small_blind * 5))
}

function getPairValue(gameState) {
  const hand = getHand(gameState);
  const [cardInHand1 ,cardInHand2] = hand;
  if(cardInHand1.rank === cardInHand2.rank) {
    return rank2number(cardInHand1.rank);
  } else {
    return 0;
  }
}

function getOtherActivePlayers(gameState) {
  return gameState.players.reduce((acc, player) => {
    const isOurPlayer = getPlayer(gameState).name === player.name;
    if (player.status === "active" && !isOurPlayer) {
      return [...acc, player];
    } else {
      return acc;
    }
  }, []);
}

function isAnotherPlayerAllIn(gameState) {
  let isOneAllIn = false;

  getOtherActivePlayers(gameState).forEach(player => {
    if (player.bet === player.stack) {
      isOneAllIn = true;
    }
  });

  return isOneAllIn;
}


module.exports = Player;
