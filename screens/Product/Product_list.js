
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Picker, RefreshControl, Image, Button, Pressable, Text, TextInput, View, StyleSheet } from "react-native";

import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation, useRoute } from "@react-navigation/core";

import { ActivityIndicator, Searchbar } from "react-native-paper";
import Modal from "react-native-modal";
import ProductCard from "../../components/Product_list/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { LoadProducts, loadMoreProducts } from "../../redux/Actions/ProductActions";
import ProductFilter from "../../components/Product_list/ProductFilter";

import LinearGradient from "react-native-linear-gradient";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const Product_list = () => {
  const navigation = useNavigation()

  const p = useRoute()
  const product = useSelector(state => state.Products.products)
  const prodLoad = useSelector(state => state.Products.prodLoad)
  const moreproductsLoad = useSelector(state => state.Products.moreproductsLoad)
  const lastindex = useSelector(state => state.Products.lastindex)


  const dispatch = useDispatch()
  const [isVisible,setisVisble]=useState(false)

  const [filters, setfilters] = useState(
    {
        material:"",
        priceRange:"",
        cat:"",
        search:"",
        brand:"",
        color:"",
        discountRange:"",
    }
  )
  const [search,setsearch]=useState("")



  const isAllfiltersNull=()=>
  {
    return filters.material===""&&
    filters.cat===""&&
    filters.brand===""&&
    filters.search===""&&
    filters.color===""&&
    filters.priceRange===""&&
    filters.discountRange===""
  }
  const makeInvisible=()=>
  {
    setisVisble(false)
  }

  useEffect(
    ()=>
    {
      if(p.params!=undefined)
      {
        if(p.params.item!=undefined)
        {

          if(p.params.item!="All")
          setfilters(
            {
              ...filters,cat:p.params.item
            }
          )
        }
        else if(p.params.search!=undefined)
     setfilters({...filters,search:p.params.search}) 
     else if(p.params.brand!=undefined)
     setfilters({...filters,brand:p.params.brand}) 
      }
    },
    []
  )

  const resetFilter=(val)=>
  {
    setfilters(val)
  }
  const { height, width } = Dimensions.get('screen')

  const loadMoreProd = () => {
    dispatch(loadMoreProducts(filters, lastindex))

  }

  const getProducts=()=>
  {
    dispatch(LoadProducts(filters))
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

       getProducts()
     
      },
      [filters]
    )


  return (
    <View style={styles.Container}>

 
      <FlatList      
        refreshControl={
          <RefreshControl
            onRefresh={getProducts}
            refreshing={prodLoad}
          >
          </RefreshControl>
        }

        style={{ flex: 1,marginTop:50 }}
        data={product}
        numColumns={2}
        onEndReached={
          () => loadMoreProd()
        }
        keyExtractor={item => item.key}
        renderItem={itembuilder}
      >

      </FlatList>


    <View
     style={
       {
         height:70,
    
         width:70,
         borderRadius:70,
         position:"absolute",
         right:5,
         backgroundColor:"#fff",
         bottom:20
       }
     }
     >
      
      <TouchableOpacity
      onPress={()=>setisVisble(true)}
     style={{height:'100%',width:'100%'}}
     >
         <LinearGradient
         style={{flex:1,justifyContent:'center',
         alignItems:'center',borderRadius:50}}
         colors={["violet",
        "purple"]}
         >
      
         <FontAwesome5Icon
         name="filter"
         size={30}
         color={"#fff"}
         >

         </FontAwesome5Icon>
      
         </LinearGradient>

       </TouchableOpacity>
 
     </View>

      <ActivityIndicator
        animating={prodLoad ? true : false}
        style={{
          position: "absolute",
          alignSelf: 'center',
          top: '50%'
        }}
        size={30}
      >
      </ActivityIndicator>
      <Modal
      onBackButtonPress={()=>setisVisble(false)}
      isVisible={isVisible}
      >
        <View

        style={
          {
            height:'80%',
            borderRadius:15,
            backgroundColor:"#fff"
          }
        }
        
        >
           {isVisible && <ProductFilter
            filters={filters}
            
            onPress={resetFilter}
            hideModel={makeInvisible}
            ></ProductFilter>}
        </View>
      </Modal>


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