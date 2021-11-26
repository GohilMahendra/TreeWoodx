import React, { useReducer } from "react";
import { View, Text, TextInput, Dimensions, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fonts } from "../../constants/fonts";
import { useRoute } from "@react-navigation/core";


import Modal from "react-native-modal";

import { makeOrder } from "../../redux/Actions/OrderActions";
import AddressCard from "../../components/AddressCard";
import { useState } from "react/cjs/react.development";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { ActivityIndicator } from "react-native-paper";
import PaymentCard from "../../components/PaymentCard";
const Payment = ({ navigation }) => {

  const dispatch = useDispatch()

  let date = new Date()
  const todaysdate = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear()


  const p = useRoute()

  const makeOrderRequest = () => {


    if (!VarifyCard()) {
      alert("Please enter Valid Card details")
      return
    }

    setisvisible(true)
    let paymentDetails = {
      cardNumber: creditCardNumber,
      cardType: "VISA",
      amount: price

    }


    dispatch(makeOrder(cart, price, p.params.address, paymentDetails))


  }



  const cart = useSelector(state => state.Cart.Cart)


  const orderSuccess = useSelector(state => state.Orders.orderSuccess)
  const orderLoading = useSelector(state => state.Orders.orderLoading)
  const price = useSelector(state => state.Cart.totalPrice)


  const [isVisible, setisvisible] = useState(false)

  const { height, width } = Dimensions.get('screen')
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={
          {
            flex: 1
          }
        }
      >
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: fonts.Merienda_Regular,
            fontSize: 20,
            marginTop: 15
          }}
        >Order Summury</Text>

        {
          cart.map(
            function (item) {
              return (
                <View
                  key={item.key}
                >


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




                </View>
              )
            }
          )
        }



        <AddressCard
          address={p.params.address}
        ></AddressCard>

        <PaymentCard>

        </PaymentCard>
      </ScrollView>
      <TouchableOpacity
        onPress={() => makeOrderRequest()}
        style={{


          height: 50,

          elevation: 25,
          justifyContent: 'center',
          borderRadius: 30


        }}
      >

        <LinearGradient
          colors={["#009ffd", "#2a2a72"]}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#fff",

              fontFamily: fonts.Federo_Regular
            }}
          >PROCCED FOR PAY RS {price}</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        isVisible={isVisible}
      >
        <View
          style={{
            backgroundColor: '#fff',
            height: 200,
            borderRadius: 20
          }}
        >

          {orderLoading
            &&
            <View
              style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}
            >
              <Text>
                Proccessing Payment Please wait
              </Text>
              <ActivityIndicator
                animating={true}
                size={30}
              />
            </View>

          }

          {orderSuccess
            &&
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.Federo_Regular,
                  fontSize: 25
                }}
              >Order Placed Success fully</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  borderRadius: 20
                }}
                onPress={
                  () => navigation.pop(2)
                }
              >
                <Text
                  style={{
                    margin: 10,

                  }}
                >GO BACK TO Cart</Text>
              </TouchableOpacity>
            </View>
          }

        </View>
      </Modal>
    </View>
  )
}

export default Payment