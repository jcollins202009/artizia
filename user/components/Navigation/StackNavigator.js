import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from '@expo/vector-icons'
import Profile from '../../screens/Profile'
import Landing from '../../screens/Landing'
import Signup from '../../screens/Signup'
import Signin from '../../screens/Signin'
import ReviewSeller from '../../screens/ReviewSellerScreen'
import CreateStackNavigator from './createStackNavigator'
import AddItem from '../../screens/AddItemScreen'
import MyItem from '../../screens/MyItemScreen'
import Announcements from '../../screens/Announcements'
import Signout from '../../screens/Signout'
import ItemDetail from '../../screens/ItemDetail'
import AdvancedSearch from "../../screens/AdvancedSearch";
import Colors from '../../constants/Colors'
import EditProfile from '../../screens/EditProfile'
import MessageList from '../../screens/MessageList'
import MessageDetail from '../../screens/MessageDetail';
import DefaultStyles from '../../constants/defaultStyles';
import { Image } from 'react-native';


const Stack = createStackNavigator();
const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: DefaultStyles.headerStyle,
      headerTitleStyle: DefaultStyles.headerTitleStyle,
      headerTintColor: 'white'
    }}>
      <Stack.Screen name="Sign In" component={Signin}
        options={{
          headerRight: () => <Feather name='menu' size={25} style={DefaultStyles.hamburgerMenu} onPress={() => navigation.openDrawer()} />,
          headerLeft: () => <Image
            style={DefaultStyles.logo}
            source={require('../../assets/logo.png')}
          />
        }}
      />
      <Stack.Screen name="Sign Up" component={Signup}
        options={{
          headerRight: () => <Feather name='menu' size={25} style={DefaultStyles.hamburgerMenu} onPress={() => navigation.openDrawer()} />,
          // headerLeft: () => <Image
          //   style={DefaultStyles.logo}
          //   source={require('../../assets/logo.png')}
          // />
        }}
      />

    </Stack.Navigator >
  );
}

const LandingStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: DefaultStyles.headerStyle,
      headerTitleStyle: DefaultStyles.headerTitleStyle,
      headerTintColor: 'white',
      headerBackTitle: 'Back'
    }}
    >
      <Stack.Screen name="Artizia" component={Landing}
        options={{
          headerRight: () => <Feather name='menu' size={25} style={DefaultStyles.hamburgerMenu} onPress={() => navigation.openDrawer()} />,
          headerLeft: () => <Image
            style={DefaultStyles.logo}
            source={require('../../assets/logo.png')}
          />

        }} />
      <Stack.Screen name="Item Detail" component={ItemDetail}
        options={{
          headerRight: () => <Feather name='menu' size={25} style={DefaultStyles.hamburgerMenu} onPress={() => navigation.openDrawer()} />,
          // headerLeft: () => <Image
          //   style={{ width: 50, height: 50 }}
          //   source={require('../../assets/logo.png')}
          // />
        }} />
    </Stack.Navigator>
  );
}

const ReviewSellerStackNavigator = ({ navigation }) => {
  return (
    <CreateStackNavigator navigation={navigation} name="Review Seller" component={ReviewSeller} />
  );
}
const ProfileStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: DefaultStyles.headerStyle,
      headerTitleStyle: DefaultStyles.headerTitleStyle,
      headerTintColor: 'white'
    }}>
      <Stack.Screen name="Profile" component={Profile}
        options={{
          headerRight: () => <Feather name='menu' size={25} style={DefaultStyles.hamburgerMenu} onPress={() => navigation.openDrawer()} />,
          headerLeft: () => <Image
            style={DefaultStyles.logo}
            source={require('../../assets/logo.png')}
          />
        }} />
      <Stack.Screen name="Edit Profile" component={EditProfile}
        options={{
          headerRight: () => <Feather name='menu' size={25} style={DefaultStyles.hamburgerMenu} onPress={() => navigation.openDrawer()} />,
          // headerLeft: () => <Image
          //   style={DefaultStyles.logo}
          //   source={require('../../assets/logo.png')}
          // />
        }} />

    </Stack.Navigator>
  );
}
const AddItemStackNavigator = ({ navigation }) => {
  return (
    <CreateStackNavigator navigation={navigation} name="Add Item" component={AddItem} />
  );
}

const MyItemStackNavigator = ({ navigation }) => {
  return (
    <CreateStackNavigator navigation={navigation} name="My Items" component={MyItem} />
  );
}
const AnnouncementsStackNavigator = ({ navigation }) => {
  return (
    <CreateStackNavigator navigation={navigation} name="Announcements" component={Announcements} />
  );
}

const SignoutStackNavigator = ({ navigation }) => {
  return (
    <CreateStackNavigator navigation={navigation} name="Signout" component={Signout} />
  );
}
//   const ItemDetailStackNavigator = ({navigation}) => {
//     return (
// <CreateStackNavigator navigation={navigation} name="ItemDetail" component={ItemDetail} />
//     );
//   }

const AdvancedSearchStackNavigator = ({ navigation }) => {
  return (
    <CreateStackNavigator navigation={navigation} name="Advanced Search" component={AdvancedSearch} />
  );
}

const MessageStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: DefaultStyles.headerStyle,
      headerTitleStyle: DefaultStyles.headerTitleStyle,
      headerTintColor: 'white'
    }}>
      <Stack.Screen name="Message List" component={MessageList}
        options={{
          headerRight: () => <Feather name='menu' size={25} style={DefaultStyles.hamburgerMenu} onPress={() => navigation.openDrawer()} />,
          headerLeft: () => <Image
            style={DefaultStyles.logo}
            source={require('../../assets/logo.png')}
          />
        }} />
      <Stack.Screen name="Messages" component={MessageDetail}
        options={{
          headerRight: () => <Feather name='menu' size={25} style={DefaultStyles.hamburgerMenu} onPress={() => navigation.openDrawer()} />,
          // headerLeft: () => <Image
          //   style={{ width: 50, height: 50 }}
          //   source={require('../../assets/logo.png')}
          // />
        }} />
    </Stack.Navigator>
  );
}


export {
  MainStackNavigator,
  LandingStackNavigator,
  ReviewSellerStackNavigator,
  ProfileStackNavigator,
  AddItemStackNavigator,
  MyItemStackNavigator,
  SignoutStackNavigator,
  AnnouncementsStackNavigator,
  AdvancedSearchStackNavigator,
  MessageStackNavigator

};