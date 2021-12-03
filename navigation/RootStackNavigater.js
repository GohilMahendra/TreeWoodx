import React, { useEffect } from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Auth/Login";
import Admin from "../screens/Admin/Admin";
import Sign_Up from '../screens/Auth/Sign_Up';
import Home from "../screens/Home/Home";
import Payment from "../screens/Checkout/Payment";
import Checkout from "../screens/Checkout/Checkout";
import OrderDetails from '../screens/Checkout/OrderDetails';
const stack = createStackNavigator()

const RootStackNavigator = () => {


    return (

        <NavigationContainer>
            <stack.Navigator
                initialRouteName="Login"
            >
                <stack.Screen
                    name="Login"
                    options={{
                        headerShown: false
                    }}
                    component={Login}
                ></stack.Screen>

                <stack.Screen
                    name="Admin"
                    options={{
                        headerShown: false
                    }}
                    component={Admin}
                ></stack.Screen>


                <stack.Screen
                    name="Sign_Up"
                    options={{
                        headerShown: false
                    }}
                    component={Sign_Up}
                ></stack.Screen>

                <stack.Screen
                    name="Home"
                    options={{
                        headerShown: false
                    }}
                    component={Home}
                >
                </stack.Screen>

                <stack.Screen
                    name="Checkout"
                    options={{
                        headerShown: false
                    }}
                    component={Checkout}

                ></stack.Screen>

                <stack.Screen
                    name="OrderDetails"
                    options={{
                        headerShown: false
                    }}
                    component={OrderDetails}
                ></stack.Screen>
                 <stack.Screen
                    name="Payment"
                    options={{
                        headerShown: false
                    }}
                    component={Payment}
                ></stack.Screen>

            </stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStackNavigator