
import { useRoute } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSimilarBrands } from '../redux/Actions/FeaturedActions';


const SimilarBrands = ({ navigation }) => {


    const p = useRoute()


    //const by=p.params.by,
    let name = p.params.brandname


    const dispatch = useDispatch()
    console.log(name + "__brand name recieved")


    const brands = useSelector(state => state.Similar.similarBrands)




    useEffect(
        () => {
            dispatch(FetchSimilarBrands(name))

        }, []
    )

    const itembuilder = ({ item, index }) => {

        const disc = item.pprice - item.pprice * item.pdisc / 100

        console.log(item)

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







            {/* <FlatList
        


        
        style={{flex:1}}
        data={product}
        numColumns={2}
        keyExtractor={item=>item.key}
        renderItem={itembuilder}
        >

        </FlatList>
     */}

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