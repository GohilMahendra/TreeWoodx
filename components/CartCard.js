

import React, { useState } from "react";
import { Dimensions,StyleSheet } from "react-native";
import {View ,Text } from "react-native";
import {  Appbar, ProgressBar} from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AddStar from "./Addstar";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
const {height,width}=Dimensions.get(
    'screen'
)


const CartCard=(props)=>
{

    const {item,navigation}=props


    const {height,width}=Dimensions.get('screen')

    console.log(item.key)
   
    

 return(
    <View>
    <TouchableOpacity
  
    
    >
     
     <View
     style=
     {
         {
             flexDirection:"row",
             marginHorizontal:20
         }
     }
     >

     <Image
     source={{uri:item.img1}}
     style={
         {
             width:(width/2),
             height:150,
             borderRadius:15
         }
     }
     >

     </Image>
     <View
    
     style={
         {
             flexWrap:"wrap",
             flex:1,
            alignItems:'center'   
         }
     }
     >
         <Text 
         
         
         style={
             {
                fontSize:15   
             }
         }>{item.pname}</Text>
         <Text 
         
         
         style={
             {
                fontSize:15   
             }
         }>{item.brand}</Text>
         <Text 
         
         
         style={
             {
                fontSize:15   
             }
         }>{item.price}</Text>
         <View
         style=
         {
             {
                 flexDirection:"row"
             }
         }
         >
             <TouchableOpacity><Text>+</Text></TouchableOpacity>
             
             <TouchableOpacity><Text>+</Text></TouchableOpacity>

         </View>
     </View>
     </View>

    </TouchableOpacity>

    </View> 

 )
}
export default CartCard