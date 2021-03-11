import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./components/Navigation/DrawerNavigator";
import { navigationRef } from './RootNavigation';
import { Provider as AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reviewSellerReducer } from './store/reducers/ReviewSeller';
import {deletemyItemReducer } from './store/reducers/DeleteMyItem';
import {userItemsReducer} from './store/reducers/DisplayMyItem';
import { searchTermReducer, searchMostRecentItemsByCategoryMatchingSearchTermReducer, searchMostRecentItemsByCategoryMatchingSearchCriteriaReducer } from './store/reducers/Search';
import thunkMiddleware from 'redux-thunk';
import { Provider as AnnouncementsProvider } from './context/AnnouncementContext';
import * as Notifications from 'expo-notifications';
import { enableScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

const rootReducer = combineReducers({
  //deletemyItemReducer,
   reviewSellerReducer,
   userItemsReducer,
  searchTermReducer, 
  searchMostRecentItemsByCategoryMatchingSearchTermReducer,
  searchMostRecentItemsByCategoryMatchingSearchCriteriaReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={console.warn} />
  }

  return (
    <AnnouncementsProvider>
    <AuthProvider>
      <Provider store={store}>
        <NavigationContainer
          ref={navigationRef}
        >
          <DrawerNavigator />
        </NavigationContainer>
      </Provider>
    </AuthProvider>
    </AnnouncementsProvider>
  );
}

// const App = () => {
//   return (
//     <NavigationContainer>
//       <DrawerNavigator />
//     </NavigationContainer>
//   );
// }
// export default App;

// export default function App() {
//   return (
//     <View style={ styles.screens }>
//       <Landing />
//       <Signup />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screens: {
//     flex: 1
//   }

// });
