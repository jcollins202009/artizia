import React, { useState, useContext, useCallback } from 'react';
import { View } from 'react-native';
import { StyleSheet, ScrollView, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, Keyboard , Platform} from 'react-native'
import { Button, Text, Input, colors } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'
import RadioButton2 from '../components/RadioButton2'
import { useFocusEffect } from '@react-navigation/native'
import Colors from '../constants/Colors';
import DefaultStyles from '../constants/defaultStyles'
import MainButton from '../components/MainButton';
const Signup = ({ navigation }) => {
    const { signup, state: { errorMessage }, clearErrorMessage } = useContext(AuthContext)
    const [email, SetEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fName, SetFname] = useState('')
    const [lName, setLname] = useState('')
    const [location, setLocation] = useState('')
    const [payment, setPayment] = useState('Email Transfer')

    useFocusEffect(
        useCallback(() => {
            return () => clearErrorMessage()
        }, [])
    )


    return (
        <SafeAreaView>
            <ScrollView>
            <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'padding'}  style={{ height: '100%', justifyContent: 'center' }} >
                    <View style={DefaultStyles.screenContainer}>
                        {/* <View style={styles.container}> */}
                        <Text style={DefaultStyles.title}>Sign Up</Text>
                        {/* <Text h3 style={styles.signup} >Sign up</Text> */}
                        <Input value={fName}
                            onChangeText={SetFname}
                            autoCorrect={false}
                            label='First Name'
                            placeholder='First Name'
                            labelStyle={DefaultStyles.label}
                            placeholderTextColor={Colors.placeholderTextColor}
                            inputContainerStyle={DefaultStyles.input}
                            inputStyle={DefaultStyles.inputText}
                        />
                        <Input value={lName}
                            onChangeText={setLname}
                            autoCorrect={false}
                            label='Last Name'
                            placeholder='Last Name'
                            labelStyle={DefaultStyles.label}
                            placeholderTextColor={Colors.placeholderTextColor}
                            inputContainerStyle={DefaultStyles.input}
                            inputStyle={DefaultStyles.inputText}
                        />

                        <Input value={email}
                            onChangeText={SetEmail}
                            autoCapitalize='none'
                            autoCorrect={false}
                            label='Email'
                            placeholder='email@mail.com'
                            labelStyle={DefaultStyles.label}
                            placeholderTextColor={Colors.placeholderTextColor}
                            inputContainerStyle={DefaultStyles.input}
                            inputStyle={DefaultStyles.inputText}
                        />

                        <Input value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize='none'
                            autoCorrect={false}
                            label='Password'
                            labelStyle={DefaultStyles.label}
                            placeholder='password'
                            placeholderTextColor={Colors.placeholderTextColor}
                            inputContainerStyle={DefaultStyles.input}
                            inputStyle={DefaultStyles.inputText}
                        />
                        <Input value={location}
                            onChangeText={setLocation}
                            autoCorrect={false}
                            label='Location'
                            placeholder='A0A 0A0'
                            labelStyle={DefaultStyles.label}
                            placeholderTextColor={Colors.placeholderTextColor}
                            inputContainerStyle={DefaultStyles.input}
                            inputStyle={DefaultStyles.inputText}
                        />

                        <RadioButton2 value={payment} setValue={setPayment} />
                        {errorMessage ? <Text style={DefaultStyles.errorText} >{errorMessage}</Text> : null}

                        <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
                            {/* <View style={styles.buttonSave}> */}
                            <MainButton title="Sign Up" buttonColor={Colors.defaultButtonColor} onPress={() => signup({ email, password, fName, lName, location, payment })} />
                            {/* </View>         */}
                        </View>

                        <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
                            {/* <View style={styles.buttonSave}> */}
                            <MainButton title="Go to Sign In" buttonColor={Colors.cancelButtonColor} onPress={() => navigation.navigate('Sign In')} />
                            {/* </View>         */}
                        </View>

                        {/* <View style={styles.buttonContainer}>
        <View style={styles.buttonSave}>
          <MainButton title="Sign up" buttonColor="purple" onPress={()=>signup({email, password, fName, lName, location, payment})}/>
        </View>        
      </View>

        <View style={styles.buttonContainer}>
        <View style={styles.buttonSave}>
          <MainButton title="Go to Sign in" buttonColor="orange" onPress={()=>navigation.navigate('Signin')}/>
        </View>        
      </View> */}
                        {/* <Button 
        title='Sign up' 
        onPress={()=>signup({email, password, fName, lName, location, payment})}
        />
    <Button title='Go to Sign in' onPress={()=>navigation.navigate('Signin')} style={styles.goto}/> */}
                    </View>
                </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     marginTop : 0,
    //     marginHorizontal: 10
    // },
    // signup: {
    //     marginVertical: 20
    // },
    // goto:{
    //     marginVertical: 40,        
    // },
    // buttonContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     marginVertical: 10
    //   },
    //   buttonSave: {
    //     width: '60%',
    //   },

})
export default Signup;