
import React from "react";
import { 
View,Text,StyleSheet,Image,SafeAreaView, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView

 } from "react-native";

import  FontAwesome5  from "react-native-vector-icons/FontAwesome5";
import { categories } from "../data/categories";
import { chairdata } from "../data/chairdata";
import { beddata } from "../data/beddata";
import {  NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import database from "@react-native-firebase/database";
   import {  createStackNavigator, HeaderTitle} from "@react-navigation/stack";
import Home_screen from "./Home_screen";
import product from "./poduct";
import Product_list from "./Product_list";
import Comments from "./Comments";
import Search from "./Search";
import VisionSearch from "./VisionSearch";
const newnav=createStackNavigator()
   const HomeView=({navigation})=>
{


    return(
        <newnav.Navigator
        initialRouteName="Homescreen"
      
        screenOptions=
        {
            {
                headerTransparent:true
            }
        }
     
        >
        <newnav.Screen
        
        options=
        {
            {
                headerShown:false
            }
        }
        name="Homescreen"
        component={Home_screen}
  
          
  />
        <newnav.Screen
        
        options={{
          headerTitle:'',
          
         }}
        
        name="product"
        component={product}
        >

        </newnav.Screen>
        <newnav.Screen
        
        options={{
          headerTitleAlign:'center',
          
         }}
        
        name="Comments"
        component={Comments}
        />
        
        <newnav.Screen
        
        options={{
          headerTitleAlign:'center'
         ,headerShown:false}}
        
        name="VisionSearch"
        component={VisionSearch}
        >
        
        </newnav.Screen>
        <newnav.Screen
        
        options={{
          headerTitleAlign:'center'
         ,headerShown:false}}
        
        name="Search"
        component={Search}
        >

        </newnav.Screen>

        <newnav.Screen
         options={{
             headerShown:true,
            headerTitleAlign:'center'
            ,headerTitle:'shop'
          }}
        name="Product_list"
        component={Product_list}
        >

        </newnav.Screen>

        </newnav.Navigator>

        )
    }
export default HomeView