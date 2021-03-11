import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'
import Colors from '../constants/Colors';
import DefaultStyles from '../constants/defaultStyles'
import { ScrollView } from 'react-native-gesture-handler';
import MainButton from '../components/MainButton';
import Input from '../components/Input';
import Moment from 'react-moment';
import moment from 'moment';

const Profile = ({ navigation }) => {

    const { state } = useContext(AuthContext)
    if (state.user) {
        return (
            <ScrollView>
                <View style={DefaultStyles.screenContainer}>

                    {/* <Button title='Edit Profile' onPress={()=>navigation.navigate('EditProfile')} />             */}
                    {/* <Text>Id {state.user.idusers}</Text> */}

                    <Text style={DefaultStyles.label} >First Name</Text>
                    {/* <Text style={styles.data}>{state.user.fName}</Text> */}
                    <Input editable={false} value={state.user.fName} />


                    <Text style={DefaultStyles.label} >Last Name</Text>
                    {/* <Text style={styles.data}>{state.user.lName}</Text> */}
                    <Input editable={false} value={state.user.lName} />


                    <Text style={DefaultStyles.label} >Email</Text>
                    {/* <Text style={styles.data}> {state.user.email}</Text>  */}
                    <Input editable={false} value={state.user.email} />

                    <Text style={DefaultStyles.label} >Location</Text>
                    {/* <Text style={styles.data}>{state.user.location}</Text> */}
                    <Input editable={false} value={state.user.location} />

                    <Text style={DefaultStyles.label} >Accepted Payment </Text>
                    {/* <Text style={styles.data}>{state.user.payment}</Text> */}
                    <Input editable={false} value={state.user.payment} />

                    <Text style={DefaultStyles.label} >Status</Text>
                    {/* <Text style={styles.data}>{state.user.status}</Text> */}
                    <Input editable={false} value={state.user.status} />

                    <Text style={DefaultStyles.label} >Date Joined</Text>
                    {/* <Text style={styles.data}>{state.user.joined}</Text> */}
                    <Input editable={false} value={moment(state.user.joined.substring(0, 10), ['YYYY-MM-DD']).format('MMM DD, yyyy')} />
                    
                    <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
                        <MainButton title="Edit Profile" buttonColor={Colors.defaultButtonColor} onPress={() => navigation.navigate('Edit Profile')} />
                    </View>

                </View>
            </ScrollView>
        );

    } else return <Text>User not looged in</Text>



};

const styles = StyleSheet.create({
    container: {
        margin: 30
    },
    data: {
        fontSize: 18,
        width: 260,
        height: 50,
        backgroundColor: Colors.accent,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.primary,
        overflow: 'hidden'
    }
})

export default Profile;