
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


const ProductCardEditer = (props) => {



    const navigation=useNavigation()

    const dispatch=useDispatch()
    const deleteProd = (productID) => {

        dispatch(DeleteProduct(productID))

    }


    const { item } = props
    const AddProductTOFeatured=()=>
    {
        dispatch(AddToFeatured(item))
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
                <View>
                    <Text

                        style={
                            {
                                fontFamily: fonts.Quicksand_Medium
                            }
                        }

                    >
                        {item.pname}

                    </Text>
                    <Text
                        style={
                            {
                                fontFamily: fonts.Quicksand_Medium
                            }
                        }
                    >
                        {item.pbrand}

                    </Text>
                    <View
                        style={
                            {
                                flexDirection: "row"
                            }
                        }
                    >
                        <Text>{item.priceafterdisc}</Text>
                        <Text
                            style={
                                {
                                    textDecorationColor: 'black',
                                    textDecorationLine: "line-through"
                                }
                            }
                        >{item.pprice}</Text>

                    </View>
                </View>
            </View>

            <ProductEditer
                pid={item.key}
                qty={item.pstock}
                disc={item.pdisc}
            ></ProductEditer>
            <View
                style={styles.btnContainer}
            >
                <TouchableOpacity
                    onPress={
                        ()=>navigation.navigate('Admin_product',{
                            item:item.key
                        })
                    }
                    style={
                        {
                            backgroundColor: Color.peach,
                            padding: 10,
                            borderRadius: 10,
                            elevation: 15

                        }
                    }
                >
                    <Text>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={
                        ()=>deleteProd(item.key)
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
                    style={
                        {
                            fontSize:15,
                            fontFamily:fonts.Federo_Regular
                        }
                    }
                    >DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity

                onPress={()=>AddProductTOFeatured()}


                    style={
                        {
                            backgroundColor: Color.blueModern,
                            padding: 10,

                            elevation: 15,

                            borderRadius: 10
                        }
                    }
                >
                    <Text>FEATURED</Text>
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
                margin: 20, height: 350,
                backgroundColor: '#fff',
                borderRadius: 50,
                elevation: 10
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
            }



        }
    )
export default ProductCardEditer