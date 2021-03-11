import React, {useContext, } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {LandingStackNavigator, MainStackNavigator,AdvancedSearchStackNavigator, AddItemStackNavigator ,ReviewSellerStackNavigator, MyItemStackNavigator, MessageStackNavigator, SignoutStackNavigator, AnnouncementsStackNavigator, ProfileStackNavigator} from './StackNavigator'
import {FontAwesome, Entypo, MaterialIcons, Ionicons} from '@expo/vector-icons'
import {Context as AuthContext} from '../../context/AuthContext'
import CreateBottomTabNavigator from './createBottomNavigator'
const Tab = createBottomTabNavigator();

const LandingTab = ()=>{

    const{ state:{isSignedIn} } = useContext(AuthContext)
    return    (
    <CreateBottomTabNavigator name='Home'  component={LandingStackNavigator} Icon='MaterialIcons' iconName='home' isSignedIn={isSignedIn} />           
        )
}
const ReviewSellerTab = ()=>{
    const{ state:{isSignedIn} } = useContext(AuthContext)
    return    (
    <CreateBottomTabNavigator name='Review'  component={ReviewSellerStackNavigator} Icon='MaterialIcons' iconName='new-message' isSignedIn={isSignedIn} />           
        )
}
const MessageTab = ()=>{
    const{ state:{isSignedIn} } = useContext(AuthContext)
    return    (
    <CreateBottomTabNavigator name='Message'  component={MessageStackNavigator} Icon='Entypo' iconName='chat' isSignedIn={isSignedIn} />           
        )
}
const AdvanceSearchTab = ()=>{
    const{ state:{isSignedIn} } = useContext(AuthContext)
    return    (
    <CreateBottomTabNavigator name='Advance Search'  component={AdvancedSearchStackNavigator} Icon='FontAwesome' iconName='magnifying-glass' isSignedIn={isSignedIn} />           
        )
}
const AnnouncementsTab = ()=>{
    const{ state:{isSignedIn} } = useContext(AuthContext)
    return    (
    <CreateBottomTabNavigator name='Announcements'  component={AnnouncementsStackNavigator} Icon='FontAwesome' iconName='news' isSignedIn={isSignedIn} />           
        )
}
const ProfileTab = ()=>{
    const{ state:{isSignedIn} } = useContext(AuthContext)
    return    (
    <CreateBottomTabNavigator name='Profile'  component={ProfileStackNavigator} Icon='FontAwesome' iconName='user' isSignedIn={isSignedIn} />           
        )
}



export {
    LandingTab,
    ReviewSellerTab,
    MessageTab,
    AdvanceSearchTab,
   ProfileTab,
   AnnouncementsTab
}