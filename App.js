/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import firestore from "@react-native-firebase/firestore";
import {  
View,
Text,
Image,
SafeAreaView

} from "react-native";
import Home from "./screens/Home";

import Login   from "./screens/Login";
import {NavigationContainer  } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "./screens/Cart";
import Admin from "./screens/Admin";

import Checkout from './screens/Checkout';
import PayView from './screens/PayView';
import Sign_Up from './screens/Sign_Up';
import Paypal from './screens/Paypal';
import { Provider } from 'react-redux';
import store from './redux/store/store';
const stack=createStackNavigator()
const App=()=>
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
name="Paypal"
options={{
  headerShown:false
}}
component={Paypal}
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
name="PayView"
options={{
  headerShown:false
}}
component={PayView}
>

</stack.Screen>


<stack.Screen
  name="Checkout"
  options={{
    headerShown:false
  }}
  component={Checkout}
  
  ></stack.Screen>
    </stack.Navigator>
    </NavigationContainer>
  
  )
}
export default App;
