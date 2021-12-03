
import { useRoute } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from "react-native-gesture-handler";
import { FetchMoreSimilarBrands, FetchSimilarBrands } from '../../redux/Actions/SimilarActions';
import ProductCard from '../../components/Product_list/ProductCard';

const { height, width } = Dimensions.get('screen')
const SimilarBrands = ({ navigation }) => {


    const p = useRoute()


    //const by=p.params.by,
    let name = p.params.brandname


    const dispatch = useDispatch()

    const brands = useSelector(state => state.Similar.similarBrands)

    const moreBrandsLoading = useSelector(state => state.Similar.moreBrandsLoading)

    const lastindex = useSelector(state => state.Similar.lastKeyBrand)

    const fetchMoreBrands = () => {
        if (lastindex == null)
            return


        dispatch(FetchMoreSimilarBrands(name, lastindex))
    }


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
                data={brands}
                onEndReached={
                    () => fetchMoreBrands()
                }
                numColumns={2}
                keyExtractor={item => item.key}
                renderItem={itembuilder}
                ListFooterComponent={
                    <ActivityIndicator
                        animating={moreBrandsLoading ? true : false}
                    ></ActivityIndicator>
                }
            >

            </FlatList>

            <ActivityIndicator
                animating={false}
            >
            </ActivityIndicator>
        </View>
    )
}

const styles = StyleSheet.create
    (
        {
            container:
            {
                flex: 1,
            }
        }
    )
export default SimilarBrands