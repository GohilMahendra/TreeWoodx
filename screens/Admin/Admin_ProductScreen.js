import React, { useEffect, useState } from "react";
import { View, Dimensions, Image, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Color, colorsArray } from "../../constants/colors";

import CustomFab from "../../components/Admin_Product/CustomFab";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, LoadProducts } from "../../redux/Actions/ProductActions";
import { fonts } from "../../constants/fonts";
import ProductCardEditer from "../../components/Admin_Product/ProductEditerCard";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/core";
import { off } from "npm";
import Search from "../Search/Search";

const Admin_editProd = ({ navigation }) => {


    const dispatch = useDispatch()



    //const navigation = useNavigation()
    const route = useRoute()
    const [filters, setfilters] = useState(
        {
            search: "",
            brand: ""
        }
    )



    useEffect(
        () => {
            if (route.params != undefined) {
                if (route.params.search != undefined && route.params.brand != undefined) {
                    setfilters({ search: route.params.search, brand: route.params.brand })

                }
                else {
                    if (route.params.search != undefined) {
                        setfilters({ ...filters, search: route.params.search })
                    }
                    if (route.params.brand != undefined) {
                        setfilters({ ...filters, brand: route.params.brand })
                    }
                }
            }
        }, [route.params]
    )

    const removeParams = (param) => {
        switch (param) {
            case "search":
                navigation.setParams(
                    {
                        search: undefined
                    }
                )
                break
            case "brand":
                navigation.setParams(
                    {
                        brand: undefined
                    }
                )
                break
            default:
                navigation.setParams(
                    {

                        undefined
                    }
                )
        }
    }
    const fetchProd = () => {
        dispatch(LoadProducts(filters))
    }



    useEffect
        (
            () => {
                fetchProd()
            },
            [filters]
        )


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
        <View style={styles.Container}>
            {
                (filters.search != "" || filters.brand != "")
                &&
                <View
                    style={styles.rowContainer}
                >
                    {
                        filters.search != ""

                        &&
                        <TouchableOpacity
                            onPress={() => { setfilters({ ...filters, search: "" }), removeParams("search") }}
                            style={styles.btnRemoveFilter}
                        >
                            <Text style={styles.txtFilterlabel}>{filters.search}</Text>
                            <Text style={styles.txtRemove}>X</Text>
                        </TouchableOpacity>

                    }
                    {
                        filters.brand != ""

                        &&
                        <TouchableOpacity
                            onPress={() => { setfilters({ ...filters, brand: "" }), removeParams("brand") }}
                            style={styles.btnRemoveFilter}
                        >
                            <Text style={styles.txtFilterlabel}>{filters.brand}</Text>
                            <Text style={styles.txtRemove}>X</Text>
                        </TouchableOpacity>

                    }

                </View>
            }
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

const styles = StyleSheet.create
    (
        {
            Container:
            {
                flex: 1
            },
            txtRemove:
            {
                color: 'black',
                marginHorizontal: 5,
                fontSize: 18,
                backgroundColor: '#fff',
                textAlignVertical: 'center',
                paddingHorizontal: 10
                , borderRadius: 10
            },
            rowContainer:
            {
                flexDirection: 'row',
                flexWrap: 'wrap',
            },
            btnRemoveFilter:
            {
                height: 50,
                padding: 5,
                margin: 5,
                backgroundColor: 'black',
                elevation: 10,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                borderRadius: 10,
            },
            txtFilterlabel:
            {
                color: '#fff',
                fontSize: 18
            },
        }
    )
export default Admin_editProd