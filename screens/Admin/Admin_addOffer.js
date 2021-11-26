

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";


import firestore from "@react-native-firebase/firestore";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import dummydata from "../../constants/dummydata.json";
import { Dimensions } from "react-native";
import { colorsArray } from "../../constants/colors";
import { Image } from "react-native";
import { fonts } from "../../constants/fonts";


import { imagedata } from "../../data/imagedata";

import Carousel from "react-native-snap-carousel";
import { useDispatch, useSelector } from "react-redux";
import { deleteFeaturedProduct, fetchFeaturedProducts } from "../../redux/Actions/FeaturedActions";
import FeaturedCard from "../../components/FeaturedCard";


const { height, width } = Dimensions.get('screen')
const Admin_addOffer = () => {


    const dispatch = useDispatch()

    const featuredData = useSelector(state => state.Featured.featuredProducts)

    useEffect
        (
            () => {

                dispatch(fetchFeaturedProducts())
            },
            []
        )


    const deleteFeatured = (pid) => {
        dispatch(deleteFeaturedProduct(pid))
    }

    const renderItem = ({ item, index }) => {


        console.log("called")

        return (


            <View
                style={
                    {
                        height: 200,

                    }
                }
            >


                <FeaturedCard
                    data={item}
                ></FeaturedCard>

                <TouchableOpacity

                    onPress={() => deleteFeatured(item.key)}
                    style={
                        {
                            backgroundColor: "red",
                            width: 75,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            margin: 10

                        }
                    }
                >
                    <Text
                        style={
                            {
                                color: '#fff'.substr
                            }
                        }
                    >REMOVE</Text>
                </TouchableOpacity>
            </View>



        )
    }

    return (

        <View
            style={
                {
                    flex: 1
                }
            }
        >

            <FlatList
                style={
                    {
                        flex: 1

                    }
                }
                data={featuredData}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            >

            </FlatList>




        </View>
    )
}

export default Admin_addOffer