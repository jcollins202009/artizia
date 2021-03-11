import React, { useContext, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Context as AnnouncementContext } from '../context/AnnouncementContext'
import Moment from 'react-moment'
import Colors from '../constants/Colors';
import DefaultStyles from '../constants/defaultStyles';
import Card from '../components/Card';
import {useFocusEffect} from '@react-navigation/native'

const Announcements = () => {

    const { state, fetchAnnouncements } = useContext(AnnouncementContext)

    useEffect(() => {
        fetchAnnouncements()
    }, [])
    useFocusEffect(
        useCallback(()=>{
            fetchAnnouncements()
        },[])
    )
    

    return (
        <View style={DefaultStyles.screenContainer} >
            {/* <Text style={styles.title}>Announcements Page</Text> */}
            <FlatList
                data={state}
                keyExtractor={item => item.idAnnouncements.toString()}
                renderItem={({ item }) => {
                    return <View>
                        <Text style={DefaultStyles.heading2}>{item.title}</Text>
                        <Card style={DefaultStyles.messageDetailCard}>

                            <View style={DefaultStyles.messageDetailsInCardContainer}>
                                <View style={DefaultStyles.messageDetailDateTimeInCardContainer}>
                                    <View style={DefaultStyles.messageDetailDateInCardContainer}>
                                        <Text style={DefaultStyles.messageDetailDateInCard} >Date : </Text>
                                        <Moment style={DefaultStyles.messageDetailDateInCard} element={Text} format="MMM-DD-YYYY ">{item.dateEntered}</Moment>
                                    </View>
                                </View>

                                {/* <View style={DefaultStyles.messageDetailDateTimeInCardContainer}>
                                    <View style={DefaultStyles.messageDetailDateInCardContainer}>
                                        <Text style={DefaultStyles.messageDetailDateInCard} >Date expired: </Text>
                                        <Moment style={DefaultStyles.messageDetailDateInCard} element={Text} format="YYYY-MM-DD ">{item.expiredDate}</Moment>
                                    </View>
                                </View> */}

                                <Text></Text>
                                <Text style={DefaultStyles.messageDetailMessageInCard} >{item.message}</Text>                                
                            </View>
                        </Card>

                    </View>

    // <View style={styles.container}> 

    //     <View>
    //     <Text style={styles.messageTitle}>{item.title}</Text>
    //     </View>
    //     <View style={styles.message}>
    //     <Text >{item.message}</Text>
    //     <View style={styles.date}>
    //     <Text>Date Entered  </Text>
    //     {/* <Text>{item.dateEntered} </Text> */}
    //     <Moment element={Text} format= "YYYY MM DD">{item.dateEntered}</Moment>
    //     </View>
    //     <View style={styles.date}>
    //     <Text>Expired Date  </Text>
    //     {/* <Text>{item.expiredDate}</Text> */}
    //     <Moment element={Text} format= "YYYY MM DD">{item.expiredDate}</Moment>
    //     </View>
    //     </View>
    // </View>
                }}
            />

        </View>
    );
};
const styles = StyleSheet.create({
    // container: {
    //     margin: 20
    // },
    // title: {
    //     fontSize: DefaultStyles.title.fontSize,
    //     color: 'blue',
    //     textAlign: 'center',
    //     marginVertical: 20
    // },
    // date: {
    //     flexDirection: 'row',
    //     marginVertical: 5
    // },
    // messageTitle: {
    //     marginVertical: 5,
    //     fontWeight: 'bold',
    //     fontSize: DefaultStyles.bodyText.fontSize
    // },
    // message: {
    //     backgroundColor: Colors.accent,
    //     padding: 10,
    //     borderRadius: 10
    // }
})

export default Announcements;