import React, {useContext} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer"
import {Context as AuthContext} from '../../context/AuthContext'
import {FontAwesome, Entypo, AntDesign, MaterialIcons, Ionicons} from '@expo/vector-icons'
import MessageList from '../../screens/MessageList'
import {LandingStackNavigator, 
    MainStackNavigator,
    ProfileStackNavigator, 
    AddItemStackNavigator ,
    ReviewSellerStackNavigator, 
    MyItemStackNavigator, 
    AnnouncementsStackNavigator, 
    SignoutStackNavigator,
    MessageStackNavigator,
    AdvancedSearchStackNavigator
} from './StackNavigator'
import {LandingTab, ProfileTab, ReviewSellerTab, AnnouncementsTab, AdvanceSearchTab} from './BottomNavigator'


const Drawer = createDrawerNavigator()

const DrawerNavigator = ()=> {
    const{ state:{isSignedIn} } = useContext(AuthContext)
   

    if (!isSignedIn) {
        return (
        
            <Drawer.Navigator  drawerPosition="right">
                <Drawer.Screen name='Home' component={LandingTab} 
                       options={()=> ({
                        drawerIcon: ()=> <FontAwesome name='home' size={25} />
                    })} />
{/* 
                <Drawer.Screen name= 'Signin' component={SigininTab} 
                        options={()=> ({
                        drawerIcon: ()=> <Entypo name='login' size={25} />
                    })}/>             */}

                 <Drawer.Screen name= 'Advanced Search' component={AdvanceSearchTab}
                      options={()=> ({
                        drawerIcon: ()=> <Entypo name='magnifying-glass' size={25} />
                    })} />
                <Drawer.Screen name= 'Review Seller' component={ReviewSellerTab}
                        options={()=> ({
                            drawerIcon: ()=> <Entypo name='new-message' size={25} />
                        })} />

                <Drawer.Screen name= 'Announcements' component={AnnouncementsTab} 
                        options={()=> ({
                            drawerIcon: ()=> <Entypo name='news' size={25} />
                        })}/>            
            </Drawer.Navigator>    
        )
} else {
    return (
        
        <Drawer.Navigator drawerPosition="right">
            <Drawer.Screen name='Home' component={LandingTab}
                options={()=> ({
                drawerIcon: ()=> <FontAwesome name='home' size={25} />
            })} />

            <Drawer.Screen name = 'Profile' component={ProfileTab} 
                options={()=> ({
                drawerIcon: ()=> <AntDesign name='profile' size={25} />
            })}/>
            <Drawer.Screen name= 'Advanced Search' component={AdvanceSearchTab}
              options={()=> ({
                drawerIcon: ()=> <Entypo name='magnifying-glass' size={25} />
            })} />             
            <Drawer.Screen name= 'Review Seller' component={ReviewSellerTab}
            options={()=> ({
                drawerIcon: ()=> <Entypo name='new-message' size={25} />
            })}
             />
            <Drawer.Screen name= 'Announcements' component={AnnouncementsTab} 
                    options={()=> ({
                        drawerIcon: ()=> <Entypo name='news' size={25} />
                    })}/>
            <Drawer.Screen name= 'Sign Out' component={SignoutStackNavigator}
              options={()=> ({
                drawerIcon: ()=> <Entypo name='log-out' size={25} />
            })} />
          
         
            
        </Drawer.Navigator>

    )
}
}

export default DrawerNavigator