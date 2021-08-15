import React, { useEffect } from "react";
import { View,Dimensions ,Image,Text, ScrollView} from "react-native";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

import { fonts } from "../constants/fonts";
import { colorsArray } from "../constants/colors";

import Admin_ProductScreen from "./Admin_ProductScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Admin_editProd=({navigation})=>
{

    const editNaviagter=createStackNavigator()

    return(
      
        <editNaviagter.Navigator>
            <editNaviagter.Screen
            name="Admin_ProductScreen"
            component={Admin_ProductScreen}
            >

            </editNaviagter.Screen>
         
        </editNaviagter.Navigator>
    )
}
export default Admin_editProd