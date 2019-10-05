class Player {
  static get VERSION() {
    return '0.1';
  }

  // Game State URL: http://leanpoker.org/assets/player-api.json
  static betRequest(gameState, bet) {
    const player = getPlayer(gameState);
    const preFlop = gameState.community_cards.length === 0;

    if (gameState.small_blind * 4 > player.stack) return bet(4000);

    if (
      getThreeOfAKindValue(getBothHandAndCommunity(gameState)) > getThreeOfAKindValue(getCommunity(gameState))) {
      return bet(4000);
    }

    if (theyAllSeemWeak(gameState)) return bet(gameState.current_buy_in * 2)

    // Checks if we have pair in hand
    const pairValue = getPairValue(getHand(gameState));
    if (pairValue > 0) {
      if (pairValue >= 10) {
        bet(4000); // max bet on pair 10 or above
      } else {
        if (isAnotherPlayerAllIn(gameState) && player.bet < 100) {
          bet(0);
        } else {
          bet(
            gameState.current_buy_in - player.bet + gameState.minimum_raise
          ); // bet minimum
        }
      }
    } else {
      if (preFlop && highCardInHand(gameState)) {
        bet(gameState.current_buy_in - player.bet);
      }

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

function getCardCounts(cards) {
  const counts = new Map();
  cards.forEach(card => {
    const rank = rank2number(card.rank);
    counts.set(rank, counts.has(rank) ? counts.get(rank) + 1 : 1);
  });
  return counts;
}

function getPairValue(cards) {
  let counts = getCardCounts(cards);

  const matches = Array.from(counts.entries()).filter(x => x[1] === 2);
  if(matches.length > 0)
    return Array.from(counts.entries())
      .filter(x => x[1] === 2)
      .sort((a, b) => b[1] - a[1])[0][0];
  else
    return 0;
}

function getThreeOfAKindValue(cards) {
  let counts = getCardCounts(cards);

  const matches = Array.from(counts.entries()).filter(x => x[1] === 3);
  if(matches.length > 0)
    return matches.sort((a, b) => b[1] - a[1])[0][0];
  else
    return 0;
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
    if (player.stack === 0 && player.bet > 0) {
      isOneAllIn = true;
    }
  });

  return isOneAllIn;
}

function highCardInHand(gameState) {
  const hand = getHand(gameState);

  hand.forEach(card => {
    if (rank2number(card) > 10) {
      return true;
    }
  });

  return false;
}


module.exports = Player;
