import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

const CardPerson = ({image}) => {
  const getImage = (imageName) => {
    switch (imageName) {
      case 'shogun':
        return require('./src/graphic-assets/shogun.jpg');
      case 'yokai':
        return require('./src/graphic-assets/yokai.jpg');
      case 'emperor':
        return require('./src/graphic-assets/emperor.jpg');
      case 'peasant':
        return require('./src/graphic-assets/peasant.jpg');
      case 'geisha':
        return require('./src/graphic-assets/geisha.jpg');
      case 'samurai':
        return require('./src/graphic-assets/samurai.jpg');
      case 'daimyo':
        return require('./src/graphic-assets/daimyo.jpg');
      case 'ninja':
        return require('./src/graphic-assets/ninja.jpg');
      case 'death':
        return require('./src/graphic-assets/death.jpg');
      case 'amaterasu':
        return require('./src/graphic-assets/amaterasu.jpg');
      case 'miner':
        return require('./src/graphic-assets/miner.jpg');
      default:
        return require('./src/graphic-assets/blank.jpg');
    }
  };
  return (
    <>
      <View style={styles.wrapper}>
        <Image source={getImage(image)} style={styles.personImage} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  personImage: {
    height: '100%',
    width: '100%',
  },
});

export default CardPerson;
