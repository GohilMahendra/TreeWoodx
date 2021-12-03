import React, { useReducer } from "react";
import { View, Text, TextInput, Dimensions, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fonts } from "../../constants/fonts";
import { useRoute } from "@react-navigation/core";

import { ScrollView } from "react-native-gesture-handler";
import CartCard from "../../components/Checkout/CartCard";
import AddressCard from "../../components/Checkout/AddressCard";
import { Color } from "../../constants/colors";

const OrderDetails = ({ navigation }) => {


  const p = useRoute()

  const cart = useSelector(state => state.Cart.Cart)
  const price = useSelector(state => state.Cart.totalPrice)


  const goToPayment=()=>
  {
    navigation.navigate(
      "Payment",
      {
        address:p.params.address
      }
    )
  }
  return (
    <View style={styles.Container}>
      <ScrollView
        style={
          {
            flex: 1
          }
        }
      >
        <Text
          style={styles.txtOrderSummury}
        >Order Summury</Text>

        {
          cart.map(
            function (item) {
              return (
                <View
                  key={item.key}
                >
                  <CartCard
                    item={item}
                  ></CartCard>

                </View>
              )
            }
          )
        }

        <AddressCard
          address={p.params.address}
        ></AddressCard>

      </ScrollView>


      <TouchableOpacity
      onPress={()=>goToPayment()}
        style={styles.btnPayment}
      >
        <Text
          style={styles.txtPayment}
        >
          Proceed For Pay RS{price}</Text>
      </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create
  (
    {
      Container:
      {
        flex: 1,
        backgroundColor:"#fff"
      },
      txtOrderSummury:
      {
        alignSelf: 'center',
        fontFamily: fonts.Orbitron_Black,
        fontSize: 20,

        marginTop: 15
      },
      btnPayment:
      {
        height: 50,
        backgroundColor: Color.corporateBlue,
        margin: 20,
        elevation:5,
        borderRadius:15,
        justifyContent: 'center',
        alignItems: 'center'
      },
      txtPayment:
      {
        color: '#fff',
        fontSize: 20,
        fontFamily: fonts.Federo_Regular
      }


    }
  )
export default OrderDetails