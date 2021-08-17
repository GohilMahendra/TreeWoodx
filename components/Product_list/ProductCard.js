import React, { useEffect, useState } from "react";
import { Image,TouchableOpacity, Text,View } from "react-native"
;

import {  fonts} from "../../constants/fonts";

const ProductCard=(props)=>
{
    const {navigation,item,index,height,width}=props
    return(
        
        <TouchableOpacity
        onPress={()=>navigation.navigate("product",{item:item})}
      
      
        style={
          {
            height:height/2.5,
            width:width/2-20,
            margin:10,
            borderWidth:0.5
            ,borderRadius:10,
           
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
          borderRadius:10,
          alignSelf:"center"
        }
        }
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
         RS {item.pprice}
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
             marginHorizontal:10
           }
         }
         >{item.pdisc} % OFF</Text>

       </View>
       

        </TouchableOpacity>

    )

}
export default ProductCard