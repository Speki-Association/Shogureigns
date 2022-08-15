import React from 'react';
import {View, StyleSheet} from 'react-native';
import Image from 'react-native-fast-image';

const CardReverse = ({isMirrored, shadowOpacity = 0}) => {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={[styles.shadow, {opacity: shadowOpacity}]} />
        <Image
          source={require('./src/graphic-assets/reverse_bg.jpg')}
          style={styles.reverseBG}
        />
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
  reverseBG: {
    height: '100%',
    width: '100%',
  },
  shadow: {
    position: 'absolute',
    zIndex: 100,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
});

export default CardReverse;
