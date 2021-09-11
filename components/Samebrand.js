import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Image, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import {

    View, Text
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { fonts } from "../constants/fonts";
import { Dimensions } from "react-native";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { stat } from "react-native-fs";
import { FetchSimilarBrands } from "../redux/Actions/SimilarActions";

const Samebrand = ({ brand, curruntID }) => {



    const dispatch=useDispatch()
    const navigation=useNavigation()
    const { height, width } = Dimensions.get(
        'screen'
    )
  

    const emptyScreen = () => {
        return (

            <View
                style=
                {
                    {


                        height: 200,
                        justifyContent: "center",
                        alignItems: "center"
                    }
                }
            >

                <Text
                    style={
                        {
                            borderWidth: 1,
                            width: width - 60,
                            alignSelf: "center",
                            textAlign: "center",

                        }
                    }
                >NO RELETED BRANDS FOUND</Text>

            </View>
        )
    }
    useEffect
        (
            () => {


                dispatch(FetchSimilarBrands(brand))
            },



            []
        )

    const products=useSelector(state=>state.Similar.similarBrandsInitial)

  
  
    const SimilerItemBuilder = ({ item, index }) => {





        // console.log(item.key)
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
            <View style={{ flexDirection: "row", marginVertical: 10, justifyContent: "space-between" }}>
                <Text
                    style=
                    {
                        {
                            fontFamily: fonts.Quicksand_Medium,
                            fontWeight: "bold",
                            fontSize: 20,
                            textTransform: 'uppercase',
                            textAlignVertical: "center",

                            width: '70%'


                        }
                    }


                >MORE FROM {brand}</Text>
                <TouchableOpacity
                    style={
                        {
                            backgroundColor: "black",
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: "center"
                        }
                    }
                    onPress={() => navigation.navigate("SimilarBrands",
                        {
                            brandname: brand,

                            name: "similar items for " + brand + " brand"
                        }
                    )}
                    disabled={(products != undefined && products.length > 0) ? false : true}
                >
                    <Text
                        style={
                            {
                                color: "white",
                                margin: 10,
                                textAlignVertical: 'center'
                            }
                        }
                    >VIEW MORE</Text>

                </TouchableOpacity>
            </View>
          
                <View style={{ flex: 1 }}>

                    <FlatList


                        horizontal
                        data={products}

                        ListEmptyComponent={emptyScreen}

                        keyExtractor={(item) => item.key}

                        renderItem={SimilerItemBuilder}



                        style={{ marginHorizontal: 10, height: 350 }}

                    >

                    </FlatList>


                </View>

        </View>
    )
}

export default Samebrand