import React, { useEffect, useContext, useState } from 'react';
import { Button, View, StyleSheet, Text, Image, Keyboard, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import craftserverApi from '../api/craftserver'
import { Feather, AntDesign } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'
import Moment from 'react-moment'
import Colors from '../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/Card';
import DefaultStyles from '../constants/defaultStyles';
import Input from '../components/Input';


const MessageDetail = ({ route, navigation }) => {
    const { state: { user } } = useContext(AuthContext)
    const { itemid, buyerid, sellerid, itemName, uri } = route.params
    const [messageData, setMessageData] = useState([])
    const [message, setMessage] = useState('')

    const FetchMessage = async () => {
        const response = await craftserverApi.post(`/messages`, { buyerid, itemid, sellerid })
        //  await console.log(response.data)
        await setMessageData(response.data)
    }
    useEffect(() => {
        FetchMessage()
    }, [itemid])

    const sentMessageHandler = async () => {
        if (message.length < 2) {
            alert('Please entermessssage to send')
            navigation.navigate('MessageDetail')
        } else {

            // console.log(message)
            try {
                const response = await craftserverApi.patch('/messages/' + itemid, { message, buyerid, sellerid, uri, itemName })
                await FetchMessage()
                await alert(response.data)
                await setMessage('')

            } catch (err) {
                alert(err)
                navigation.goBack()
            }
        }
    }

    const messageDeleteHandler = async (idmessages) => {
        const response = await craftserverApi.delete('/messages/' + idmessages)
        await FetchMessage()
        await alert(response.data)

    }

    const messageDisplay = messageData.map((item) => {
        return (
            <Card style={(item.messageFrom - user.idusers) ? DefaultStyles.messageDetailCardMe : DefaultStyles.messageDetailCardThem} key={item.idmessages} >
                <View style={DefaultStyles.messageDetailDateTimeInCardContainer}>
                    <View style={DefaultStyles.messageDetailDateInCardContainer}>
                        <Text style={DefaultStyles.messageDetailDateInCard} >Date: </Text>
                        <Moment style={DefaultStyles.messageDetailDateInCard} element={Text} format="MMM-DD-YYYY ">{item.dateCreated}</Moment>
                    </View>
                    <View style={DefaultStyles.messageDetailTimeInCardContainer}>
                        {/* <Text style={DefaultStyles.messageDetailTimeInCard}>Time  </Text> */}
                        <Moment style={DefaultStyles.messageDetailTimeInCard} element={Text} format="hh:mm">{item.dateCreated}</Moment>
                    </View>
                </View>

                {user.idusers === item.buyerid ? <Text style={DefaultStyles.messageDetailBuyerInDetailsOfCard}>Me</Text> : <Text style={DefaultStyles.messageDetailBuyerInDetailsOfCard}>Buyer: {item.buyerFirstName}</Text>}
                {user.idusers === item.sellerid ? <Text style={DefaultStyles.messageDetailSellerInDetailsOfCard}>Me</Text> : <Text style={DefaultStyles.messageDetailSellerInDetailsOfCard}>Seller: {item.sellerFirstName}</Text>}

                <View style={DefaultStyles.messageDetailItemAndDeleteButtonInCardContainer}>
                    <Text style={DefaultStyles.messageDetailItemNameInDetailsOfCard}>Item: {item.itemName}</Text>
                    <AntDesign style={DefaultStyles.messageDetailDeleteButtonInCard} name='delete' size={20} onPress={() => messageDeleteHandler(item.idmessages)} />
                </View>
                {/* <Text>{item.itemid}</Text> */}
                <Text style={DefaultStyles.messageDetailMessage}>{item.message}</Text>

            </Card>
        )
    })

    return (
        <View style={DefaultStyles.screenContainer}>
            <SafeAreaView>
                <ScrollView>
                <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'padding'} >

                        {/* <View style={DefaultStyles.screenContainer}> */}
                        {messageDisplay}
                        <View style={DefaultStyles.messageInputContainer}>
                            <TextInput
                                style={DefaultStyles.multiLineFeatherInput}
                                maxLength={180}
                                multiline={true}
                                numberOfLines={30}
                                placeholder='Message'
                                value={message}
                                onChangeText={setMessage}
                            />
                            {/* <Button title='Send message' onPress={()=>sentMessageHandler()}/> */}
                            <Feather style={DefaultStyles.sendMessageIcon} name='send' size={25} onPress={() => sentMessageHandler()} />
                        </View>
                        {/* </View> */}

                    </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        flex: 1
    },
    messageMe: {
        // backgroundColor: Colors.accent,
        // marginVertical: 20,
        marginLeft: 20,
        // borderRadius: 10,
        // padding:10,
        width: '80%',
    },
    messageTo: {
        // backgroundColor: Colors.accent2,
        // marginVertical: 20,
        marginLeft: 50,
        // borderRadius: 10,
        // padding:10,
        width: '80%',

    },
    date: {
        flexDirection: 'row',
        marginVertical: 5
    },
    multilineInput: {
        height: 70,
        width: '85%',

        // margin: 20,
        // padding: 20,

    },
    sendMessage: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        margin: 20,
        borderRadius: 10
    },

})

export default MessageDetail;