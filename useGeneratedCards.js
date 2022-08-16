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

  let currentCardIndex = 0;

  const getCardByIndex = () => {
    currentCardIndex++;
    do {
      currentCardIndex++;
    } while (Cards[currentCardIndex].condition === '');
  };

  const getCardByCondition = (condition) => {
    for (let i = 0; i < Cards.length; i++) {
      if (Cards[i].condition === condition) {
        return Cards[i];
      }
    }
  };

  return {
    Cards,
    getCardByIndex,
    getCardByCondition,
  };
}
