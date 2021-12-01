import React from "react";
import {
    View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView, ActivityIndicator

} from "react-native";

import {
    fonts
} from "../constants/fonts";

import FastImage from "react-native-fast-image";


import {
    useNavigation
} from "@react-navigation/native";
const ProductCard = (props) => {

    const { item } = props
    const disc_price = Math.floor(item.pprice - item.pprice * item.pdisc / 100)


    return (
        <View style={styles.container}>
            <View style={styles.ViewContainer}>
                <FastImage
                    source={{ uri: item.pimage, priority: FastImage.priority.normal }}
                    style={styles.image}

                    resizeMode={FastImage.resizeMode.contain}

                ></FastImage>
                <View
                    style={styles.TextConatainer}>
                    <Text
                        style={styles.texts}>{item.pname}</Text>

                    <Text
                        style={styles.texts}>RS {disc_price}</Text>

                    <Text
                        style={[styles.texts, { color: "green" }]}>{item.pdisc}% off</Text>


                    <Text
                        style={{
                            alignItems: 'center',
                            fontSize: 20,
                            fontStyle: 'italic',
                            alignSelf: 'center'
                        }}>{item.brand}</Text>
                </View>
            </View>

        </View>
    )
}

export default ProductCard


const styles = StyleSheet.create
    (
        {
            container:
            {
                height: 300,
                alignItems: 'center',
                margin: 20,
                marginLeft: 0
            },
            image:
            {
                borderRadius: 20,


                flex: 1,
                margin: 10
            },
            ViewContainer:
            {
                backgroundColor: "#fff",
                height: 300,
                width: 200,
                borderRadius: 10,
                elevation: 22,
                justifyContent: 'flex-end',

                shadowColor: "#fff",
                shadowOffset: {
                    width: -15,
                    height: 5,
                },
                shadowOpacity: 1,
                shadowRadius: 10,

                elevation: 7
            },

            texts:
            {
                alignSelf: 'center',

                fontFamily: fonts.Federo_Regular,
                color: "black",
                fontSize: 18

            }

        }
    )