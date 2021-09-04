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
import HomeView from "./HomeView";
import {Badge  } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"
import { set } from "react-native-reanimated";
import Cart from "./Cart";
import User_profile from "./User_profile";
import { useDispatch, useSelector } from "react-redux";
import { stat } from "react-native-fs";
import { fetchCartproducts } from "../redux/Actions/CartActions";
import { State } from "react-native-gesture-handler";
const bottomTab=createBottomTabNavigator()
//console.log(wooddata)




const height=Dimensions.get('screen').height
const width=Dimensions.get('screen').width
 const Home=()=>
 {
//  var badge=0

const dispatch=useDispatch()

const badge=useSelector(cart=>cart.Cart.total)

//console.log(JSON.stringify(cartDetails)+"cart Details")




const fetchBadge=()=>
{
    firestore().collection('cart').doc(auth().currentUser.uid).collection('products').onSnapshot
    (
      (snapshot)=>
      {

        setbadge(snapshot.docs.length)

      }
    )

  }
  
useEffect
(
  ()=>
  {


    dispatch(fetchCartproducts())
  // const subscription=fetchBadge()


  // return ()=>subscription()

  }

  ,[]
)

// useEffect
// (
//   ()=>
//   {

 
//     dispatch(fetchCartproducts())

//   }

//   ,[]
// )





  //  const [badge,setbadge]=React.useState(0)

     return(
        <SafeAreaView style={{flex:1,height:height,backgroundColor:"white"}}>
            <bottomTab.Navigator
            initialRouteName="Home"

          tabBarOptions={
            {
            
              style:{borderRadius:20,
                backgroundColor:"black"
              }
            }
          }
>
                <bottomTab.Screen
                name="Home"
                component={HomeView}
                options={
                    {
                    
                     
                      tabBarIcon:({size,focused,color})=>   
                      
                        <FontAwesome5 size={size}  color={color} name="home">
             
                        </FontAwesome5>
                      
                    }
                    
                  }
               >

                </bottomTab.Screen>

                <bottomTab.Screen
                
                name="Cart"

            
                component={Cart}
                options={
                  
                    {
                    
                      

                      tabBarIcon:({size,focused,color})=>   
                        <FontAwesome5 style={{justifyContent:'flex-end',
                        alignItems:'flex-start'}} size={size}  color={color} name="shopping-cart">
                          <Badge value={badge}></Badge>
                        </FontAwesome5>
                    


                    }
                    
                  }
               >

                </bottomTab.Screen>
                <bottomTab.Screen
                
                name="Profile"

            
                component={User_profile}
                options={
                    
                    {
                    
                     
                      tabBarIcon:({size,focused,color})=>   
                        <FontAwesome5 size={size}  color={color} name="user-edit"></FontAwesome5>
                    }
                    
                  }
               >

                </bottomTab.Screen>

            </bottomTab.Navigator>


          </SafeAreaView>

     )
 }

 export default Home