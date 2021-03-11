import React, { useEffect, useState, useContext,useCallback } from 'react'
import {
    Text, View, FlatList, StyleSheet, TouchableOpacity,
    TouchableNativeFeedback, Platform, Image
} from 'react-native'
import craftserverApi from '../api/craftserver'
import { Context as AuthContext } from '../context/AuthContext'
import { navigate } from '../RootNavigation'
import Colors from '../constants/Colors';
import DefaultStyles from '../constants/defaultStyles';
import Card from '../components/Card';
import {useFocusEffect} from '@react-navigation/native'

const MessageList = () => {

    const { state: { user } } = useContext(AuthContext)

    const [messageData, setMessageData] = useState([])
    const fetchData = async () => {
        const response = await craftserverApi.get('/messages/')

        await setMessageData(response.data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    useFocusEffect(
        useCallback(()=>{
            fetchData()
        },[])
    )
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
if (messageData.length<1){
    return ( <View style={DefaultStyles.screenContainer}>
    <Text style={styles.container}>No message to display</Text>
    </View>)
} else {
    return (
        <View style={DefaultStyles.screenContainer}>

            <FlatList
                data={messageData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <Card style={DefaultStyles.messageCard}>
                            {/* <View style={styles.container} >  */}

                            <TouchableCmp onPress={() => navigate('Messages', { buyerid: item.buyerid, sellerid: item.sellerid, itemName: item.itemName, itemid: item.itemid, uri: item.itemUri })} useForeground>

                                {/* <View style={styles.body}> */}
                                <View style={DefaultStyles.messageViewInCardContainer}>
                                    <Image style={DefaultStyles.messageImageInCard} source={{ uri: item.itemUri }} />

                                    <View>

                                        <View style={DefaultStyles.messageDetailsInCardContainer}>
                                            <Text style={DefaultStyles.messageItemNameInDetailsOfCard}>{item.itemName}</Text>
                                            {user.idusers === item.buyerid ? <Text style={DefaultStyles.messageBuyerInDetailsOfCard}>Me</Text> : <Text style={DefaultStyles.messageBuyerInDetailsOfCard}>Buyer:  {item.buyerFirstName}</Text>}
                                            {user.idusers === item.sellerid ? <Text style={DefaultStyles.messageSellerInDetailsOfCard}>Me</Text> : <Text style={DefaultStyles.messageSellerInDetailsOfCard}>Seller: {item.sellerFirstName}</Text>}
                                            {/* <Text style={DefaultStyles.messageItemIdInDetailsOfCard}>ItemId {item.itemid}</Text> */}

                                        </View>

                                    </View>

                                </View>
                            </TouchableCmp>
                        </Card>

                    )
                }}
            />
        </View>
    );
}
}
const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        marginTop: 200,
        fontSize: 24
    },
    // body: {: 
    //     flexDirection: 'row'
    // },
    // lineMargin: {
    //     margin: 5
    // },
    // image: {
    //     width: 90,
    //     height: 90,
    //     // margin: 10,
    //     borderRadius: 10,
    //     marginRight:20
    //   },
})

export default MessageList;