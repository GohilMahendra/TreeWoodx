
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Picker, RefreshControl, Image, Button, Pressable, Text, TextInput, View } from "react-native"
  ;

import Modal from "react-native-modal";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation, useRoute } from "@react-navigation/core";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Slider } from "react-native-elements/dist/slider/Slider";
import { ActivityIndicator, Searchbar } from "react-native-paper";

import ProductCard from "../components/Product_list/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { LoadProducts, loadMoreProducts } from "../redux/Actions/ProductActions";

const Product_list = () => {
  const navigation = useNavigation()



  const searchRef = useRef()


  const product = useSelector(state => state.Products.products)
  const prodLoad = useSelector(state => state.Products.prodLoad)
  const moreproductsLoad = useSelector(state => state.Products.moreproductsLoad)
  const lastindex = useSelector(state => state.Products.lastindex)

  const dispatch = useDispatch()
  const [search, setserach] = useState("")


  const p = useRoute()
  var item = p.params.item


  
  const [category, setcategory] = useState(item == undefined ? null : item)
  const { height, width } = Dimensions.get('screen')

  const searchProduct = () => {

    dispatch(LoadProducts(category, search))

  }

  const loadMoreProd = () => {
    //dispatch(loadMoreProducts(category, search, lastindex))

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



  useEffect
  (
    ()=>
    {
      if(p.params!=null)
      {
        if(p.params.type=='search')
        {
          console.log(p.params.search,'type Search')
          setserach(p.params.search)
        }
        else
        {
          dispatch(LoadProducts(category, search))

        }
      }
    }
    ,[]
  )

  useEffect
    (
      () => {

        if(search!="")
        searchProduct()

      },
      [search]
    )


  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: '#E6E6FA' }}>



      <FlatList

        refreshControl={
          <RefreshControl
            onRefresh={() => dispatch(LoadProducts(category, search))}

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

export default Product_list