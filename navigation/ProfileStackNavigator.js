import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { 
    View
 } from 'react-native';
import UserOrders from '../screens/Profile/UserOrders';
import User_profile from '../screens/Profile/User_profile';
const ProfileStackNavigator=({naviagation})=>
{

    const ProfileStack=createStackNavigator()

    return(
        <ProfileStack.Navigator
        initialRouteName="Profile"
        >
            <ProfileStack.Screen
            name="Profile"
            options={{
                headerLeft:null,
                headerTitleAlign:'center'
            }}
            component={User_profile}
            ></ProfileStack.Screen>
             <ProfileStack.Screen
            name="UserOrders"
            options={{
               
                headerTitleAlign:'center'
            }}
            component={UserOrders}
            ></ProfileStack.Screen>

        </ProfileStack.Navigator>
    )


}

export default ProfileStackNavigator