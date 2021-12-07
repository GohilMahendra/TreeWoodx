

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert
} from "react-native";


import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { State } from "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import { AddStock, ChangeDiscount } from "../../redux/Actions/ProductActions";
import ErrorCard from "../../components/ErrorCard";
import { ActivityIndicator } from "react-native-paper";

const ProductEditer = ({ pid, qty, disc, price }) => {

    let dispatch = useDispatch()



    let discx = disc.toString()

    const [pqty, setpqty] = useState("0")

    const [pdiscount, setpdiscount] = useState(discx)

    const addstockHelper = () => {

        dispatch(AddStock(pid, pqty))
    }
    const ChangeDiscountHelper = () => {

        dispatch(ChangeDiscount(pid, pdiscount, price))
    }

    return (

        <View
            style={styles.Container}
        >
            <View
                style={styles.horiZonatalContainer}
            >
                <TextInput

                    onChangeText={text => setpqty(text)}
                    value={pqty}
                    style={styles.txtinput}

                >
                </TextInput>

                <TouchableOpacity
                    onPress={() => addstockHelper()}
                    style={styles.btnAdd}
                >

                    <Text
                        style={styles.txtbtnAdd}
                    >stock +</Text>

                </TouchableOpacity>

                <TextInput
                    onChangeText={text => setpdiscount(text)}
                    value={pdiscount}
                    style={styles.txtinput}
                >
                </TextInput>

                <TouchableOpacity
                    onPress={() => ChangeDiscountHelper()}
                    style={styles.btnAdd}
                >
                    <Text
                        style={styles.txtbtnAdd}
                    >discount</Text>

                </TouchableOpacity>

            </View>
          

        </View>



    )
}

const styles = StyleSheet.create
    (
        {
            Container:

            {
                height: 50,
                width: "80%",
                alignSelf: "center"
            },
            horiZonatalContainer:

            {
                flexDirection: "row",

                justifyContent: "space-between",


            },
            txtinput:

            {
                height: 50,
                width: 50,
                elevation: 2,
                borderRadius: 15,
                //borderWidth: 1,
                textAlign: "center"

            },
            btnAdd:
            {

                height: 50,
                width: 70,
                elevation: 15,
                backgroundColor: "#fff",
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center"
            },
            txtbtnAdd:

            {
                color: "black",
                fontSize: 15,

                textAlign: 'center',
                textAlignVertical: "center",

            }





        }
    )

export default ProductEditer