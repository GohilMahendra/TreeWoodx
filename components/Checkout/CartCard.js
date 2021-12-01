
import React from "react";
import { 
    Text,
    View,
    Image
 } from 'react-native';

 import {fonts} from "../../constants/fonts";


const CartCard=(props)=>
{

    const {item}=props

    return(
        <View
        style=
        {
          {
            flexDirection: "row",
            margin: 10,

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
                fontFamily: fonts.Federo_Regular
              }
            }>{item.pname}</Text>
          <Text


            style={
              {
                fontSize: 15
              }
            }>{item.brand}</Text>
          <Text


            style={
              {
                fontSize: 15
              }
            }>{item.price}</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={
                {
                  fontSize: 15
                }
              }> qty : {item.quantity}</Text>
            <Text
              style={
                {
                  fontSize: 15
                }
              }>subtotal {item.price * item.quantity}</Text>
          </View>

        </View>
        </View>

    )
}

export default CartCard