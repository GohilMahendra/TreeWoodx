

import React from "react";

import  FontAwesome5  from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import HomeView from "../screens/HomeView";
import {Badge  } from "react-native-elements";
import Cart from "../screens/Cart";
import User_profile from "../screens/User_profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartproducts } from "../redux/Actions/CartActions";
const bottomTab=createBottomTabNavigator()

const HomeTabNavigator=()=>
{

    
const dispatch=useDispatch()

const badge=useSelector(cart=>cart.Cart.total)



useEffect
(
  ()=>
  {

    dispatch(fetchCartproducts())
  
  }

  ,[]
)

    return(
        
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


    )

}
export default HomeTabNavigator