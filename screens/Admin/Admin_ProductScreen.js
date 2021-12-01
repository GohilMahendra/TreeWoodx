import React, { useEffect, useState } from "react";
import { View, Dimensions, Image, Text, ScrollView, RefreshControl } from "react-native";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Color, colorsArray } from "../../constants/colors";

import CustomFab from "../../components/Admin_Product/CustomFab";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, LoadProducts } from "../../redux/Actions/ProductActions";
import { fonts } from "../../constants/fonts";
import ProductCardEditer from "../../components/Admin_Product/ProductEditerCard";

const Admin_editProd = ({ navigation }) => {

   
    const dispatch = useDispatch()
    const { height, width } = Dimensions.get('screen')


    const fetchProd = () => {
        dispatch(LoadProducts(null))
    }
    useEffect
        (
            () => {
                fetchProd()
            },
            []
        )


    const deleteProd = (productID) => {

        dispatch(DeleteProduct(productID))

    }


    const data = useSelector(state => state.Products.products)
    const loading = useSelector(state => state.Products.prodLoad)


    const prodBuilder = ({ item, index }) => {

        console.log(item.pimage)

        return (

            <ProductCardEditer
            item={item}
            />
           
        )

    }

    return (
        <View style={{ flex: 1 }}>


            <FlatList
                data={data}
                renderItem={prodBuilder}
                keyExtractor={item => item.key}
                refreshControl={
                    <RefreshControl
                        onRefresh={fetchProd}
                        refreshing={loading}
                    ></RefreshControl>
                }
            >
            </FlatList>

            <CustomFab
                navigation={navigation}
            >

            </CustomFab>
        </View>
    )
}
export default Admin_editProd