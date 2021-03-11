import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableWithoutFeedback } from 'react-native';
import ModalDropdown from '../downloads/ModalDropDown';
import Api from '../api/craftserver';
import SearchBar from '../components/SearchBar';
import Colors from '../constants/Colors';
import CategoryItems from '../components/CategoryItems';
import DefaultStyles from '../constants/defaultStyles';
import MainButton from '../components/MainButton';
import { useSelector, useDispatch } from 'react-redux';
import { searchForMostRecentItemsByCategoryMatchingSearchCriteria } from '../store/actions/Search'

const AdvancedSearch = props => {
    const [categoryNames, setCategoryNames] = useState([]);
    const [categories, setCategories] = useState([{ id: 0, name: 'Select category' }]);
    const [term, setTerm] = useState('');
    const [categoryIndex, setCategoryIndex] = useState(0);

    const categoryRef = useRef();

    const mostRecentItemsByCategoryMatchingSearchCriteria = useSelector(state => {
        return state.searchMostRecentItemsByCategoryMatchingSearchCriteriaReducer.mostRecentItemsByCategoryMatchingSearchCriteria;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            Api.get('/category')
                .then((response) => {
                    const responseCategories = response.data;

                    const newCategories = [{ id: 0, name: 'Select category' }, ...responseCategories];

                    setCategories(newCategories);

                    const newCategoryNames = newCategories.map(category => category.name);
                    setCategoryNames(newCategoryNames);

                    searchMostRecentItemsByCategoryMatchingSearchCriteria();
                })
                .catch(err => {
                    console.log(err);
                })

            searchMostRecentItemsByCategoryMatchingSearchCriteria();
        });
    }, []);

    const searchMostRecentItemsByCategoryMatchingSearchCriteria = () => {
        const searchTerm = term === '' ? '%25' : term;

        const searchCategoryId = categories[categoryIndex].id;

        const numberOfMostRecentItems = 5;

        dispatch(searchForMostRecentItemsByCategoryMatchingSearchCriteria(searchTerm, searchCategoryId, numberOfMostRecentItems));
    }

    const searchButtonHandler = () => {
        searchMostRecentItemsByCategoryMatchingSearchCriteria();
    }

    return (
        // <TouchableWithoutFeedback
        //     onPress={() => {
        //     Keyboard.dismiss();
        //     }}
        // >        
        <View style={DefaultStyles.screenContainer}>
            <ScrollView>
                <View style={DefaultStyles.searchBarOuterContainer}>
                    <SearchBar
                        term={term}
                        onTermChange={newTerm => setTerm(newTerm)}
                        onTermSubmit={() => searchMostRecentItemsByCategoryMatchingSearchCriteria()}
                    />
                </View>
                <View style={styles.labelAndModalContainer}>
                    <Text style={DefaultStyles.label}>
                        Category
                    </Text>

                    <View style={DefaultStyles.modal}>
                        <ModalDropdown
                            ref={categoryRef}
                            style={DefaultStyles.modalField}
                            textStyle={DefaultStyles.modalFieldText}
                            options={categoryNames}
                            defaultValue={'Select category'}
                            dropdownTextStyle={DefaultStyles.modalDropdownText}
                            dropdownTextHighlightStyle={DefaultStyles.modalDropdownHighlight}
                            onSelect={(idx, value) => setCategoryIndex(idx)}
                        />
                    </View>
                </View>

                <View style={DefaultStyles.buttonContainer}>
                    <MainButton title="Search" buttonColor={Colors.defaultButtonColor} onPress={searchButtonHandler} />
                </View>

                <Text style={DefaultStyles.title}>
                    Search Results
                </Text>

                {
                    mostRecentItemsByCategoryMatchingSearchCriteria.map((category, i) => {
                        return (
                            <CategoryItems
                                key={category.category.name}
                                category={category} />
                        );
                    })
                }
            </ScrollView>
        </View>
        /* </TouchableWithoutFeedback> */
    );
};

const styles = StyleSheet.create({
    // screen: {
    //     flex: 1,
    //     paddingTop: 20,
    //     paddingLeft: 20,
    //     paddingBottom: 20,
    //     paddingRight: 10,
    //     // alignItems: 'center',
    //     // justifyContent: 'flex-start'
    //     backgroundColor: '#F5EEF8'
    // },
    // searchBar: {
    //     marginBottom: 20,
    // },
    // modalFieldTextStyle: {
    //     backgroundColor: Colors.primary,
    //     color: Colors.buttonText,
    //     fontSize: 18,
    //     justifyContent: 'center'
    // },
    // modalDropdownText: {
    //     backgroundColor: Colors.secondary,
    //     color: Colors.dropdownText,
    //     fontSize: 18
    // },
    // modalDropdownHighlight: {
    //     backgroundColor: Colors.primary,
    //     color: Colors.buttonText
    // },
    categoryContainer: {
        // height: 90,
        width: '100%',
        // flexDirection: 'row',
        justifyContent: 'space-around',
        // marginVertical: 10,
        // alignItems: 'center',
    },
    // label: {
    //     fontSize: 18,
    //     marginBottom: 5
    // },
    // modal: {
    //     height: 50,
    //     marginBottom: 10
    // },
    // heading2: {
    //     fontSize: 20,
    //     marginTop: 10,
    //     marginBottom: 10,
    //     fontWeight: 'bold',
    // }
    // buttonContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     marginVertical: 10
    // },
    // button: {
    //     width: '60%',
    // },    
});

export default AdvancedSearch;