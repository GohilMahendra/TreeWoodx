import React, { useEffect } from 'react';
import Home from "../screens/Home";

import Login   from "../screens/Login";
import {NavigationContainer  } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Admin from "../screens/Admin";

import Checkout from '../screens/Checkout';
import Payment from "../screens/Payment";
import Sign_Up from '../screens/Sign_Up';

const stack=createStackNavigator()



const RootStackNavigator=()=>
{


    return(

    <NavigationContainer>
    <stack.Navigator
    initialRouteName="Login"
    
    >
<stack.Screen
name="Login"
options={{
  headerShown:false
}}
component={Login}
></stack.Screen>

<stack.Screen
name="Admin"
options={{
  headerShown:false
}}
component={Admin}
></stack.Screen>

<stack.Screen
name="Sign_Up"
options={{
  headerShown:false
}}
component={Sign_Up}
></stack.Screen>

<stack.Screen
name="Home"
options={{
  headerShown:false
}}
component={Home}
>

</stack.Screen>


<stack.Screen
  name="Checkout"
  options={{
    headerShown:false
  }}
  component={Checkout}
  
  ></stack.Screen>
  
<stack.Screen
name="Payment"
options={{
  headerShown:false
}}
component={Payment}
></stack.Screen>
    </stack.Navigator>
    </NavigationContainer>
    )
}

export default RootStackNavigator