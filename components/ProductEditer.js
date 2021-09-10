

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput
} from "react-native";


import { Dimensions } from "react-native";

import { Image } from "react-native";
import { fonts } from "../constants/fonts";
import { TouchableOpacity } from "react-native";
import { Snackbar } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { AddStock, ChangeDiscount } from "../redux/Actions/ProductActions";




const { height, width } = Dimensions.get('screen')

const ProductEditer = ({ pid, qty, disc }) => {

    let dispatch = useDispatch()




    let qtyx = qty.toString()
    let discx = disc.toString()

    const [pqty, setpqty] = useState(qtyx)

    const [pdiscount, setpdiscount] = useState(discx)

    const addstockHelper = () => {

        dispatch(AddStock(pid, pqty))
    }
    const ChangeDiscountHelper = () => {

        dispatch(ChangeDiscount(pid, pdiscount))
    }

    return (

        <View
            style={
                {
                    height: 50,
                    width: "80%",
                    alignSelf: "center"
                }
            }
        >
            <View
                style={
                    {
                        flexDirection: "row",
                        justifyContent: "space-between",


                    }
                }
            >
                <TextInput

                    onChangeText={text => setpqty(text)}
                    value={pqty}
                    style={
                        {
                            height: 50,
                            width: 50,
                            borderRadius: 20,
                            borderWidth: 0.5,
                            textAlign: "center"

                        }
                    }

                >

                </TextInput>
                <TouchableOpacity
                    onPress={() => addstockHelper()}
                    style={
                        {
                            backgroundColor: "#fff",
                            height: 50,
                            width: 50,
                            backgroundColor: "black",
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center"
                        }
                    }
                >
                    <Text
                        style={
                            {
                                color: "#fff",
                                fontSize: 30,

                            }
                        }
                    >+</Text>
                </TouchableOpacity>
                <TextInput
                    onChangeText={text => setpdiscount(text)}
                    value={pdiscount}
                    style={
                        {
                            height: 50,
                            width: 50,
                            borderRadius: 20,
                            borderWidth: 0.5,
                            textAlign: 'center'

                        }
                    }

                >

                </TextInput>
                <TouchableOpacity

                    onPress={() => ChangeDiscountHelper()}
                    style={
                        {
                            backgroundColor: "#fff",
                            height: 50,
                            width: 50,
                            backgroundColor: "black",
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center"
                        }
                    }
                >
                    <Text
                        style={
                            {
                                color: "#fff",
                                fontSize: 30,

                            }
                        }
                    >+</Text>
                </TouchableOpacity>

            </View>
        </View>



    )
}

export default ProductEditer