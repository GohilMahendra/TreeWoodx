import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, Text, View } from "react-native"
  ;

import { fonts } from "../../constants/fonts";

const ProductCard = (props) => {
  const navigation = useNavigation()
  const { item, index, height, width } = props
  return (

    <TouchableOpacity
      onPress={() => 
        navigation.push("product",
         { item: item, name: item.pname 
      })}

      style={
        {
          backgroundColor: '#fff',
          elevation: 10,
         height: 350,
          width: '50%',

          margin: 5,
          borderRadius: 15,

        }
      }
    >

      <Image

        source={
          {
            uri: item.pimage
          }
        }
        style={
          {
            //backgroundColor:"blue",
            height: '60%',
            width: '100%',
            borderRadius: 15,
            alignSelf: "center"
          }
        }
        resizeMode="cover"
      >
      </Image>
      <View
        style={
          {
            alignSelf: 'center',
            justifyContent: "center",
            height:'40%',
            width:"100%",
              alignItems: "center"
          }
        }
      >
        <View
        style={
          {
         
            height:'100%',
            width:'100%',
            backgroundColor:'#fff',
           
            opacity:0.4,
            borderRadius:10
          }
        }
        />
         
        <View
        style={
          {
            position:'absolute',
            flex:1,
            backgroundColor:''
          }
        }
        >
        <Text
          style={
            {
              fontSize: 18,
              fontFamily: fonts.Federo_Regular,

            }
          }
        >{item.pname}</Text>
        <Text
          style={
            {
              fontSize: 18,
              fontFamily: fonts.Merienda_Regular,
              color: "gray"

            }
          }
        >{item.pbrand}</Text>

      <View
      style={{
        flexDirection:"row",
        justifyContent:'space-around',
        alignItems:"center"
      }}
      >
        <Text
          style={
            {
              fontFamily: fonts.Federo_Regular,
              fontSize: 18,
              color:"black"
             

            }
          }
        >
          RS {item.priceafterdisc}
        </Text>
        <Text
          style={
            {
              fontFamily: fonts.Federo_Regular,
              fontSize: 18,
              textDecorationLine: 'line-through',
              color:'gray'
            }
          }
        >
          RS {item.pprice}
        </Text>
      </View>
     
     </View>
      </View>
      <View
        style={
          {
            backgroundColor: "black",
            position: "absolute",
            top: 5,
            right: 5,
            elevation: 25,
            borderRadius: 20

          }
        }
      >
        <Text
          style={
            {
              marginHorizontal: 10,
              marginVertical: 5,

              color: "#fff",
              fontSize: 15,
              fontFamily: fonts.Federo_Regular
            }
          }
        >{item.pdisc} % OFF</Text>

      </View>


    </TouchableOpacity>

  )

}
export default ProductCard