import React, { useEffect, useContext, useState } from 'react';
import { Button } from 'react-native';
import { View, StyleSheet, Text, Image, FlatList, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import craftserverApi from '../api/craftserver'
import { Context as AuthContext } from '../context/AuthContext'
// import { navigate } from '../RootNavigation';
import DefaultStyles from '../constants/defaultStyles';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import Moment from 'react-moment';
import { Feather, AntDesign } from '@expo/vector-icons'
import Input from '../components/Input';
import MainButton from '../components/MainButton';

const ItemDetail = ({ route, navigation }) => {
  const { state: { isSignedIn } } = useContext(AuthContext)
  const { itemId, uri, itemName, price, } = route.params
  const [ItemImages, setItemImages] = useState([])
  const [sellerid, setSellerid] = useState('')

  const ItemMessage = ` Hi, I'm interested in the ${itemName}! Please contact me if this item is still available, Thanks`
  const [message, setMessage] = useState(ItemMessage)

  useEffect(() => {
    const fetchData = async () => {
      const response = await craftserverApi.get('/itemImages/' + itemId)
      await setItemImages(response.data)
      await setSellerid(response.data[0].userId)
    }
    fetchData()
  }, [itemId])

  const sentMessageHandler = async ({ message, sellerid, }) => {
    if (!isSignedIn) {
      navigation.navigate('Sign In')
    } else {
      if (message.length < 2) {
        alert('Please enter message to send')
        navigation.navigate('Item Detail')
      } else {
        // console.log(message)
        try {
          const response = await craftserverApi.post('/messages/' + itemId, { message, sellerid, uri, itemName })

          alert(response.data)
          // navigation.navigate('ItemDetail')
          navigation.navigate('Message List')
        } catch (err) {
          alert('Message to self is not permitted, Thanks')
          navigation.goBack()
        }
      }

    }

  }

  // console.log('N',ItemImages)
  if (ItemImages.length > 0) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={DefaultStyles.screenContainer}>
          <ScrollView>
            <View style={DefaultStyles.imageFlatListContainer}>
              <FlatList
                data={ItemImages}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.url}
                renderItem={({ item }) => {
                  return (
                    <View onStartShouldSetResponder={() => true}>
                      <Card>
                        <View style={{ ...DefaultStyles.imageInCardContainer, height: '100%' }}>
                          <Image style={DefaultStyles.imageInCard} source={{ uri: item.url }} />
                        </View>
                      </Card>
                    </View>

                  )
                }}
              />
            </View>

            {/* <Text>This ItemDetailScreen Page</Text>
        <Text>Item id from Landing {itemId}</Text> */}
            <Text style={DefaultStyles.itemDetails}>{ItemImages[0].name}</Text>
            <Text style={DefaultStyles.itemDetails}>${price.toFixed(2)}</Text>
            <Text style={DefaultStyles.itemDetails}>{ItemImages[0].drop}</Text>
            <View style={DefaultStyles.itemDetailDateTimeContainer}>
              <View style={DefaultStyles.itemDetailDateContainer}>
                <Text style={DefaultStyles.itemDetailDate} >Date created: </Text>
                <Moment style={DefaultStyles.itemDetailDate} element={Text} format="YYYY-MM-DD ">{ItemImages[0].createdDate}</Moment>
              </View>
              <View style={DefaultStyles.itemDetailTimeContainer}>
                {/* <Text style={DefaultStyles.itemDetailTime}>Time  </Text> */}
                <Moment style={DefaultStyles.itemDetailTime} element={Text} format="hh:mm">{ItemImages[0].createdDate}</Moment>
              </View>
            </View>

            <Text style={DefaultStyles.itemDetails}>{ItemImages[0].location}</Text>

            <Text style={DefaultStyles.heading2}>Contact the seller:</Text>

            <Input
              style={DefaultStyles.multiLineInput}
              maxLength={256}
              multiline={true}
              numberOfLines={10}
              defaultValue={ItemMessage}
              onChangeText={setMessage} />

            <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
              <MainButton title="Send Message" buttonColor={Colors.defaultButtonColor} onPress={() => sentMessageHandler({ message, sellerid })} />
            </View>

            {/* <Button title='Send message' onPress={() => sentMessageHandler({ message, sellerid })} /> */}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  } else
    return (
      <View style={{ ...DefaultStyles.screenContainer, ...DefaultStyles.activityIndicator }}>
        <ActivityIndicator size='large' color={Colors.defaultButtonColor} />
      </View>
    )

};

const styles = StyleSheet.create({
  // container: {
  //   margin: 20,
  // },
  // imageContainer: {
  //   // width: '100%',
  //   height: '50%',
  //   borderTopLeftRadius: 10,
  //   borderTopRightRadius: 10,
  //   overflow: 'hidden'
  // },
  // image: {
  //   width: 300,
  //   height: '100%',
  //   margin: 10,
  //   borderRadius: 10
  // },
  // price: {
  //   // fontFamily: 'open-sans',
  //   fontSize: 26,
  //   color: '#888'
  // },
  // multilineInput: {
  //   height: 80,
  //   width: '100%',
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   margin: 10,
  //   padding: 10,
  //   borderRadius: 10
  // },
  // indicator: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   flex: 1
  // }
})

export default ItemDetail;