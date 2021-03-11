import React, {useContext, } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {LandingStackNavigator, MainStackNavigator,AdvancedSearchStackNavigator, AddItemStackNavigator ,ReviewSellerStackNavigator, MyItemStackNavigator, MessageStackNavigator, SignoutStackNavigator} from './StackNavigator'
import {FontAwesome, Entypo, MaterialIcons, Ionicons} from '@expo/vector-icons'
import {Context as AuthContext} from '../../context/AuthContext'
import Colors from '../../constants/Colors';
import DefaultStyles from '../../constants/defaultStyles';

const Tab = createBottomTabNavigator();

const CreateBottomTabNavigator = ({name, isSignedIn, component, Icon, iconName})=>{

    // const{ state:{isSignedIn} } = useContext(AuthContext)
    return    (
      <Tab.Navigator 
        screenOptions={{
          headerStyle: DefaultStyles.headerStyle,
        }}
        tabBarOptions={{activeTintColor: 'orange',
        inactiveTintColor: 'gray',
        }} >
        <Tab.Screen 
        name = {name}
        component={component}
       options={()=> ({
            tabBarIcon: ({focused, color})=> <Entypo name={iconName} size={25} focused={focused} color={color} />
        })}
        />


        {isSignedIn ? <>
            <Tab.Screen 
        name = "My Items"
        component={MyItemStackNavigator}
        options={()=> ({
            tabBarIcon: ({focused, color})=> <Entypo name='list' size={25} focused={focused} color={color} />
        })}
        />
            <Tab.Screen 
        name = "Messages"
        component={MessageStackNavigator}
        options={()=> ({
            tabBarIcon: ({focused, color})=> <Entypo name='chat' size={25} focused={focused} color={color} />
        })}
        />
        <Tab.Screen 
            name = "Add Item"
            component={AddItemStackNavigator}
            options={()=> ({
                tabBarIcon: ({focused, color})=> <Entypo name='add-to-list' size={25} focused={focused} color={color}/>
    })}
    />
    <Tab.Screen 
    name = "Signout"
    component={SignoutStackNavigator}
    options={()=> ({
        tabBarIcon: ({focused, color})=> <Entypo name='log-out' size={25} focused={focused} color={color}/>
    })}
    />
      </>  
    :     <>  
        {/* <Tab.Screen 
        name = "Advance Search"
        component={AdvancedSearchStackNavigator}
        options={()=> ({
            tabBarIcon: ()=> <Entypo name='magnifying-glass' size={25} />
        })}
        /> */}
     <Tab.Screen 
    name = "Sign In"
    component={MainStackNavigator}
    options={()=> ({
        tabBarIcon: ({focused, color})=> <Entypo name='login' size={25} focused={focused} color={color} />
    })}
    />
    </>
    }



    </Tab.Navigator>)

}

export default CreateBottomTabNavigator