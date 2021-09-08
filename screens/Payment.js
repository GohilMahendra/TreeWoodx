import React, { useReducer } from "react";
import {View,Text, TextInput, Dimensions,Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fonts } from "../constants/fonts";
import auth from "@react-native-firebase/auth";
import { useRoute } from "@react-navigation/core";

import firestore from '@react-native-firebase/firestore';
import { makeOrder } from "../redux/Actions/OrderActions";
const Payment=()=>
{

  const dispatch=useDispatch()

  let date=new Date()
  const todaysdate=date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()
  

  const p=useRoute()






  const makeOrderRequest=()=>
  {


    let paymentDetails={
      cardNumber:"555642556963",
      cardType:"VISA",
      amount:price

    }


    dispatch(makeOrder(cart,price,p.params.address,paymentDetails))
    

  }



  const cart=useSelector(state=>state.Cart.Cart)
  const price=useSelector(state=>state.Cart.totalPrice)
  const {height,width}=Dimensions.get('screen')
    return(
        <View style={{flex:1}}>
          <Text>HEY</Text>
   
          {
            cart.map(
              (item)=>
              {
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
        
        
     </View>
      </View>


    </View> 
                )
              }
            )
          }



          <TouchableOpacity
          onPress={()=>makeOrderRequest()}
          >
            <Text>PROCEED TO PAY+{price}</Text>
          </TouchableOpacity>

        </View>
    )
}

export default Payment