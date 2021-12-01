
import React from "react";
import { View, Text,Image, StyleSheet, ImageBackground, RefreshControl } from "react-native";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import FeaturedCard from "../../components/Featured/FeaturedCard";
import { Color, colorThemes } from "../../constants/colors";
import { deleteFeaturedProduct, fetchFeaturedProducts } from "../../redux/Actions/FeaturedActions";

const FeaturedList = () => {


    const dispatch = useDispatch()

    const featured = useSelector(state => state.Featured.featuredProducts)
   
    const loading=useSelector(state=>state.Featured.featuredLoading)
   const loadFeatured=()=>
   {
    dispatch(fetchFeaturedProducts())
   }
    useEffect
        (
            () => {
              
                loadFeatured()
            },
            []
        )

    const onRefresh=()=>
    {
        loadFeatured()
    }
    const deleteProdFromFeatured=(pid)=>
    {
        dispatch(deleteFeaturedProduct(pid))
    }
    const renderItem = ({ item, index }) => {


        const colorTheme=colorThemes[0]
        return (
            <View>
                <TouchableOpacity

            onPress={
                ()=>deleteProdFromFeatured(item.key)
            }
            style={
                {
                    backgroundColor:"red",
                    justifyContent:'center',
                    alignItems:"center",
                    alignSelf:'flex-end',
                    marginHorizontal:20,
                    borderRadius:15
                    
                }
            }
            >
                <Text
                style={
                    {
                        fontSize:15,
                        padding:15,
                        color:"#fff"
                    }
                }
                >X</Text>
            </TouchableOpacity>
            <FeaturedCard
            data={item}
            colorTheme={colorTheme}
            ></FeaturedCard>
        
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


export default FeaturedList