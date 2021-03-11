import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {DeleteMyItem} from '../store/actions/DeleteMyItem'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';

const DeleteMyItemComponent = props => {
 console.log('FSDFDSFD');
 const dispatch = useDispatch();


return(
    <View style={styles.buttonContainer}>
     <View style={styles.buttonSave}>
     <Button title="Delete" onPress={ ()=>dispatch(DeleteMyItem(props.userid,props.itemid))}></Button>
     </View>
    </View>
)
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  buttonSave:{
     paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
    width: '60%',
  }
});

export default DeleteMyItemComponent;