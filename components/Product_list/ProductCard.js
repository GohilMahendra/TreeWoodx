import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image,TouchableOpacity, Text,View } from "react-native"
;

import {  fonts} from "../../constants/fonts";

const ProductCard=(props)=>
{
  const navigation=useNavigation()
    const {item,index,height,width}=props
    return(
        
        <TouchableOpacity
        onPress={()=>navigation.push("product",{item:item,name:item.pname})}
      
      
        style={
          {
            backgroundColor:'#fff',
            elevation:25,
         
            height:350,
            width:width/2-20,
            margin:10,
           
            borderRadius:15,
           
          }
        }
        >
          
        <Image

        source={
          {
            uri:item.pimage
          }
        }
        style={
        {
          //backgroundColor:"blue",
          height:'60%',
          width:'100%',
          
          borderRadius:15,
          alignSelf:"center"
        }
        }
        resizeMode="cover"
        >

        </Image>
        <View
        style={
          {
            alignSelf:'center',
            justifyContent:"center",
            flex:1,
            alignItems:"center"
          }
        }
        >
       <Text
       style={
       {
         fontSize:18,
         fontFamily:fonts.Federo_Regular,

       }
       }
       >{item.pname}</Text>
       <Text
       style={
       {
         fontSize:18,
         fontFamily:fonts.Merienda_Regular,
         color:"gray"
         
       }
       }
       >{item.pbrand}</Text>

       <Text
       style={
         {
           fontFamily:fonts.Quicksand_Medium,
           fontSize:20,
           fontWeight:"bold"
         }
       }
       >
         RS {item.priceafterdisc}
       </Text>
       </View>
       <View
       style={
         {
           backgroundColor:"#fff",
           position:"absolute",
           top:5,
           right:5,
           borderRadius:20

         }
       }
       >
         <Text
         style={
           {
             marginHorizontal:10,
             marginVertical:5,
             
             fontSize:15,
             fontFamily:fonts.Federo_Regular
           }
         }
         >{item.pdisc} % OFF</Text>

       </View>
       

        </TouchableOpacity>

    )

}
export default ProductCard