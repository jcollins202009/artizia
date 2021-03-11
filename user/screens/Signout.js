import React, {useContext, useEffect} from 'react';
import { Button } from 'react-native';
import { View , Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext'
import MainButton from '../components/MainButton';

const Signout = () => {

    const {signout} = useContext(AuthContext)
    signout()
    useEffect(()=>{

    },[])
    return (
        <View>
             <View style={styles.indicator}>
    <ActivityIndicator size='large' color='orange' />
    </View>
            {/* <Text style={styles.header}>Sign Out</Text>
            <View style={styles.buttonContainer}>
        <View style={styles.buttonSave}>
          <MainButton title="Sign out" buttonColor="purple" onPress={signout}/>
        </View>        
      </View> */}
        </View> 
    );
};

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 50
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10
      },
      buttonSave: {
        width: '60%',
      },
      indicator: {
        display: 'flex',      
        justifyContent: 'center',
        flex: 1
      }
})

export default Signout;