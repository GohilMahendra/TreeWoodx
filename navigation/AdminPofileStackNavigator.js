import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { 
    Text,
    View
 } from 'react-native';
import AddAdmin from '../screens/Admin/AddAdmin';
import AdminProfile from '../screens/Admin/AdminProfile';


const AdminPofileStackNavigator=()=>
{

    const ProfileStack=createStackNavigator()
    return(
       <ProfileStack.Navigator
       >
           <ProfileStack.Screen
           name="Admin_Profile"
           options={
               {
                   headerShown:false
               }
           }
           component={AdminProfile}
           >

           </ProfileStack.Screen>
           <ProfileStack.Screen
           name="AddAdmin"
           options={
               {
                   headerShown:false
               }
           }
           component={AddAdmin}
           >

           </ProfileStack.Screen>

       </ProfileStack.Navigator>
    )
}
export default AdminPofileStackNavigator