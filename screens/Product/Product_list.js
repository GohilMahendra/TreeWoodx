
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Picker, RefreshControl, Image, Button, Pressable, Text, TextInput, View, StyleSheet } from "react-native"
  ;

import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation, useRoute } from "@react-navigation/core";

import { ActivityIndicator, Searchbar } from "react-native-paper";

import ProductCard from "../../components/Product_list/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { LoadProducts, loadMoreProducts } from "../../redux/Actions/ProductActions";

const Product_list = () => {
  const navigation = useNavigation()

  const product = useSelector(state => state.Products.products)
  const prodLoad = useSelector(state => state.Products.prodLoad)
  const moreproductsLoad = useSelector(state => state.Products.moreproductsLoad)
  const lastindex = useSelector(state => state.Products.lastindex)

  const dispatch = useDispatch()
  const [search, setserach] = useState("")


  const p = useRoute()
  var item = p.params.item


  const [filters, setfilters] = useState(
    {
        material:"Wood",
        priceRange:"",
        cat:"",
        color:"",
        discountRange:"",
    }
  )

  const { height, width } = Dimensions.get('screen')

  const loadMoreProd = () => {
    dispatch(loadMoreProducts(filters, search, lastindex))

  }

  const itembuilder = ({ item, index }) => {

    return (


      <View
      
      >
        <ProductCard
          navigation={navigation}
          item={item}
          index={index}
          height={height}
          width={width}
        >

        </ProductCard>
      </View>

    )
  }




  useEffect
    (
      () => {

        dispatch(LoadProducts(filters,search))
     
      },
      []
    )


  return (
    <View style={styles.Container}>

      {p.params != undefined && <View>

        <Text>{item}</Text>

      </View>}


      <FlatList

        refreshControl={
          <RefreshControl
            onRefresh={() => dispatch(LoadProducts(filters, search))}

            refreshing={prodLoad}

          >

          </RefreshControl>
        }

        style={{ flex: 1 }}
        data={product}
        numColumns={2}
        onEndReached={
          () => loadMoreProd()
        }
        keyExtractor={item => item.key}
        renderItem={itembuilder}
      >

      </FlatList>


      <ActivityIndicator
        animating={moreproductsLoad ? true : false}
        style={{
          position: "absolute",
          alignSelf: 'center',
          top: '50%'
        }}
        size={30}
      >

      </ActivityIndicator>


    </View>
  )
}

const styles = StyleSheet.create
  (
    {
      Container:
      {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#E6E6FA'
      }
    }
  )
export default Product_list