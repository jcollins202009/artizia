import React, { useState, useEffect,useContext,useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform, Button, Alert
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Card from './Card';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteMyItem } from '../store/actions/DeleteMyItem'
import DefaultStyles from '../constants/defaultStyles';
import { Context as AuthContext } from '../context/AuthContext'
import * as actionGetItem from '../store/actions/DisplayMyItem';
const GetMyItem = props => {
  const { state } = useContext(AuthContext)
  const [userid, setuserid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(true)
    const [error, setError] = useState();
  const dispatch = useDispatch();
  const DeleteItem = props => {
    console.log('FSDFDSFD');

  }

  //const UserItemreducer = useSelector(state => state.userItemsReducer.items);
 

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const deleteHandler = (id,isdelete) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {

          console.log(props.isdelete)
          dispatch(DeleteMyItem(state.user.idusers, props.id));
        }
      }
    ]);
  };

  return (
    <Card style={DefaultStyles.myItemCard}>
      <View style={DefaultStyles.touchableCard}>
        <View>
          <View style={DefaultStyles.imageInCardContainer}>
            <Image style={DefaultStyles.imageInCard} source={{ uri: props.url }} />
          </View>
          <View style={{ ...DefaultStyles.detailsInCardContainer }}>
            <Text style={DefaultStyles.nameInDetailsOfCard}>{props.name}</Text>
            {/* <Text style={styles.desc}>{props.desc}</Text> */}
            <Text style={DefaultStyles.priceInDetailsOfCard}>${props.price.toFixed(2)}</Text>
            <View style={{ ...DefaultStyles.buttonContainer, marginLeft: 150 }}>
              <TouchableCmp>
                <MaterialCommunityIcons name="delete-forever" size={45} color={Colors.saveButtonColor} onPress={deleteHandler.bind(this, props.id)} />
              </TouchableCmp>
            </View>

          </View>

        </View>

      </View>

    </Card>

  );
};
const styles = StyleSheet.create({
  // product: {
  //   marginTop:30,
  //   height: 250,
  //   width:300,
  //   marginLeft:33

  // },
  // buttonContainer:{
  //   marginVertical: 10,
  //   justifyContent: 'space-between',
  //   padding:1,
  //   marginLeft:200
  // },
  // touchable: {
  //   borderRadius: 10,
  //   overflow: 'hidden'
  // },
  // imageContainer: {
  //   width: '100%',
  //   height: '60%',
  //   borderTopLeftRadius: 10,
  //   borderTopRightRadius: 10,
  //   overflow: 'hidden'
  // },
  // image: {
  //   width: '100%',
  //   height: '100%'
  // },
  // details: {
  //   alignItems: 'center',
  //   height: '30%',
  //   padding: 5
  // },
  // name: {
  //   // fontFamily: 'open-sans-bold',
  //   fontSize: 18,
  //   // color: Colors.accent,
  //   marginVertical: 2
  // },
  // price: {
  //   // fontFamily: 'open-sans',
  //   fontSize: 14,
  //   color: '#888'
  // },
  // desc: {
  //   // fontFamily: 'open-sans-bold',
  //   fontSize: 18,
  //   // color: Colors.accent,
  //   marginVertical: 2
  // },

});
export default GetMyItem;