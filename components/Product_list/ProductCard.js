import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, Text, View } from "react-native"
  ;
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Color } from "../../constants/colors";

import { fonts } from "../../constants/fonts";

const ProductCard = (props) => {
  const navigation = useNavigation()
  const { item, index, height, width } = props
  return (

    <TouchableOpacity
      onPress={() =>
        navigation.push("product",
          {
            item: item, name: item.pname
          })}

      style={
        {
          backgroundColor: '#fff',
          elevation: 5,
          height: 350,
          width: width/2-10,
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
            height: '40%',
            width: "100%",
           // elevation: 15,
            borderRadius:15,
            backgroundColor:"#fff",
            alignItems: "center"
          }
        }
      >
        <View
        style={
          {
            flex:1,
            backgroundColor:"#fff",
            opacity:0.5
          }
        }
        >
        </View>
        <View
        style={
          {
            flex:1,
            position:"absolute"
          }
        }
        >
        <Text
          style={
            {
              fontSize: 20,
              fontFamily: fonts.Federo_Regular,
              color: 'black',

            }
          }
        >{item.pname}</Text>
        <Text
          style={
            {
              fontSize: 18,
              color: "gray"

            }
          }
        >{item.pbrand}</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: 'space-between',
           
          }}
        >
          <Text
            style={
              {
                fontFamily: fonts.Federo_Regular,
                fontSize: 20,
                color: "black"


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
                alignSelf:"flex-end",
                textDecorationLine: 'line-through',
                color: 'black'
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
            backgroundColor: "#90a955",
            position: "absolute",
            top: 5,
            right: 5,
            elevation:10,
            borderRadius: 10

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