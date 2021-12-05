
import React,{useEffect} from "react";
import { View, Text, Image, StyleSheet, ImageBackground, RefreshControl } from "react-native";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import FeaturedCard from "../../components/Featured/FeaturedCard";

import { deleteFeaturedProduct, fetchFeaturedProducts } from "../../redux/Actions/FeaturedActions";

const FeaturedList = () => {


    const dispatch = useDispatch()

    const featured = useSelector(state => state.Featured.featuredProducts)

    const loading = useSelector(state => state.Featured.featuredLoading)

    const loadFeatured = () => {
        dispatch(fetchFeaturedProducts())
    }
    useEffect
        (
            () => {

                loadFeatured()
            },
            []
        )

    const onRefresh = () => {
        loadFeatured()
    }
    const deleteProdFromFeatured = (pid) => {
        dispatch(deleteFeaturedProduct(pid))
    }
    const renderItem = ({ item, index }) => {

        return (
            <View>
                <TouchableOpacity

                    onPress={
                        () => deleteProdFromFeatured(item.key)
                    }
                    style={styles.btnRemove}
                >
                    <Text
                        style={styles.txtRemove}
                    >REMOVE</Text>
                </TouchableOpacity>
                <FeaturedCard
                    data={item.data}
                    colorTheme={item.theme}
                ></FeaturedCard>

            </View>

        )
    }

    return (

        <View
            style={styles.Container}
        >
            <FlatList
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh}
                        refreshing={loading}
                    ></RefreshControl>
                }
                keyExtractor={item => item.key}
                renderItem={renderItem}

                data={featured}
                style={
                    {
                        flex: 1
                    }
                }
            ></FlatList>

        </View>
    )
}


const styles = StyleSheet.create
    (
        {
            Container:
            {
                flex: 1,
                backgroundColor: '#fff'
            }
            ,
            txtRemove:
            {
                fontSize: 15,
                padding: 15,
                color: "#fff"
            },

            btnRemove:
            {
                backgroundColor: "red",
                justifyContent: 'center',
                alignItems: "center",
                alignSelf: 'flex-end',
                marginHorizontal: 20,
                borderRadius: 15

            }

        }
    )
export default FeaturedList