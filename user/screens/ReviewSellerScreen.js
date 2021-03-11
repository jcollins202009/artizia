import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet, ScrollView, Button } from 'react-native';
import ItemReview from '../components/Review.components/ItemReview.component';
import SellerReview from '../components/Review.components/SellerReview.component';
import * as sellerReviewActions from '../store/actions/ReviewSeller';
import { createReviewItem } from '../store/actions/ReviewItem';
import { createReviewSeller } from '../store/actions/ReviewSeller';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux';
import MainButton from '../components/MainButton';
import DeleteMyItemComponent from '../components/DeleteMyItem';
import DefaultStyles from '../constants/defaultStyles';
import Colors from '../constants/Colors';

const ReviewSellerScreen = props => {
  const [name, setName] = useState("");
  const [sellerRating, setsellerRating] = useState("");
  const [sellerReview, setSellerReview] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [itemRating, setItemRating] = useState("");
  const [itemReview, setItemReview] = useState("");


  const dispatch = useDispatch();


  passValueItemReviewFunction = (shortDescription, itemRating, itemReview) => {
    setshortDescription(shortDescription);
    setItemReview(itemReview);
    setItemRating(itemRating);

  }


  passValueFunction = (name, sellerReview, sellerRating) => {
    setName(name);
    setSellerReview(sellerReview);
    setsellerRating(sellerRating);

  }

  return (
    <ScrollView>
      <View styles={DefaultStyles.screenContainer}>

        <View>
          <SellerReview parentCallback={passValueFunction} />
          <ItemReview parentCallback={passValueItemReviewFunction} />

        </View>

        <View style={DefaultStyles.screenContainer}>
          <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
            {/* <View style={styles.buttonSave}> */}
            <MainButton
              title="Save"
              buttonColor={Colors.defaultButtonColor}
              onPress={() => {

                dispatch(createReviewSeller(name, sellerReview, sellerRating));
                dispatch(createReviewItem(shortDescription, itemReview, itemRating));


              }}
            />
            {/* </View> */}
          </View>
        </View>
      </View>
    </ScrollView>
  )


}
const styles = StyleSheet.create({
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginVertical: 10
  // },
  // buttonSave: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 30,
  //   borderRadius: 20,
  //   marginVertical: 10,
  //   width: '60%',
  // }
});
export default ReviewSellerScreen;