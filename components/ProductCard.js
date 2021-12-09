import React from "react";
import {
    View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView, ActivityIndicator

} from "react-native";

import {
    fonts
} from "../constants/fonts";

import FastImage from "react-native-fast-image";

const ProductCard = (props) => {

    const { item } = props


    return (
        <View style={styles.container}>
            <View style={styles.ViewContainer}>

                <FastImage
                    source={{
                        uri: item.pimage,
                        priority: FastImage.priority.normal
                    }}
                    style={styles.image}

                    resizeMode={FastImage.resizeMode.contain}

                ></FastImage>

                <View
                    style={styles.discountContainer}
                >
                    <Text
                        style={[styles.texts, { color: "#fff" }]}>{item.pdisc}% off</Text>
                </View>
                <View
                    style={styles.TextConatainer}>
                    <Text
                        style={styles.texts}>{item.pname}</Text>

                    <Text
                        style={styles.texts}>RS {item.priceafterdisc}</Text>


                    <Text
                        style={styles.txtbrand}>{item.brand}</Text>
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

                flex: 1,
                margin: 10,
                borderRadius: 15

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
            txtbrand:
            {
                alignItems: 'center',
                fontSize: 20,

                alignSelf: 'center'
            },
            texts:
            {
                alignSelf: 'center',
                fontFamily: fonts.Federo_Regular,
                color: "black",
                fontSize: 18

            },
            discountContainer:
            {
                position: 'absolute',
                top: 10,
                right: 20,
                elevation: 10,
                backgroundColor: 'green',
                padding: 5,
                borderRadius:10
            }

        }
    )