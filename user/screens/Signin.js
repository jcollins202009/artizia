import React, { useState, useContext, useCallback } from 'react';
import { View , Keyboard, TouchableWithoutFeedback} from 'react-native';
import { StyleSheet } from 'react-native'
import { Button, Text, Input } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'
import Colors from '../constants/Colors';
import DefaultStyles from '../constants/defaultStyles'
import MainButton from '../components/MainButton';

const Signin = ({ navigation }) => {
    const [email, SetEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signin, state: { errorMessage }, clearErrorMessage } = useContext(AuthContext)

    useFocusEffect(
        useCallback(() => {
            return () => clearErrorMessage()
        }, [])
    )

    return (
        <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={DefaultStyles.screenContainer}>
            {/* <View style={styles.container}> */}
            <Text style={DefaultStyles.title}>Sign In</Text>
            {/* <Text h3 style={styles.signin} >Sign in</Text> */}
            {/* <AuthForm 
            submitButtonText='Sign in'
            onSubmit={signin}/> */}
            <Input value={email}
                onChangeText={SetEmail}
                autoCapitalize='none'
                autoCorrect={false}
                label='Email'
                labelStyle={DefaultStyles.label}
                placeholder='name@email.com'
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
                placeholder='password'
                labelStyle={DefaultStyles.label}
                placeholderTextColor={Colors.placeholderTextColor}
                inputContainerStyle={DefaultStyles.input}
                inputStyle={DefaultStyles.inputText}
            />

            {errorMessage ? <Text style={DefaultStyles.errorText} >{errorMessage}</Text> : null}

            {/* <Button 
            title= 'Sign in' 
            onPress={()=>signin({email,password})}
            />
            <Button title='Go to Sign up' onPress={()=>navigation.navigate('Signup')} style={styles.goto}/> */}

            <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
                {/* <View style={styles.buttonSave}> */}
                <MainButton title="Sign In" buttonColor={Colors.defaultButtonColor} onPress={() => signin({ email, password })} />
                {/* </View>         */}
            </View>

            <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
                {/* <View style={styles.buttonSave}> */}
                <MainButton title="Go to Sign Up" buttonColor={Colors.cancelButtonColor} onPress={() => navigation.navigate('Sign Up')} />
                {/* </View>         */}
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     marginTop : 40,
    //     marginHorizontal: 10
    // },
    // signin: {
    //     marginVertical: 60
    // },
    // goto:{
    //     marginVertical: 40
    // },
    // error: {
    //     textAlign: 'center',
    //     color: Colors.error,
    //     marginBottom: 10
    // },
    // errorStyle: {
    //     color: Colors.error
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
export default Signin;