import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { colors } from 'react-native/Libraries/NewAppScreen';
import DefaultStyles from '../constants/defaultStyles';
import Colors from '../constants/Colors';

const RadioButton2 = ({ value, setValue }) => {
  //   const [value, setValue] = React.useState('Email Transfer');

  return (
    <View style={DefaultStyles.radioButtonGroupContainer}>
      <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
        <Text style={DefaultStyles.label} >Payment Method</Text>
        <View style={DefaultStyles.radioButtonItemContainer}>
          <RadioButton.Item labelStyle={DefaultStyles.radioButtonItemLabel} color={Colors.radioButtonColor} label="Email Transfer" value="Email Transfer" />
          <RadioButton.Item labelStyle={DefaultStyles.radioButtonItemLabel} color={Colors.radioButtonColor} label="Pay Pal" value="PayPal" />
          <RadioButton.Item labelStyle={DefaultStyles.radioButtonItemLabel} color={Colors.radioButtonColor} label="Cash" value="Cash" />
          <RadioButton.Item labelStyle={DefaultStyles.radioButtonItemLabel} color={Colors.radioButtonColor} label="Any Payment Above" value="Any Payment Above" />
        </View>
      </RadioButton.Group>
    </View>
  );
}
const styles = StyleSheet.create({
  // container : {
  //   marginHorizontal: 60
  // },
  // text: {
  //   fontSize:16,
  //   marginLeft: 10,
  //   fontWeight:'bold',
  //   color: 'rgb(150,150,150)'
  // }
})
export default RadioButton2;