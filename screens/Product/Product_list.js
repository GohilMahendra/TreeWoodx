
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
import { fonts } from "../../constants/fonts";

const Product_list = () => {
  const navigation = useNavigation()

  const p = useRoute()
  const product = useSelector(state => state.Products.products)
  const prodLoad = useSelector(state => state.Products.prodLoad)
  const moreproductsLoad = useSelector(state => state.Products.moreproductsLoad)
  
  const dispatch = useDispatch()
  const [isVisible, setisVisble] = useState(false)

  const [filters, setfilters] = useState(
    {
      material: "",
      priceRange: "",
      cat: "",
      search: "",
      brand: "",
      color: "",
      discountRange: "",
    }
  )

  const isAllfiltersNull = () => {
    return filters.material === "" &&
      filters.cat === "" &&
      filters.brand === "" &&
      filters.search === "" &&
      filters.color === "" &&
      filters.priceRange === "" &&
      filters.discountRange === ""
  }

  const makeInvisible = () => {
    setisVisble(false)
  }


  useEffect
    (
      () => {

        getProducts()

      },
      [filters]
    )

  useEffect(

    () => {
      if (p.params != undefined) {
        
        if (p.params.item != undefined) {

          if (p.params.item != "All")
            setfilters(
              {
                ...filters, cat: p.params.item
              }
            )
        }
         if (p.params.search != undefined && p.params.brand != undefined) 
      {
        console.log("product search")
        setfilters({ ...filters, search: p.params.search, brand: p.params.brand })
      }
      }
    },
    [p]
  )



  const resetFilter = (val) => {
    setfilters(val)
  }

  const { height, width } = Dimensions.get('window')

  const loadMoreProd = () => {
    dispatch(loadMoreProducts(filters))

  }


  const removeParams = (fieldname) => {


    if (p.params == undefined) {
      return
    }

    switch (fieldname) {
      case "search":
        navigation.setParams({
          search: undefined
        })
        break
      case "item":
        navigation.setParams(
          {
            item: undefined
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
        break
    }

  }

  const getProducts = () => {

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

  const emptyScreen = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: height / 3,
          borderStartWidth: 1,
          margin: 20
        }}
      >
        <Text>NO PRODUCTS FOUND</Text>
      </View>
    )
  }


  return (
    <View style={styles.Container}>


      {
        !isAllfiltersNull()
        &&
        <View
          style={
            {
              flexDirection: "row",
              flexWrap: 'wrap',
              marginTop: 50
            }
          }
        >

          {
            filters.search != ""
            &&
            <TouchableOpacity
              onPress={() => { setfilters({ ...filters, search: "" }), removeParams("search") }}
              style={styles.btnRemoveFilter}
            >
              <Text
                style={styles.txtFilterlabel}
              >{filters.search}</Text>
              <Text
                style={styles.txtRemove}
              >
                X
              </Text>
            </TouchableOpacity>
          }
          {
            filters.brand != ""
            &&
            <TouchableOpacity
              onPress={() => { setfilters({ ...filters, brand: "" }), removeParams("brand") }}
              style={styles.btnRemoveFilter}
            >
              <Text
                style={styles.txtFilterlabel}
              >{filters.brand}</Text>
              <Text
                style={styles.txtRemove}
              >
                X
              </Text>
            </TouchableOpacity>
          }
          {
            filters.cat != ""
            &&
            <TouchableOpacity
              onPress={() => { setfilters({ ...filters, cat: "" }), removeParams("item") }}
              style={styles.btnRemoveFilter}
            >
              <Text
                style={styles.txtFilterlabel}
              >{filters.cat}</Text>
              <Text
                style={styles.txtRemove}
              >
                X
              </Text>
            </TouchableOpacity>
          }
          {
            filters.material != ""
            &&
            <TouchableOpacity
              onPress={() => setfilters({ ...filters, material: "" })}
              style={styles.btnRemoveFilter}
            >
              <Text
                style={styles.txtFilterlabel}
              >{filters.material}</Text>
              <Text
                style={styles.txtRemove}
              >
                X
              </Text>
            </TouchableOpacity>
          }
          {
            filters.color != ""
            &&
            <TouchableOpacity
              onPress={() => setfilters({ ...filters, color: "" })}
              style={[styles.btnRemoveColor, { backgroundColor: filters.color }]}
            >
              <Text
                style={[styles.txtFilterlabel, { color: filters.color === 'white' ? 'black' : '#fff' }]}
              >{filters.color}</Text>
              <Text
                style={styles.txtRemove}
              >
                X
              </Text>
            </TouchableOpacity>
          }
          {
            filters.priceRange != ""
            &&
            <TouchableOpacity
              onPress={() => setfilters({ ...filters, priceRange: "" })}
              style={styles.btnRemoveFilter}
            >
              <Text
                style={styles.txtFilterlabel}
              >{filters.priceRange}</Text>
              <Text
                style={styles.txtRemove}
              >
                X
              </Text>
            </TouchableOpacity>
          }
          {
            filters.discountRange != ""
            &&
            <TouchableOpacity
              onPress={() => setfilters({ ...filters, discountRange: "" })}
              style={styles.btnRemoveFilter}
            >
              <Text
                style={styles.txtFilterlabel}
              >{filters.discountRange}</Text>
              <Text
                style={styles.txtRemove}
              >
                X
              </Text>
            </TouchableOpacity>
          }


        </View>
      }

      <FlatList
        emptyScreen={emptyScreen}
        refreshControl={
          <RefreshControl
            onRefresh={getProducts}
            refreshing={prodLoad}
          >
          </RefreshControl>
        }


        style={[styles.listStyle, { marginTop: !isAllfiltersNull() ? 0 : 50 }]}
        data={product}
        numColumns={2}
        ListFooterComponent={
          moreproductsLoad&&
          <ActivityIndicator
          size={30}
          color="#fff"
          ></ActivityIndicator>
        }
        onEndReachedThreshold={0.3}
        onEndReached={
          () => loadMoreProd()
        }
        keyExtractor={item => item.key}
        renderItem={itembuilder}
      >

      </FlatList>


      <View
        style={styles.filterContainer}
      >

        <TouchableOpacity
          onPress={() => setisVisble(true)}
          style={styles.filterBtn}
        >
          <LinearGradient
            style={styles.filtersGradient}
            colors={["violet",
              "skyblue"]}
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

      <Modal
        onBackButtonPress={() => setisVisble(false)}
        isVisible={isVisible}
      >
        <View

          style={styles.modalContainer}

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
      },
      filterContainer:
      {
        height: 70,
        width: 70,
        borderRadius: 70,
        position: "absolute",
        right: 5,
        elevation: 15,
        backgroundColor: "#fff",
        bottom: 20
      },
      listStyle:
      {
        flex: 1,
        marginTop: 50
      },
      filtersGradient:
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
      },
      filterBtn:
      {
        height: '100%',
        width: '100%'
      },
      modalContainer:
      {
        height: '80%',
        borderRadius: 15,
        backgroundColor: "#fff"
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
        alignSelf: "center",
        fontFamily: fonts.Genos_Regular,
        fontSize: 18
      },
      btnRemoveColor:
      {
        height: 50,
        padding: 10,
        borderRadius: 10,
        margin: 5,
        flexDirection: 'row'
      }

    }
  )
export default Product_list