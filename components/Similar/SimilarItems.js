import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Image, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import {

    StyleSheet, View, Text
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import {
    fonts
} from "../../constants/fonts";

import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";

import { FetchInitialSimilarProducts, FetchSimilarProducts } from "../../redux/Actions/SimilarActions";
import { useNavigation } from "@react-navigation/core";
const SimilarItems = ({ category, curruntID }) => {


    if (category == undefined)
        return


    const navigation = useNavigation()
    const dispatch = useDispatch()
    const emptyScreen = () => {
        return (

            <View
                style=
                {
                    styles.emptyViewContainer
                }
            >

                <Text
                    style={
                        styles.emptyScreenText
                    }
                >NO SiMILAR ITEMS FOUND</Text>

            </View>
        )
    }
    useEffect
        (
            () => {
                dispatch(FetchSimilarProducts(category))
            },
            []
        )


    const products = useSelector(state => state.Similar.similarProductsInitial)

    const loading=useSelector(state => state.Similar.similarProductsInitialLoading)


    console.log(products+"products")
    const SimilerItemBuilder = ({ item, index }) => {
        if (item == undefined)
            return
        console.log(item.key)
        return (
            <TouchableOpacity
                onPress={() => navigation.push("product", { item: item, name: item.pname })}
            >
                <ProductCard
                    item={item}
                >
                </ProductCard>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ margin: 20 }}>
            <View style={styles.similarContainer}>
                <Text
                    style=
                    {
                        styles.similarText
                    }
                >SIMILAR PRODUCTS</Text>
                <TouchableOpacity
                    style={
                        {

                            backgroundColor: "black",
                            borderRadius: 10
                        }


                    }

                    onPress={() => navigation.push("SimilarProducts",
                        {
                            categoryname: category,
                            by: "category",
                            name: "similar category for " + category
                        }
                    )}
                    disabled={
                        (products != undefined && products.length > 0)
                            ? false : true}
                >
                    <Text
                        style={
                            {
                                color: "white",
                                margin: 10
                            }
                        }
                    >VIEW MORE</Text>

                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>

                <FlatList

                    horizontal
                    data={products}

                    emptyScreen={emptyScreen}
                    keyExtractor={(item) => item.key}
                    renderItem={SimilerItemBuilder}
                    style={{ marginHorizontal: 10, height: 350 }}

                >

                </FlatList>


               <ActivityIndicator
               style={{
                   alignItems:'center',
                   top:'50%'
               }}
               size={30}
               animating={loading?true:false}
               ></ActivityIndicator>
            </View>


        </View>
    )
}



const styles = StyleSheet.create
    (
        {
            emptyViewContainer:
            {
                height: 200,
                justifyContent: "center",
                alignItems: "center"
            },
            similarContainer:
            {
                flexDirection: "row",
                marginVertical: 10,
                justifyContent: "space-between"


            },
            similarText:
            {
                fontFamily: fonts.Quicksand_Medium,
                fontWeight: "bold",
                fontSize: 20,
                textAlignVertical: "center",
                textAlign: "center"
            },
            emptyScreenText:
            {

                fontFamily: fonts.Quicksand_Medium,
                fontWeight: "bold",
                fontSize: 20,
                textAlignVertical: "center",
                textAlign: "center"

            }



        }
    )
export default SimilarItems