
import { useRoute } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import { stat } from 'react-native-fs';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';


import {
    FlatList, TouchableOpacity
} from "react-native-gesture-handler";


import ProductCard from "../../components/Product_list/ProductCard";
import { FetchMoreSimilarProducts, FetchSimilarProducts } from '../../redux/Actions/SimilarActions';
import { useEffect } from 'react/cjs/react.development';
const { height, width } = Dimensions.get('screen')
const SimilarProducts = ({ navigation }) => {

    const p = useRoute()
    const dispatch = useDispatch()

    let subcategories = p.params.subcategories

    const products = useSelector(state => state.Similar.similarProducts)

    const lastindex = useSelector(state => state.Similar.lastKeyProduct)

    
    const similarProductsInitialLoading=useSelector(state => state.Similar.similarProductsInitialLoading)
    const similarProductsError=useSelector(state => state.Similar.similarProductsError)

    const moreProductsLoading=useSelector(state => state.Similar.moreProductsLoading)
    const moreProductsError=useSelector(state => state.Similar.moreProductsError)
  
    const fetchMoreProd = () => {
        dispatch(FetchMoreSimilarProducts(subcategories, lastindex))

    }
    const fetchProd=()=>
    {
        if(subcategories==undefined)
        {
            return
        }
        dispatch(FetchSimilarProducts(subcategories))
    }

    useEffect(
        ()=>
        {
            fetchProd()
        },[]
    )
    const itembuilder = ({ item, index }) => {

         return (
            <ProductCard
                navigation={navigation}
                item={item}
                index={index}
                height={height}
                width={width}
            >
            </ProductCard>
        )
    }



    return (
        <View
            style={styles.container}
        >
            <FlatList
                style={{ flex: 1 }}
                data={products}
                refreshControl={
                    <RefreshControl
                    refreshing={similarProductsInitialLoading}
                    onRefresh={()=>fetchProd()}
                    ></RefreshControl>
                }
                numColumns={2}
                keyExtractor={item => item.key}
                onEndReached={
                    ()=>fetchMoreProd()
                }
                renderItem={itembuilder}
                ListFooterComponent={
                   <ActivityIndicator
                   animating={moreProductsLoading?true:false}
                   >
                   </ActivityIndicator>
                }
            >
            </FlatList>

        </View>
    )
}

const styles = StyleSheet.create
    (
        {
            container:
            {
                flex: 1,
                backgroundColor:'#E3E8F0'
            }
        }
    )
export default SimilarProducts