import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import DefaultStyles from '../constants/defaultStyles';

const Input = props => {
    return <TextInput {...props} style={{ ...DefaultStyles.input, ...DefaultStyles.inputText, ...props.style }} />
}

const styles = StyleSheet.create({
    // input: {
    //     height: 40,
    //     borderColor: Colors.primary,
    //     borderWidth: 1,
    //     marginVertical: 10,
    //     fontSize: 16
    // }
});

export default Input;