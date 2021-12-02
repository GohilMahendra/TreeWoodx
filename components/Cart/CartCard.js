

import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View, Text } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { fonts } from "../../constants/fonts";

import { useDispatch } from "react-redux";
import { changeCartQuantity } from "../../redux/Actions/CartActions";



const CartCard = (props) => {

    const dispatch = useDispatch()

    const { item, navigation, onRemovePress } = props

    console.log(item.priceafterdisc)

    const changeQuantity = (qty, pid) => {

        dispatch(changeCartQuantity(qty, pid))

    }

    const [quantity, setquantity] = React.useState(1)
    return (


        <View>
            <View
                style=
                {
                    styles.Container
                }
            >

                <View
                    style={styles.imageContainer}
                >
                    <Image
                        source={{ uri: item.img1 }}
                        style={

                            styles.productImage
                        }
                    >
                    </Image>

                </View>

                <View
                    style={
                        styles.productContainer
                    }
                >
                    <Text style={styles.txtpname}>{item.pname}
                    </Text>

                    <Text
                        style={
                            {
                                fontSize: 15
                            }
                        }>{item.brand}
                    </Text>

                    <View
                        style={styles.rowContainer}
                    >
                        <Text
                            style={styles.priceafterdisc}
                        >
                            RS{item.priceafterdisc}
                        </Text>
                        <Text
                            style={styles.txtPrice}>RS{item.price}
                        </Text>

                    </View>

                </View>
                <View
                    style=
                    {
                        styles.qtyContainer
                    }
                >
                    <TouchableOpacity
                        onPress={
                            () => { changeQuantity(quantity - 1, item.key), setquantity(quantity - 1) }
                        }

                        disabled={(quantity == 1) ? true : false}
                    ><Text
                        style={
                            {
                                fontSize: 25,

                            }
                        }
                    >-</Text></TouchableOpacity>
                    <Text
                        style={
                            {
                                fontSize: 20
                            }
                        }
                    >{quantity}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            changeQuantity(quantity + 1, item.key),
                                setquantity(quantity + 1)
                        }
                        }

                        disabled={(quantity == 5) ? true : false}
                    ><Text
                        style={
                            {
                                fontSize: 25

                            }
                        }
                    >+</Text></TouchableOpacity>

                </View>
            </View>
            <TouchableOpacity
                onPress={() => onRemovePress(item.key)}
                style={
                    styles.removeBtn
                }
            >
                <Text
                    style={
                        styles.removeText
                    }
                >REMOVE</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create
    (
        {

            removeBtn:
            {
                backgroundColor: "red",
                alignSelf: 'center',
                paddingHorizontal: 10,
                padding: 10,
                elevation: 10,
                borderRadius: 15,
                margin: 10,
                justifyContent: 'center',
                alignSelf: "flex-end"



            },
            txtpname:

            {
                fontSize: 20,
                textAlign: "center",

                fontFamily: fonts.Federo_Regular
            },
            Container:

            {
                flexDirection: "row",
                marginLeft: 20,
                height: 150,
                elevation: 10,
                backgroundColor: "#fff",
                borderRadius: 10
            },

            rowContainer:
            {
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: "space-evenly"
            },

            productImage:

            {
                flex: 1,
                borderRadius: 10
            },
            imageContainer:
            {
                width: '40%',
                elevation: 20,
                backgroundColor: '#fff',
                borderRadius: 15
            },

            priceafterdisc:

            {
                fontSize: 15,

            },

            productContainer:
            {
                flexWrap: "wrap",

                width: '50%',
                marginLeft: 10,
                alignItems: 'center',
                justifyContent: 'center'
            },
            txtPrice:
            {
                fontSize: 15,
                textDecorationLine: "line-through"
            },
            removeText:
            {
                flexWrap: "wrap",

                textAlign: "center",
                color: "#fff",
                alignItems: 'center',
                justifyContent: 'center'
            },
            qtyContainer:
            {
                width: "20%",
                justifyContent: "space-evenly"
            }
        }
    )
export default CartCard