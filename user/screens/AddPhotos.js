import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Modal, View, Image, FlatList, Text, Alert } from 'react-native';
import Input from '../components/Input';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DefaultStyles from '../constants/defaultStyles';
import MainButton from '../components/MainButton';
import { ScrollView } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';

const AddPhotos = (props) => {

 

  const addPhotoHandler = async () => {
    console.log('addPhotoHandler', props.currentImageUri);

    if (props.newPhotos.filter(photo => photo.uri === props.currentImageUri).length > 0) {
      Alert.alert("This photo has already been uploaded", "", [{ text: "Ok", onPress: () => { } }]);
      return;
    }

    if (props.currentImageUri) {
      const fileInfo = await FileSystem.getInfoAsync(props.currentImageUri);

      if (!fileInfo.exists) {
        Alert.alert("The image uri does not exist on this device", "", [{ text: "Ok", onPress: () => { } }]);
        return;
      }
    }
    else {
      Alert.alert("The image uri does not exist on this device", "", [{ text: "Ok", onPress: () => { } }]);
      return;
    }
    
    const newNewPhotos = [...props.newPhotos];
    newNewPhotos.push({ uri: props.currentImageUri });
    props.setNewPhotos(newNewPhotos);
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY,
      Permissions.CAMERA
    );
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takePhotoHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    props.setCurrentImageUri(image.uri);
    console.log(image.uri);
  };

  const pickPhotoFromGalleryHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    props.setCurrentImageUri(image.uri);
    console.log(image.uri);
  };

  const doneButtonHandler = () => {
    props.setPhotos(props.newPhotos);
    props.setIsAddPhotoModalVisible(false);
  }

  const cancelButtonHandler = () => {
    props.setNewPhotos(props.photos);
    props.setIsAddPhotoModalVisible(false); 
  }

  return (
    <Modal visible={props.visible} animationType='slide'>

      <View style={DefaultStyles.screenContainer}>

        {/* <View style={styles.header}> */}
        <Text style={DefaultStyles.title}>Add Photos</Text>
        <ScrollView>
          {/* </View> */}
          {/* <View> */}
          <Text style={DefaultStyles.label} >Image Uri</Text>
          {/* </View>                                 */}
          <Input style={styles.photoUriInput} value={props.currentImageUri} onChangeText={(imageUri) => props.setCurrentImageUri(imageUri)} />

          <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
            <MainButton title="Browse" buttonColor={Colors.defaultButtonColor} onPress={pickPhotoFromGalleryHandler} />
            <MainButton title="Take Photo" buttonColor={Colors.defaultButtonColor} onPress={takePhotoHandler} />
          </View>

          {/* <View style={ styles.buttonContainer }>
                        <View style={ styles.button }>
                            <Button title="Browse" color={ Colors.accent } onPress={ pickPhotoFromGalleryHandler } />
                        </View>
                        <View style={ styles.button }>
                            <Button title="Take Photo" color={ Colors.accent } onPress={ takePhotoHandler } />
                        </View>
                    </View> */}

          <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'flex-start' }}>
            <MainButton title="Upload" buttonColor={Colors.defaultButtonColor} onPress={addPhotoHandler} />
          </View>

          {/* <View style={styles.header}> */}
          <Text style={DefaultStyles.heading2}>Photos To Add</Text>
          {/* </View> */}

          <View style={DefaultStyles.imageFlatListContainer} >
            <FlatList
              horizontal
              data={props.newPhotos}
              keyExtractor={photo => photo.uri}
              renderItem={photo => (
                // <View onStartShouldSetResponder={() => true}>
                <Card>
                  <View style={{ ...DefaultStyles.imageInCardContainer, height: '100%' }}>
                    <Image style={DefaultStyles.imageInCard} source={{ uri: photo.item.uri }} />
                  </View>
                </Card>
                // </View>
              )}
            />
          </View>

          <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
            <MainButton title="Done" buttonColor={Colors.saveButtonColor} onPress={doneButtonHandler} />
            <MainButton title="Cancel" buttonColor={Colors.cancelButtonColor} onPress={cancelButtonHandler} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // screen: {
  //     // flex: 1,
  //     padding: 20,
  //     // alignItems: 'center'
  // },
  // buttonContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-around',
  //     marginVertical: 10
  // },
  photoUriInput: {
    width: '100%'
  },
  // button: {
  //     width: '40%',
  //     marginHorizontal: 10,
  //     marginVertical: 10
  // }, 
  // image: {
  //     height: '100%',
  //     width: '100%'
  // },
  // card: {
  //     height: 150,
  //     width: 150,
  //     marginHorizontal: 10,
  //     marginVertical: 10
  // },
  // header: {
  //     alignItems: 'center',
  //     marginTop: 10
  //  },
  // headerTitle: {
  //     color: 'black',
  //     fontSize: 24,
  //     fontWeight: 'bold',
  //     marginBottom: 10
  // },
  // header2Title: {
  //     color: 'black',
  //     fontSize: 20,
  //     fontWeight: 'bold',
  //     marginBottom: 10
  // },
  // photoListContainer: {
  //     height: 200
  // }
});

export default AddPhotos;