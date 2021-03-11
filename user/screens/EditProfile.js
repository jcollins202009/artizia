import React, { useState, useContext, useCallback } from 'react';
import { View } from 'react-native';
import { StyleSheet, ScrollView, KeyboardAvoidingView, SafeAreaView , Keyboard, TouchableWithoutFeedback} from 'react-native'
import { Button, Text, Input, colors } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'
import RadioButton2 from '../components/RadioButton2'
import { useFocusEffect } from '@react-navigation/native'
import Colors from '../constants/Colors';
import DefaultStyles from '../constants/defaultStyles'
import MainButton from '../components/MainButton';
const EditProfile = ({ navigation }) => {
    const { editProfile, state, clearErrorMessage } = useContext(AuthContext)
    const [email, SetEmail] = useState(state.user.email)
    // const [password, setPassword] = useState ('')
    const [fName, SetFname] = useState(state.user.fName)
    const [lName, setLname] = useState(state.user.lName)
    const [location, setLocation] = useState(state.user.location)
    const [payment, setPayment] = useState(state.user.payment)

    return (
        <SafeAreaView>
            <ScrollView>
            <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'padding'} >
                    <View style={DefaultStyles.screenContainer}>
                        {/* <Text h3 style={styles.signup} >Edit Profile</Text> */}
                        {/* <Text style={DefaultStyles.title} >Edit Profile</Text> */}
                        <Input
                            // value ={fName}
                            onChangeText={SetFname}
                            autoCorrect={false}
                            label='First Name'
                            defaultValue={state.user.fName}
                            // labelStyle={DefaultStyles.bodyText}
                            // placeholderTextColor={Colors.placeholderTextColor}
                            labelStyle={DefaultStyles.label}
                            placeholderTextColor={Colors.placeholderTextColor}
                            inputContainerStyle={DefaultStyles.input}
                            inputStyle={DefaultStyles.inputText}
                        />
                        <Input
                            onChangeText={setLname}
                            autoCorrect={false}
                            label='Last Name'
                            defaultValue={state.user.lName}
                            // labelStyle={DefaultStyles.bodyText}
                            placeholderTextColor={Colors.placeholderTextColor}
                            labelStyle={DefaultStyles.label}
                            inputContainerStyle={DefaultStyles.input}
                            inputStyle={DefaultStyles.inputText}
                        />

                        <Input
                            onChangeText={SetEmail}
                            autoCapitalize='none'
                            autoCorrect={false}
                            label='Email'
                            defaultValue={state.user.email}
                            // labelStyle={DefaultStyles.bodyText}
                            placeholderTextColor={Colors.placeholderTextColor}
                            labelStyle={DefaultStyles.label}
                            inputContainerStyle={DefaultStyles.input}
                            inputStyle={DefaultStyles.inputText}
                        />

                        {/* <Input value={password} 
        onChangeText={setPassword}
        secureTextEntry
            autoCapitalize='none'
            autoCorrect={false}
            label='Password'
            labelStyle={DefaultStyles.bodyText}
            placeholder='password'
            placeholderTextColor={Colors.placeholderTextColor}
        /> */}
                        <Input
                            onChangeText={setLocation}
                            autoCorrect={false}
                            label='Location'
                            defaultValue={state.user.location}
                            // labelStyle={DefaultStyles.bodyText}
                            placeholderTextColor={Colors.placeholderTextColor}
                            labelStyle={DefaultStyles.label}
                            inputContainerStyle={DefaultStyles.input}
                            inputStyle={DefaultStyles.inputText}
                        />

                        <RadioButton2 value={payment} setValue={setPayment} />

                        <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
                            {/* <View style={styles.buttonSave}> */}
                            <MainButton title="Submit Edit" buttonColor={Colors.saveButtonColor} onPress={() => editProfile({ email, fName, lName, location, payment })} />
                            {/* </View>         */}
                        </View>

                        <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
                            {/* <View style={styles.buttonSave}> */}
                            <MainButton title="Cancel Edit" buttonColor={Colors.cancelButtonColor} onPress={() => navigation.navigate('Profile')} />
                            {/* </View>         */}
                        </View>
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
export default EditProfile;