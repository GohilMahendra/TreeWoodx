import React, { useState, useRef } from "react";
import {

  Dimensions,
  Text, TouchableOpacity, View, Image, TextInput, ActivityIndicator, Animated, StyleSheet
} from "react-native";
import { FlatList, Swipeable } from "react-native-gesture-handler";

import LinearGradient from "react-native-linear-gradient";
import { useEffect } from "react/cjs/react.development";

import { fonts } from "../../constants/fonts";

import CartCard from "../../components/Cart/CartCard";

import EmptyCartScreen from "../../components/EmptyCartScreen";

import { useDispatch, useSelector } from "react-redux";

import { changeCartQuantity, removeFromCart } from "../../redux/Actions/CartActions";
import { Color } from "../../constants/colors";
import { colors } from "react-native-elements";
const { height, width } = Dimensions.get('screen')

const Cart = ({ navigation }) => {

  const dispatch = useDispatch()

  const cart = useSelector(state => state.Cart.Cart)

  const tot = useSelector(state => state.Cart.totalPrice)

  const loading = useSelector(state => state.Cart.loading)


  const changeQuantity = async (quantity, pid) => {

    dispatch(changeCartQuantity(quantity, pid))

  }



  const remove = async (pid) => {

    dispatch(removeFromCart(pid))
  }

  const valref = useRef(new Animated.Value(1))

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(

      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(valref.current, {
          toValue: 1.5,
          duration: 200,
          useNativeDriver: true
        }),
        // decrease size
        Animated.timing(valref.current, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
      ])

      ,
      { iterations: 2 }
    ).start();

  }, [tot]);


  const itemBuilder = ({ item, index }) => {

    return (


      <View
        style={
          {
            marginVertical: 10
          }
        }
      >

        <CartCard

          item={item}
          navigation={navigation}
          onRemovePress={remove}
          changeQuantity={changeQuantity}
        >

        </CartCard>
      </View>
    )

  }

  return (

    <View style={styles.Container}>
      <View style={styles.Container}>

        <Text style={styles.txtTitle}>MY CART</Text>

        <FlatList
          style={{ flex: 1 }}
          data={cart}
          ListEmptyComponent={EmptyCartScreen}
          renderItem={itemBuilder}
          keyExtractor={item => item.key}
        >
        </FlatList>

      </View>
      <View style={styles.totalContainer}>

        <View
          style={
            {
              backgroundColor: '#fff',
            }
          }
        >
          <Animated.View
            style={{
              transform: [
                {
                  scale: valref.current
                }
              ]
            }}
          >
            <Text style={styles.txtTotle}>TOTAL </Text>
            <Text style={styles.txtPrice}>
              RS {tot}</Text>

          </Animated.View>
        </View>

        {
          (tot > 0) &&
          <TouchableOpacity
            onPress={() => navigation.navigate("Checkout")}
            style={styles.btnProceed}
          >
            <LinearGradient
            start={{x:0,y:0}}
            end={{x:1,y:1}}
              style={styles.linearGradient}
              
              colors={[Color.lightBlue,Color.purpleLight]}
            >
              <Text style={styles.txtbtn}>
                PROCEED TO CHECKOUT
              </Text>

            </LinearGradient>

          </TouchableOpacity>}
      </View>
    </View>

  )
}

const styles = StyleSheet.create
  (
    {
      Container:
      {
        flex: 1,
        backgroundColor: "#E3E8F0"
      },
      linearGradient:
      {
        height: 50,
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: "center"
      },
      txtbtn:
      {
        textAlign: 'center',
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: fonts.Federo_Regular,
        color: '#fff',
        textAlignVertical: 'center'
      },
      txtTitle:
      {
        alignSelf: 'center',
        fontFamily: fonts.Federo_Regular,
        fontSize: 30,
        margin: 20
      },
      txtTotle:
      {
        marginHorizontal: 20,
        fontSize: 25,
        fontFamily: fonts.Quicksand_Medium

      },
      totalContainer:
      {
        marginTop: 10,
        borderRadius: 30,
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 1,
        shadowRadius: 20,
        backgroundColor: '#fff',
        borderRadius: 30,
        bottom: 10,
        alignItems: 'flex-end'
      },
      btnProceed:
      {
        height: 50,
        borderRadius: 15,
        margin: 20,
        alignSelf:'center',
        elevation: 5,
        alignItems: 'center'
      },
      txtPrice:
      {
        marginHorizontal: 20,
        fontWeight: "bold",
        fontSize: 25,
        fontFamily: fonts.Quicksand_Medium
      }
    }
  )
export default Cart