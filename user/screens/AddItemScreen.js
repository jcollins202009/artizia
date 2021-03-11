import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
  FlatList,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ModalDropdown from '../downloads/ModalDropDown';
import { navigate } from '../RootNavigation'
import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/defaultStyles'
import AddPhotos from './AddPhotos';
import Card from '../components/Card';
// import { TouchableNativeFeedback, 
//         TouchableHighlight, 
//         TouchableOpacity, 
//         TouchableWithoutFeedback } from 'react-native-gesture-handler';  
import Api from '../api/craftserver';

const Categories = [];
const CategoryIds = [];
let categoryID = '';
let categoryRows = [];
// main URL of server
//let serverURL = "http://b9c057818339.ngrok.io"
// get categories from datbase
// the base URL should come from env var
// let serverURL = "http://localhost:3000/category"
// let categoryURL = serverURL + "/category"
//console.log('categoryURL: ', categoryURL)

Api.get('/category')
  // .then((resp) => resp.json())
  .then(response => {
    categoryRows = response.data
    //console.log('response data in add item: ', categoryRows)
    //categoryRows.forEach((row) => console.log('category id: ', row.id, ' category name: ', row.name))
    categoryRows.forEach((row) => {
      Categories.push(row.name)
      CategoryIds.push(row.id)
    })
    //console.log('Categories inside: ', Categories)
  })
  .catch(error => {
    console.log(error)
  })

//const Categories = [];
// 'Crochet', 'Sewing', 'Painting', 'Woodwork', 'Photography', 'Metalwork', 'Bath and Beauty', 'Pets', 'Office'];

let SubCategories = [];
let subcategoryIds = [];
let subcategoryID = '';
let subcategoryRows = [];

// this should eventually come from database
// const subCats = [
//   {
//     "cat": "Crochet",
//     "subcats": ['Toques', 'Gloves and Mittens', 'Scarves', 'Shawls']
//   },
//   {
//     "cat": "Sewing",
//     "subcats": ['Quilts', 'Towels', 'Skirts']
//   },
//   {
//     "cat": "Painting",
//     "subcats": ['Landscape', 'Abstract', 'Impressionism', 'Portrait']
//   },
//   {
//     "cat": "Woodwork",
//     "subcats": ['Bowls', 'Tables', 'Carving', 'Kitchen']
//   }
// ];

// let subCatArr = [];

// for (let i = 0; i < subCats.length; i++) {
//   subCatArr = [...subCats[i].subcats];
//   //console.log(subCats[i].subcats)
//   //console.log('subCat: ', i, " ", subCatArr)
// }

let defaultSubcatTitle = 'Select subcat for...'

const AddItemScreen = props => {

  const [shortDesc, setShortDesc] = useState();
  const [longDesc, setLongDesc] = useState();
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [addPhoto, setAddPhoto] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isAddPhotoModalVisible, setIsAddPhotoModalVisible] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState('');
  const [newPhotos, setNewPhotos] = useState([]);

  const shortD = useRef();
  const longD = useRef();
  const sellPrice = useRef();
  const itemCategory = useRef();
  const itemSubcategory = useRef();

  useEffect(() => {
    props.navigation.addListener('focus', () => {
        setShortDesc('');
        setLongDesc('');
        setPrice('');
        setAddPhoto('');
        setCategory('');
        setSubcategory('');
        setCurrentImageUri('');
        setPhotos([]);
        setNewPhotos([]);
    });
  }, []);

  const priceInputHandler = inputText => {
    // this prevents an error when deleting all entered numbers
    if (inputText) {
      // replace any non-number, or decimal point, with an empty string
      let newprice = inputText.replace(/[^0-9\.]/g, '');
      // limit input to 2 decimal places
      let with2Decimals = newprice.match(/^-?\d+(?:\.\d{0,2})?/)[0]
      // only numbers, decimal point and two decimal places
      setPrice(inputText.replace(/[^0-9\.]/g, '').match(/^-?\d+(?:\.\d{0,2})?/)[0])
    } else {
      // needed this to be able to delete last digit
      setPrice(inputText)
    }
  };

  const categorySelectHandler = (idx, value) => {
    //console.log('idx: ', idx, ' value: ', value);
    categoryID = CategoryIds[idx];
    //console.log('categoryID: ', categoryID, ' idx: ', idx, ' value: ', value)
    setCategory(value);

    // load up subcat array with subcats matching catid from DB
    //let subcatServerURL = "http://localhost:3000/subcategory/bycategory/" + categoryID
    //let subcategoryURL = serverURL + "/subcategory/bycategory/" + categoryID
    let subcategoryURL = "/subcategory/bycategory/" + categoryID
    console.log('subcatURL: ', subcategoryURL)
    //console.log('subcategoryURL: ', subcategoryURL)
    //let subcatServerURL = "http://6685b309427b.ngrok.io/subcategory/bycategory/" + categoryID
    //console.log('subcatServerURL: ', subcatServerURL)
    //console.log('resetting SubCategories array')
    SubCategories = [];
    subcategoryIds = [];

    //fetch(subcategoryURL)
    Api.get(subcategoryURL)
      //.then((resp) => resp.json())
      //.then(data => {
        .then(response => {
        //subcategoryRows = data
        subcategoryRows = response.data
        // console.log('subcategory response data in add item: ', subcategoryRows)
        subcategoryRows.forEach((row) => console.log('subcategory id: ', row.id, ' subcategory name: ', row.name))
        subcategoryRows.forEach((row) => {
          SubCategories.push(row.name)
          subcategoryIds.push(row.id)
        })
        //console.log('Subcategories inside: ', SubCategories)
        defaultSubcatTitle = value;
        //console.log('defaultSubcatTitle in fetch then: ', defaultSubcatTitle)
        setSubcategory(defaultSubcatTitle);
      })
      .catch(error => {
        console.log(error)
      })

    //SubCategories = subCats[idx].subcats;
    //defaultSubcatTitle = subCats[idx].cat;
    defaultSubcatTitle = value;
    //setSubcategory(SubCategories);
    //console.log('defaultSubcatTitle: ', defaultSubcatTitle)
    setSubcategory(defaultSubcatTitle);
    //itemSubcategory.select(0)
  };

  const subcategorySelectHandler = (idx, value) => {
    //console.log('subcat idx: ', idx, ' value: ', value);
    //console.log('subCategory: ', value, ' idx: ', idx)

    subcategoryID = subcategoryIds[idx];

    setSubcategory(value);
  };

  const addPhotoHandler = props => {
    console.log('add photo button pressed');
    setIsAddPhotoModalVisible(true);
  }

  const saveButtonHandler = props => {
    //console.log('saveButton: ', shortDesc, longDesc, price, category, subcategory)
    let isError = false;
    if (!shortDesc) {
      Alert.alert(
        "Must enter a short description", "",
        [{ text: "OK", onPress: () => { shortD.current.focus() } }]
      );
      isError = true;
    } else if (!longDesc) {
      Alert.alert(
        "Must enter a long description", "",
        [{ text: "OK", onPress: () => { longD.current.focus() } }]
      );
      isError = true;
    } else if (!price) {
      Alert.alert(
        "Must enter a price", "",
        [{ text: "OK", onPress: () => { sellPrice.current.focus() } }]
      );
      isError = true;
    } else if (!category) {
      Alert.alert("Must select a category", "", [{ text: "Ok", onPress: () => { } }]);
      isError = true;
    } else if (!subcategory || subcategory === category) {
      Alert.alert("Must select a subcategory", "", [{ text: "Ok", onPress: () => { } }]);
      isError = true;
    } else if (photos.length === 0) {
      Alert.alert("You must add a photo", "", [{ text: "Ok", onPress: () => { } }]);
      isError = true;
    }

    if (isError) return;

    console.log("all input data looks ok");
    //console.log('userid :', req.user.idusers)

    // save item data in object
    let currentDate = new Date();
    console.log('current date: ', currentDate)

    const itemData = {
      name: shortDesc,
      categoryId: categoryID,
      subcategoryId: subcategoryID,
      createdDate: currentDate,
      drop: longDesc,
      price: price,
      userId: 0,
      desc: longDesc,
    }

    console.log('itemData: ', itemData)

    // save item data
    const itemHdr = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    console.log('saving item data to db')
    Api.post('/item/create', itemData, itemHdr)
      .then((response) => {
        // console.log('item post response: ', response);
        // console.log('item created id', response.data.data.id)
        savePhotosForItems(response.data.data.id)
          .then(() => {
            navigate('Home');
          });
      })
      .catch((err) => {
        console.log('Error from item create api.post: ', err)
        navigate('Home');
      });

    // navigate('Home');
  }

  const savePhotosForItems = async (itemId) => {
    for (const [i, photo] of photos.entries()) {

      console.log('photo index: ', i);
      const photoData = new FormData();

      photoData.append('fileData', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: `${i}.jpg`
      });

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };

      await Api.post(`/api/uploadImage/${itemId}`, photoData, config);

    };

  }

  return (


    <ScrollView>
      {/* get rid of keyboard on iOS when click outside
    of input area, works for Android as well but
    Android keyboard can be dismissed with checkmark key */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >

        <View style={DefaultStyles.screenContainer}>

          {/* <View> */}
          <Text style={DefaultStyles.label} >Short Description</Text>
          {/* </View> */}
          <TextInput
            ref={shortD}
            style={{ ...DefaultStyles.input, ...DefaultStyles.inputText }}
            placeholder=" Item short description"
            placeholderTextColor={Colors.placeholderText}
            onChangeText={text => setShortDesc(text)}
            value={shortDesc}
          />
          {/* <View> */}
          <Text style={DefaultStyles.label} >Detailed Description</Text>
          {/* </View> */}
          <TextInput
            ref={longD}
            style={{ ...DefaultStyles.input, ...DefaultStyles.inputText, ...DefaultStyles.multiLineInput }}
            maxLength={256}
            multiline={true}
            numberOfLines={10}
            placeholder=" Item detailed description"
            placeholderTextColor={Colors.placeholderText}
            onChangeText={text => setLongDesc(text)}
            value={longDesc}
          />
          {/* <View> */}
          <Text style={DefaultStyles.label} >Price</Text>
          {/* </View> */}
          {/* <View style={styles.rowContainer}> */}
          <TextInput
            ref={sellPrice}
            // style={[styles.textinput, styles.priceInput]}
            style={{ ...DefaultStyles.input, ...DefaultStyles.inputText, ...DefaultStyles.priceInput }}
            placeholder=" Price"
            placeholderTextColor={Colors.placeholderText}
            keyboardType='numeric'
            onChangeText={text => priceInputHandler(text)}
            value={price}
          />
          {/* </View> */}
          {/* <View> */}
          {/* <Text style={DefaultStyles.label} >Category</Text> */}
          {/* </View> */}
          {/* <View style={[styles.categoryContainer]}> */}
          <View style={styles.labelAndModalContainer}>
            <Text style={DefaultStyles.label}>
              Category
          </Text>

            <View style={DefaultStyles.modal}>
              <ModalDropdown
                ref={itemCategory}
                style={DefaultStyles.modalField}
                textStyle={DefaultStyles.modalFieldText}
                options={Categories}
                defaultValue={'Select category'}
                dropdownTextStyle={DefaultStyles.modalDropdownText}
                dropdownTextHighlightStyle={DefaultStyles.modalDropdownHighlight}
                onSelect={(idx, value) => categorySelectHandler(idx, value)}
              />
            </View>
          </View>

          <View style={styles.labelAndModalContainer}>
            <Text style={DefaultStyles.label}>
              Subcategory
          </Text>

            <View style={DefaultStyles.modal}>
              <ModalDropdown
                ref={itemSubcategory}
                style={DefaultStyles.modalField}
                textStyle={DefaultStyles.modalFieldText}
                options={SubCategories}
                defaultValue={defaultSubcatTitle}
                dropdownTextStyle={DefaultStyles.modalDropdownText}
                dropdownTextHighlightStyle={DefaultStyles.modalDropdownHighlight}
                onSelect={(idx, value) => subcategorySelectHandler(idx, value)}
              />
            </View>
          </View>

          {/* </View> */}
          <View style={DefaultStyles.rowContainer}>
            <Text style={DefaultStyles.label} >Photos  </Text>
            <TouchableOpacity activeOpacity={0.4} onPress={addPhotoHandler}>
              <Ionicons name="add-circle" size={24} color={Colors.addCircle} />
            </TouchableOpacity>
            <AddPhotos
              visible={isAddPhotoModalVisible}
              photos={photos}
              setPhotos={setPhotos}
              setIsAddPhotoModalVisible={setIsAddPhotoModalVisible}
              currentImageUri={currentImageUri}
              setCurrentImageUri={setCurrentImageUri}
              newPhotos={newPhotos}
              setNewPhotos={setNewPhotos}
            />
          </View>

          {photos.length === 0 ?
            (
              <View style={DefaultStyles.photoContainer}>
                <Image source={require('../assets/placeholder.png')} />
                <Image source={require('../assets/placeholder.png')} />
                <Image source={require('../assets/placeholder.png')} />
              </View>
            ) :
            (
              <View style={styles.imageFlatListContainer}>
                <FlatList
                  horizontal
                  data={photos}
                  keyExtractor={photo => photo.uri}
                  renderItem={photo => (
                    <View onStartShouldSetResponder={() => true}>
                      <Card>
                        <View style={{ ...DefaultStyles.imageInCardContainer, height: '100%' }}>
                          <Image style={DefaultStyles.imageInCard} source={{ uri: photo.item.uri }} />
                        </View>
                      </Card>
                    </View>
                  )
                  }
                />
              </View>

            )
          }


          <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
            <MainButton title="Save" buttonColor={Colors.saveButtonColor} onPress={saveButtonHandler} />
          </View>


          <View style={{ ...DefaultStyles.buttonContainer, justifyContent: 'center' }}>
            <MainButton title="Cancel" buttonColor={Colors.cancelButtonColor} onPress={() => navigate('Home')} />
          </View>

          {/* <View style={DefaultStyles.buttonContainer}>
            <View style={styles.buttonSave}>
              <MainButton title="Save" buttonColor={Colors.defaultButtonColor} onPress={saveButtonHandler} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonSave}>
              <MainButton title="Cancel" buttonColor={Colors.cancelButtonColor} onPress={() => navigate('Home')} />
            </View>

          </View> */}

        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  // screen: {
  //   flex: 1,
  //   padding: 10,
  //   justifyContent: 'flex-start' // default
  // },
  // dropdown_1: {
  //   flex: 1,
  //   top: 32,
  //   left: 8
  // },
  // textinput: {
  //   height: 30,
  //   width: '100%',
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   marginVertical: 10,
  //   textAlign: 'left'
  // },
  // multilineInput: {
  //   height: 80,
  //   width: '100%',
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   marginVertical: 10
  // },
  // priceInput: {
  //   width: '40%',
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start'
  // },
  // categoryContainer: {
  //   height: 30,
  //   width: '100%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   marginVertical: 10,
  // },
  // dropcat: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginHorizontal: 5,
  //   fontSize: 15,
  //   backgroundColor: Colors.primary,
  //   color: Colors.buttonText,
  //   paddingHorizontal: 10,
  //   borderRadius: 4,
  // },
  // dropdownText: {
  //   backgroundColor: Colors.secondary,
  //   color: Colors.dropdownText,
  //   fontSize: 15
  // },
  // dropdownHighlight: {
  //   backgroundColor: Colors.primary,
  //   color: Colors.buttonText
  // },
  // textStyle: {
  //   backgroundColor: Colors.primary,
  //   color: Colors.buttonText,
  //   fontSize: 15,
  //   justifyContent: 'center'
  // },
  // photoContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  // },
  // photoListContainer: {
  //   height: 130
  // },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginVertical: 10
  // },
  // buttonSave: {
  //   width: '60%',
  // },
  // buttonSold: {
  //   color: 'red'
  // },
  // rowContainer: {
  //   flexDirection: 'row'
  // },
  // card: {
  //   height: 100,
  //   width: 100,
  //   marginHorizontal: 10,
  //   marginVertical: 10
  // },
  // image: {
  //   height: '100%',
  //   width: '100%'
  // }
});

export default AddItemScreen;