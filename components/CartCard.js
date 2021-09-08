

import React, { useState } from "react";
import { Dimensions,StyleSheet } from "react-native";
import {View ,Text } from "react-native";
import {  Appbar, ProgressBar} from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AddStar from "./Addstar";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { fonts } from "../constants/fonts";

import  auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useDispatch } from "react-redux";
import { changeCartQuantity } from "../redux/Actions/CartActions";
const {height,width}=Dimensions.get(
    'screen'
)


const CartCard=(props)=>
{


    const dispatch=useDispatch()
    
    const {item,navigation,onRemovePress}=props


    const {height,width}=Dimensions.get('screen')

    console.log(item.key)
   
    

    const changeQuantity=(qty,pid)=>
    {

        dispatch(changeCartQuantity(qty,pid))
        
    }


    


    
    const [quantity,setquantity]=React.useState(1)
 return(
    <View>
 
     
     <View
     style=
     {
         {
             flexDirection:"row",
             marginLeft:20,
             backgroundColor:"#fff",
             borderRadius:10
         }
     }
     >

     <Image
     source={{uri:item.img1}}
     style={
         {
             width:'35%',
             height:'80%',
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
             marginLeft:10,
            alignItems:'center',
            justifyContent:'center'
         }
     }
     >
         <Text 
         
         
         style={
             {
                fontSize:20,


                fontFamily:fonts.Federo_Regular
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
        
         <TouchableOpacity
         onPress={()=>onRemovePress(item.key)}
         style={
             {
                 borderWidth:1,
                 justifyContent:'flex-end',
                 alignItems:"flex-end",
                 alignSelf:'flex-end',
                 borderRightColor:'red',
                 borderLeftColor:'red'
                 

             }
         }
         >
             <Text
             style={
                 {
                     marginHorizontal:20,
                     alignSelf:"flex-end"
                 }
             }
             >REMOVE</Text>
         </TouchableOpacity>
     </View>
     <View
         style=
         {
             {
                width:"10%",
                 justifyContent:"space-evenly"
             }
         }
         >
             <TouchableOpacity

            
             onPress={
                 
                 ()=>  { changeQuantity(quantity-1,item.key) ,setquantity(quantity-1)}
                 
             }

             disabled={(quantity==1)?true:false}
             ><Text
             style={
                 {
                     fontSize:25
                 }
             }
             >-</Text></TouchableOpacity>
             <Text
              style={
                {
                    fontSize:20
                }
            }
             >{quantity}</Text>
             <TouchableOpacity
             onPress={()=>
                
                {
                
                
                changeQuantity(quantity+1,item.key),setquantity(quantity+1)
            }
            }
             
             disabled={(quantity==5)?true:false}
             ><Text
              style={
                {
                    fontSize:25
                    
                }
            }
             >+</Text></TouchableOpacity>

         </View>
     </View>


    </View> 

 )
}
export default CartCard