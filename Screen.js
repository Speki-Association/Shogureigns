import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Card from './Card';
import PlaceholderBackCards from './PlaceholderBackCards';
import Question from './Question';
//import PowerIndicators from './PowerIndicators';
import PlaceholderBackStaticCard from './PlaceholderBackStaticCard';
import StartButton from './StartButton';
import useGeneratedCards from './useGeneratedCards';

export default function AnimatedStyleUpdateExample() {
  const {getCardByIndex, getCardByCondition} = useGeneratedCards();
  const [currentCard, setCurrentCard] = useState({});
  // const [currentMood, setCurrentMood] = useState({happy: [], sad: []});

  const [showStartButton, setShowStartButton] = useState(true);
  const [showAnimatedReverseCard, setShowAnimatedReverseCard] = useState(false);
  const [showReverseCard, setShowReverseCard] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  // TODO refactor those settimeouts
  const showNextCard = (timeout) => {
    setTimeout(() => {
      setShowCard(true);
      setTimeout(() => {
        setShowQuestion(true);
      }, 100);
    }, timeout);
  };

  const onStartGame = () => {
    setCurrentCard(getCardByCondition('start'));
    setTimeout(() => {
      setShowStartButton(false);
      setShowAnimatedReverseCard(true);
    }, 500);
    setTimeout(() => {
      setShowReverseCard(true);
      setTimeout(() => {
        setShowAnimatedReverseCard(false);
      }, 100);
    }, 2000);
    showNextCard(2500);
  };

  const onChooseLeftAnswer = () => {
    //setCurrentMood(currentCard.onLeft);
    let card = null;
    if (currentCard.yes_custom !== '') {
      card = getCardByCondition(currentCard.yes_custom);
    } else {
      card = getCardByIndex();
      // setCurrentCardIndex(currentCardIndex + 1);
    }
    createNewCard(card);
    // setTimeout(() => {
    //   setCurrentMood({happy: [], sad: []});
    // }, 200);
  };

  const onChooseRightAnswer = () => {
    //setCurrentMood(currentCard.onRight);
    let card = null;
    if (currentCard.no_custom !== '') {
      card = getCardByCondition(currentCard.no_custom);
    } else {
      card = getCardByIndex();
      // setCurrentCardIndex(currentCardIndex + 1);
    }
    createNewCard(card);
    // setTimeout(() => {
    //   setCurrentMood({happy: [], sad: []});
    // }, 200);
  };

  const createNewCard = (card) => {
    console.log(card);
    setShowQuestion(false);
    setTimeout(() => {
      setCurrentCard(card);
      setShowCard(false);
    }, 300);
    showNextCard(700);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.topWrapper}>
        {/* <PowerIndicators currentMood={currentMood} /> */}
      </View>
      <View style={styles.questionWrapper}>
        <Question question={currentCard.question} showQuestion={showQuestion} />
      </View>
      <View style={styles.cardWrapper}>
        {showStartButton && <StartButton onPress={onStartGame} />}
        {showAnimatedReverseCard && <PlaceholderBackCards />}
        {showReverseCard && <PlaceholderBackStaticCard />}
        {showCard && (
          <Card
            onChooseLeftAnswer={onChooseLeftAnswer}
            onChooseRightAnswer={onChooseRightAnswer}
            leftText={currentCard.yes}
            rightText={currentCard.no}
            image={currentCard.image}
            backgroundColor={currentCard.background}
          />
        )}
      </View>
      <View style={styles.nameWrapper} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardWrapper: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionWrapper: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameWrapper: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topWrapper: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc',
  },
});
