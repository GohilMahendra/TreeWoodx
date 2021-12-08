
import React, { useEffect, useState } from "react";
import { View, Dimensions, Image, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Color, colorsArray } from "../../constants/colors";

import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, LoadProducts } from "../../redux/Actions/ProductActions";
import { fonts } from "../../constants/fonts";
import ProductEditer from "./ProductEditer";
import { AddToFeatured } from "../../redux/Actions/FeaturedActions";
import { useNavigation } from "@react-navigation/core";
import { data } from "@tensorflow/tfjs";


const ProductCardEditer = (props) => {

    const navigation = useNavigation()
    const { item } = props

    const dispatch = useDispatch()
    const deleteProd = (productID) => {
        dispatch(DeleteProduct(productID))
    }


    return (
        <View
            style={styles.Container}
        >

            <View
                style={styles.infoContainer}
            >
                <Image
                    source={
                        {
                            uri: item.pimage
                        }
                    }
                    style={styles.imgContainer}
                ></Image>
                <View
                    style={styles.RowContainer}
                >
                    <Text

                        style={styles.txtPname}

                    >
                        {item.pname}

                    </Text>
                    <Text
                        style={styles.txtPname}
                    >
                        {item.pbrand}

                    </Text>
                    <View
                        style={styles.priceRowContainer}
                    >
                        <Text>RS{item.priceafterdisc} </Text>
                        <Text
                            style={styles.txtPriceStrike}
                        >RS{item.pprice}</Text>

                    </View>
                </View>
            </View>

            <ProductEditer
                pid={item.key}
                qty={item.pstock}
                disc={item.pdisc}

                price={item.pprice}
            ></ProductEditer>
            <View
                style={styles.btnContainer}
            >
                <TouchableOpacity
                    onPress={
                        () => navigation.navigate('Admin_product', {
                            item: item.key
                        })
                    }
                    style={styles.btnEdit}
                >
                    <Text
                        style={styles.txtbtnInfo}
                    >EDIT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={
                        () => deleteProd(item.key)
                    }
                    style={
                        {
                            backgroundColor: '#de1738',
                            padding: 10,
                            borderRadius: 10,
                            elevation: 25
                        }
                    }
                >
                    <Text
                        style={styles.txtbtnInfo}
                    >DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('FeaturedEditer',{data:item})}
                    style={styles.btnFeatured}
                >
                    <Text style={styles.txtbtnInfo}>FEATURED</Text>
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
                margin: 10,
                height: 350,
                backgroundColor: '#fff',
                borderRadius: 15,
                elevation: 5
            },
            infoContainer:
            {
                flexDirection: 'row',
                margin: 20,

            },
            imgContainer:
            {
                height: 150,
                width: 150,
                borderRadius: 30,

            },
            btnContainer:
            {
                height: 50,
                margin: 20,
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            txtbtnInfo:
            {
                fontSize: 15,
                color: '#fff',
                fontFamily: fonts.Federo_Regular
            },
            txtPname:

            {
                fontFamily: fonts.Quicksand_Medium,
                fontSize: 15,

            }
            ,
            RowContainer:
            {
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius:10
            },
            priceRowContainer:
            {
                flexDirection: "row",
                elevation:5,
                backgroundColor:'#fff',
                borderRadius:5,
                paddingHorizontal:10,
                justifyContent: "space-between"
            },

            txtPriceStrike:
            {
                textDecorationColor: 'black',
                textDecorationLine: "line-through"
            },
            btnEdit:
            {
                backgroundColor: Color.purpleLight,
                padding: 10,
                borderRadius: 10,
                elevation: 15

            },
            btnFeatured:

            {
                backgroundColor: Color.blueModern,
                padding: 10,
                elevation: 15,
                borderRadius: 10
            }






        }
    )
export default ProductCardEditer