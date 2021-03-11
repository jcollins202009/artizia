import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import DefaultStyles from '../constants/defaultStyles';

const Card = props => {
  return <View style={{ ...DefaultStyles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  // card: {
  //   shadowColor: 'black',
  //   shadowOpacity: 0.26,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 8,
  //   elevation: 5,
  //   borderRadius: 10,
  //   backgroundColor: 'white',
  //   borderColor: Colors.primary
  // }
});

export default Card;
