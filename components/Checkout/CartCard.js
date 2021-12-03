
import React from "react";
import {
  Text,
  View,
  Image
} from 'react-native';

import { fonts } from "../../constants/fonts";


const CartCard = (props) => {

  const { item } = props

  return (
    <View
      style=
      {
        {
          flexDirection: "row",
          margin: 10,
          elevation:5,
          backgroundColor: "#fff",
          borderRadius: 10
        }
      }
    >
      <Image
        source={{ uri: item.img1 }}
        style={
          {
            width: '30%',
            height: '80%',
            height: 100,
            borderRadius: 15
          }
        }
      >
      </Image>
      <View

        style={
          {
            flexWrap: "wrap",
            flex: 1,
            marginLeft: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }
        }
      >
        <Text
          style={
            {
              fontSize: 20,
              fontFamily: fonts.Genos_Regular
            }
          }>{item.pname}</Text>
        <Text
          style={
            {
              fontSize: 20,
              fontFamily:fonts.SpaceMono_Regular
            }
          }>{item.brand}</Text>
        <Text
          style={
            {
              fontSize: 20,
              fontFamily:fonts.Genos_Regular
            }
          }>RS {item.price}</Text>

        <View
          style={{
            flexDirection: 'row',
          
          }}
        >
          <Text
            style={
              {
                fontSize: 20,
                marginHorizontal:15,
                fontFamily:fonts.Genos_Regular
              }
            }> qty : {item.quantity}</Text>
          <Text
            style={
              {
                fontSize: 20,
                fontFamily:fonts.Genos_Regular
              }
            }>subtotal RS{item.price * item.quantity}</Text>
        </View>

      </View>

    </View>

  )
}

export default CartCard