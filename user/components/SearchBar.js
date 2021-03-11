import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import DefaultStyles from '../constants/defaultStyles';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={DefaultStyles.searchBarContainer}>
      <Feather name="search" style={DefaultStyles.searchBarIcon} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={DefaultStyles.searchBarText}
        placeholder="Search for items"
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // searchBarContainer: {
  //   marginTop: 10,
  //   // backgroundColor: '#F0EEEE',
  //   borderColor: Colors.accent,
  //   borderWidth: 1,
  //   height: 50,
  //   borderRadius: 5,
  //   // marginHorizontal: 15,
  //   flexDirection: 'row'
  // },
  // searchBarText: {
  //   flex: 1,
  //   fontSize: 18
  // },
  // searchBarIcon: {
  //   fontSize: 35,
  //   alignSelf: 'center',
  //   marginHorizontal: 15
  // }
});

export default SearchBar;