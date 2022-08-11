export default function useGeneratedCards() {
  // const Cards = [
  //   {
  //     question:
  //       'Wealthy lookning young man asks you to throw a party in your kingdom.',
  //     leftText: 'Deny the offer',
  //     onLeft: {E: [], S : [1], T : [], J : []},
  //     rightText: 'Lets party!',
  //     onRight: {E: [], S : [3], T : [], J : []},
  //     image: 'https://image.flaticon.com/icons/png/512/3479/3479910.png',
  //     background: '#ccc',
  //   },
  //   {
  //     question:
  //       'Hunter from the near village requests some help. It seems like his hometown is in danger',
  //     leftText: 'Let him fight alone',
  //     onLeft: {E: [4], S : [], T : [], J : []},
  //     rightText: 'Send the troops',
  //     onRight: {E: [2], S : [], T : [], J : []},
  //     image: 'https://image.flaticon.com/icons/png/512/3483/3483016.png',
  //     background: '#ccc',
  //   }
  // ];

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  const Cards = shuffle(require('./src/Kardz.json'));

  const getCardByIndex = (index) => {
    return Cards[index];
  };

  return {
    Cards,
    getCardByIndex,
  };
}
