import Card from './Card';

export default function useGeneratedCards() {
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  const Cards = shuffle(require('./src/Kardz.json'));

  // let currentCardIndex = 0;

  // const getCardByIndex = () => {
  //   do {
  //     currentCardIndex++;
  //   } while (
  //     Cards[currentCardIndex].conditions !== '' &&
  //     currentCardIndex < Cards.length
  //   );
  //   if (currentCardIndex >= Cards.length) {
  //     return Cards[0];
  //   }
  //   return Cards[currentCardIndex];
  // };

  const verifyCard = (card, conditions) => {
    if (card.lock === -1) {
      return false;
    }
    for (const condition in card.conditions) {
      if (
        !conditions.hasOwnProperty(condition) ||
        card.conditions[condition] > conditions[condition]
      ) {
        return false;
      }
    }
    return true;
  };

  const currentCardIsGeisha = (card) => {
    if (card) {
      return String(card.character).includes('Geisha');
    }
    return false;
  };

  const getCardByName = (name, conditions) => {
    decayRound(conditions);
    for (let i = 0; i < Cards.length; i++) {
      if (Cards[i].kard === name) {
        if (verifyCard(Cards[i], conditions)) {
          Cards[i].lock = -1;
          return Cards[i];
        }
      }
    }
    return getCard(conditions);
  };

  const decayRound = (conditions) => {
    for (let i = 0; i < Cards.length; i++) {
      if (Cards[i].lock > 0) {
        if (verifyCard(Cards[i], conditions)) {
          Cards[i].lock -= 1;
        }
      }
    }
  };

  const getCard = (conditions) => {
    decayRound(conditions);
    for (let i = 0; i < Cards.length; i++) {
      if (verifyCard(Cards[i], conditions)) {
        Cards[i].lock = -1;
        return Cards[i];
      }
    }
  };

  return {
    Cards,
    getCardByName,
    getCard,
    currentCardIsGeisha,
  };
}
