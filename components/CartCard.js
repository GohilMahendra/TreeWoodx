

import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View, Text } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { fonts } from "../constants/fonts";

import { useDispatch } from "react-redux";
import { changeCartQuantity } from "../redux/Actions/CartActions";



const CartCard = (props) => {


    const dispatch = useDispatch()

    const { item, navigation, onRemovePress } = props


    const { height, width } = Dimensions.get('screen')

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
            style={
                {
                    width:'30%'
                }
            }
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
                <Text


                    style={
                        {
                            fontSize: 20,
                            textAlign:"center",
        
                            fontFamily: fonts.Federo_Regular
                        }
                    }>{item.pname}</Text>
                <Text


                    style={
                        {
                            fontSize: 15
                        }
                    }>{item.brand}</Text>
                            <View
                style={
                    {
                        flexDirection:'row',
                        justifyContent:'space-evenly',
                        alignSelf:'center'
                    }
                }
                >
                <Text

            
                    style={
                        {
                            fontSize: 15
                        }
                    }>{item.price}</Text>
                <Text
                style={
                    {
                        fontSize:15,

                    }
                }
                >
                    {item.priceafterdisc}

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
                            fontSize: 25
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
                    >X</Text>
                </TouchableOpacity>
  
        </View>


    )
}

const styles = StyleSheet.create
    (
        {

            removeBtn:
            {
                borderWidth: 1,
                backgroundColor:"red",
                alignSelf:'center',
                height:25,
                width:25,

                alignSelf:"flex-end"
               
                

            },
            Container:

            {
                flexDirection: "row",
                marginLeft: 20,
                height:100,
                backgroundColor: "#fff",
                borderRadius: 10
            },
            productImage:

            {
               flex:1,
                borderRadius: 10
            },
            productContainer:
            {
                flexWrap: "wrap",

                width:'50%',
                marginLeft: 10,
                alignItems: 'center',
                justifyContent: 'center'
            },
            removeText:
            {
                flexWrap: "wrap",
                flex: 1,
        
                textAlign:"center",
                color:"#fff",
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