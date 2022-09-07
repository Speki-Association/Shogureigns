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
  const Kardz = require('./src/Kardz/kardz.json');
  const Geisha = require('./src/Kardz/geisha.json');
  const Miner = require('./src/Kardz/miner.json');
  const Monk = require('./src/Kardz/monk.json');
  const Banker = require('./src/Kardz/banker.json');
  const Cards = shuffle(
    Kardz.concat(Geisha).concat(Miner).concat(Monk).concat(Banker),
  );
  /* Debugger : */
  console.log('Kardz : ', Cards.length);
  console.log('Kardz Geisha : ', Geisha.length);
  console.log('Kardz Miner : ', Miner.length);
  console.log('Kardz Monk : ', Monk.length);
  console.log('Kardz Banker : ', Banker.length);
  /* End debugger */

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

  const currentCardIsDeath = (card) => {
    if (card) {
      return String(card.kard).includes('death');
    }
    return false;
  };

  const currentCardIsAmaterasuFC = (card) => {
    if (card) {
      return card.kard === 'amaterasu_first_contact';
    }
    return false;
  };

  const lockAmaterasu = () => {
    for (let i = 0; i < Cards.length; i++) {
      if (Cards[i].kard === 'amaterasu_first_contact') {
        Cards[i].lock = -1;
      }
    }
  };

  const getFinal = () => {
    for (let i = 0; i < Cards.length; i++) {
      if (Cards[i].kard === 'final') {
        return Cards[i];
      }
    }
  };

  const getCardByName = (name, conditions) => {
    decayRound(conditions);
    for (let i = 0; i < Cards.length; i++) {
      if (Cards[i].kard === name) {
        if (verifyCard(Cards[i], conditions)) {
          if (
            !currentCardIsDeath(Cards[i]) &&
            !currentCardIsAmaterasuFC(Cards[i])
          ) {
            Cards[i].lock = -1;
          }
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
        if (!currentCardIsDeath(Cards[i])) {
          Cards[i].lock = -1;
        }
        return Cards[i];
      }
    }
  };

  return {
    Cards,
    getCardByName,
    getCard,
    currentCardIsGeisha,
    currentCardIsDeath,
    lockAmaterasu,
    getFinal,
  };
}
