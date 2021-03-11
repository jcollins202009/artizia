import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  placeholder,
  Button
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Input from '../Input';
import DefaultStyles from '../../constants/defaultStyles';
import { colors } from 'react-native/Libraries/NewAppScreen';
import Colors from '../../constants/Colors';


const sellerreviewscreen = props => {
  const [name, setName] = useState("");
  const [sellerRating, setsellerRating] = useState("");
  const [sellerReview, setSellerReview] = useState("");

  const nameInputHandler = (enteredName) => {
    setName(enteredName);
  };
  const sellerReviewInputHandler = (enteredreview) => {
    setSellerReview(enteredreview);
  };
  const sellerRatingInputHandler = (count) => {
    setsellerRating(count);
  };

  //const sellerreview = useSelector(state => state.sellerreviews);

  const ratingCompleted = (rating) => {
    setsellerRating(rating)

  }
  useEffect(() => {


    setsellerRating(10)
    //  props.parentCallback(name, sellerReview, sellerRating);

    props.parentCallback(name, sellerReview, sellerRating);

  })
  //let disabled = (name.length > 0 && text.length > 0) ? false : true;
  return (
    <View style={DefaultStyles.screenContainer}>
      <View >
        <Text style={DefaultStyles.label} >Seller Name</Text>
        <Input clearButtonMode="while-editing"

          // style={styles.ReviewInput}
          placeholder="Seller Name"
          onChangeText={nameInputHandler}
          value={name}
        />

        <Text style={DefaultStyles.label} >Seller Review</Text>
        <Input
          value={sellerReview}
          style={DefaultStyles.multiLineInput}
          placeholder="Seller review"
          multiline={true}
          keyboardType="default"
          onChangeText={sellerReviewInputHandler}
        // label={"Seller review"}
        />


      </View>
      <View>
        <Text style={{ ...DefaultStyles.label, textAlign: 'center' }}>Seller Rating</Text>
        <AirbnbRating
          count={5}
          onChangeText={sellerRatingInputHandler}
          reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
          defaultRating={5}
          size={20}
          onFinishRating={ratingCompleted}
          value={sellerRating}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  // container: {
  //   flexDirection: 'column',
  //   padding: 10,
  //   justifyContent: 'space-around',
  //   marginTop: '10%'
  // },

  // ReviewInput: {
  //   flex: 1,
  //   fontSize: 24,
  //   marginBottom: 32,
  //   borderWidth: 1,
  //   padding: 12,
  //   width: '100%',
  //   height: '1%',
  //   borderRadius: 10,
  //   backgroundColor: 'white'
  // },
  // title: {
  //   textAlign: 'center',
  //   fontSize: 25,
  // }
});

export default sellerreviewscreen;
