import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import {

    View, Text
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { fonts } from "../../constants/fonts";
import { Dimensions } from "react-native";
import ProductCard from "../ProductCard";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { stat } from "react-native-fs";
import { FetchSimilarBrands } from "../../redux/Actions/SimilarActions";

const Samebrand = ({ brand, curruntID }) => {



    const [loading, setloading] = useState(false)
    const [products, setproducts] = useState()

    const navigation = useNavigation()
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
    const getSimilarItemData = async () => {

        try {
            setloading(true)
            const products = await
                firestore()
                    .collection('products')
                    .where('brand', '==', brand)
                    .limit(5)
                    .get()

            let list = []

            products.docs.forEach
                (
                    function (child) {
                        list.push(
                            {
                                key: child.id,
                                pname: child.data().pname,
                                pprice: child.data().price,
                                pdisc: child.data().discount,
                                priceafterdisc: child.data().priceafterdisc,
                                pimage: child.data().img1,
                                pbrand: child.data().brand
                            }
                        )
                    }
                )

            setproducts(list)
            setloading(false)
        }
        catch (err) {
            setloading(false)
        }

    }
    useEffect
        (
            () => {
                getSimilarItemData()
            },
            []
        )


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
            <View style={styles.itemContainer}>
                <Text
                    style={styles.txtItemName}>
                    MORE FROM {brand}
                </Text>
                <TouchableOpacity
                    style={styles.btnNavigate}
                    onPress={() => navigation.navigate("SimilarBrands",
                        {
                            brandname: brand,
                            name: brand
                        }
                    )}
                    disabled={(products != undefined && products.length > 0) ? false : true}
                >
                    <Text
                        style={styles.txtViewMore}
                    >VIEW MORE</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.listContainer}>
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

const styles = StyleSheet.create
    (
        {
            txtItemName:
            {
                fontFamily: fonts.Quicksand_Medium,
                fontWeight: "bold",
                fontSize: 20,
                textTransform: 'uppercase',
                textAlignVertical: "center",

                width: '70%'


            },
            itemContainer:
            {
                flexDirection: "row",
                marginVertical: 10,
                justifyContent: "space-between"
            },
            btnNavigate:

            {
                backgroundColor: "black",
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: "center"
            },
            txtViewMore:
            {
                color: "white",
                margin: 10,
                textAlignVertical: 'center'
            },
            listContainer:
            { 
                flex: 1 
            }


        }
    )
export default Samebrand