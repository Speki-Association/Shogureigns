import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import React, {useState} from 'react';
import Card from './Card';
import PlaceholderBackCards from './PlaceholderBackCards';
import Question from './Question';
//import PowerIndicators from './PowerIndicators';
import PlaceholderBackStaticCard from './PlaceholderBackStaticCard';
import StartButton from './StartButton';
import useGeneratedCards from './useGeneratedCards';
import {Dimensions} from 'react-native';
import GeneralStatusBarColor from './GeneralStatusBarColor';

export default function AnimatedStyleUpdateExample() {
  const {getCardByName, getCard, currentCardIsGeisha} = useGeneratedCards();
  const [currentCard, setCurrentCard] = useState({});
  // const [currentMood, setCurrentMood] = useState({happy: [], sad: []});

  const [showStartButton, setShowStartButton] = useState(true);
  const [showAnimatedReverseCard, setShowAnimatedReverseCard] = useState(false);
  const [showReverseCard, setShowReverseCard] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [conditions, setConditions] = useState({});

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
    setCurrentCard(getCardByName('amaterasu_first_contact', conditions));
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

  const onChooseRightAnswer = () => {
    for (const condition in currentCard.yes_custom) {
      conditions[condition] = currentCard.yes_custom[condition];
    }
    setConditions(conditions);
    if (currentCard.yes_next_card !== '') {
      setCurrentCard(getCardByName(currentCard.yes_next_card, conditions));
    } else {
      setCurrentCard(getCard(conditions));
    }
    createNewCard();
  };

  const onChooseLeftAnswer = () => {
    for (const condition in currentCard.no_custom) {
      conditions[condition] = currentCard.no_custom[condition];
    }
    setConditions(conditions);
    if (currentCard.no_next_card !== '') {
      setCurrentCard(getCardByName(currentCard.no_next_card, conditions));
    } else {
      setCurrentCard(getCard(conditions));
    }
    createNewCard();
  };

  const onChooseBottomAnswer = () => {
    for (const condition in currentCard.no_custom) {
      conditions[condition] = currentCard.no_custom[condition];
    }
    setConditions(conditions);
    setCurrentCard(getCard(conditions));
    createNewCard();
  };

  const createNewCard = (card) => {
    setShowQuestion(false);
    setTimeout(() => {
      setShowCard(false);
    }, 300);
    showNextCard(700);
  };

  if (currentCardIsGeisha(currentCard)) {
    return (
      <View style={styles.wrapper}>
        <GeneralStatusBarColor
          backgroundColor="#FAFAFA"
          barStyle="dark-content"
        />
        <View style={styles.topWrapper}>
          <ImageBackground
            source={require('./src/graphic-assets/topWrapperBg.png')}
            resizeMode="cover"
            style={styles.imageBG}
          />
        </View>

        <View style={styles.questionWrapper}>
          <Question
            question={currentCard.question}
            showQuestion={showQuestion}
          />
        </View>
        <View style={styles.cardWrapper}>
          {showStartButton && <StartButton onPress={onStartGame} />}
          {showAnimatedReverseCard && <PlaceholderBackCards />}
          {showReverseCard && <PlaceholderBackStaticCard />}
          {showCard && (
            <Card
              onChooseLeftAnswer={onChooseLeftAnswer}
              onChooseRightAnswer={onChooseRightAnswer}
              onChooseBottomAnswer={onChooseBottomAnswer}
              leftText={currentCard.no}
              rightText={currentCard.yes}
              BottomText={currentCard.bottom}
              image={currentCard.image}
              backgroundColor={currentCard.background}
            />
          )}
        </View>
        <View style={styles.nameWrapper} />
      </View>
    );
  }
  return (
    <View style={styles.wrapper}>
      <GeneralStatusBarColor
        backgroundColor="#FAFAFA"
        barStyle="dark-content"
      />
      <View style={styles.topWrapper}>
        <ImageBackground
          source={require('./src/graphic-assets/topWrapperBg.png')}
          resizeMode="cover"
          style={styles.imageBG}
        />
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
            leftText={currentCard.no}
            rightText={currentCard.yes}
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    height: 420,
    alignItems: 'center',
  },
  questionWrapper: {
    height: 80,
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
    height: 120,
    backgroundColor: '#FAFAFA',
  },
  reverseBG: {
    width: '80%',
    justifyContent: 'center',
  },
});
