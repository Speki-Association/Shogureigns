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
    for (const condition in card.conditions) {
      if (
        card.conditions.hasOwnProperty(condition) &&
        !conditions.hasOwnProperty(condition)
      ) {
        return false;
      }
    }
    return true;
  };

  const getCardByName = (name, conditions) => {
    for (let i = 0; i < Cards.length; i++) {
      if (Cards[i].kard === name) {
        if (verifyCard(Cards[i], conditions)) {
          Cards[i].lock = -1;
          return Cards[i];
        }
      }
    }
    return Cards[0];
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
      if (Cards[i].lock === 0) {
        if (verifyCard(Cards[i], conditions)) {
          Cards[i].lock = -1;
          return Cards[i];
        }
      }
    }
    return Cards[0];
  };

  return {
    Cards,
    getCardByName,
    getCard,
  };
}
