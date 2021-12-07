
import React from "react";
import {
    View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView, ActivityIndicator
    , RefreshControl, Alert,
    BackHandler
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { categories } from "../../constants/categories";
import ProductCard from "../../components/ProductCard";
import FeaturedList from "../../components/Featured/FeaturedList";
import { useDispatch, useSelector } from "react-redux";
import { LoadInitialProducts } from "../../redux/Actions/ProductActions";

const Home_screen = ({ navigation }) => {

    const chair = useSelector(state => state.Products.HomeProducts)
    const homeprodLoad = useSelector(state => state.Products.homeprodLoad)

    const [category, setcategory] = useState("All")

    
    const dispatch = useDispatch()
    //fetch categories

    const chairFetcher = (name) => {

        dispatch(LoadInitialProducts(name))

    }


    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to Exit APP?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };
    useEffect(
        () => {
            const subscription = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            )
            return subscription.remove()
        },
        []

    )
    useEffect
        (
            () => {
                chairFetcher(category)
            }
            , [category]
        )

    const chairbuilder = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={
                    () => navigation.navigate("product",
                        { item: item, name: item.pname }
                    )}
            >
                <ProductCard
                    item={item}
                >
                </ProductCard>
            </TouchableOpacity>
        )
    }

    return (


        <View
            style={Homestyles.Container}>
            <ScrollView>
                <View
                    style={Homestyles.FeaturedContainer}
                >
                    <FeaturedList />
                </View>

                <View
                style={Homestyles.categoryContainer}
                >
                    <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    >
                    {
                        categories.map(
                            item=>
                            {
                                return(
                                    <TouchableOpacity
                                    key={item}
                                   onPress={() =>(item===category)?setcategory("All"):setcategory(item)}
                                    style={[Homestyles.btnCategory,
                                    {backgroundColor: (category === item) ? 'black' : '#fff',}]}>
                                    <Text
                                        style={[Homestyles.txtCategory
                                        ,{color: (category === item) ? 'white' : 'black'}]}>{item}</Text>
                                </TouchableOpacity>
                                )
                            }
                        )
                    }
                    </ScrollView>
                </View>

                <View
                    style={Homestyles.navigationRowContainer}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        BROWSE MORE {category}
                    </Text>

                    <TouchableOpacity
                        style={Homestyles.browsemoreContainer}
                        onPress=
                        {
                            () => {
                                navigation.navigate("Product_list",
                                    {
                                        item: category
                                    }
                                )
                            }
                        }
                    >
                        <FontAwesome5
                            name={'angle-right'}
                            size={30}
                        ></FontAwesome5>
                    </TouchableOpacity>
                </View>

                <FlatList

                    horizontal
                    style={Homestyles.listContainer}
                    data={chair}
                    renderItem={chairbuilder}
                    keyExtractor={item => item.key}
                >
                </FlatList>

            </ScrollView>
            {homeprodLoad && <ActivityIndicator
                style={Homestyles.loadingBar}

                size='large'
                color="green"
            >

            </ActivityIndicator>}
        </View>
    )
}
export default Home_screen

const Homestyles = StyleSheet.create(
    {
        Container:
        {
            flex: 1,
            backgroundColor: "#E3E8F0"
        },
        FeaturedContainer:

        {
            marginVertical: 20
        },
        listContainer:
        {
            height: 350,
            margin: 20,
            marginTop: 0
        },
        categoryContainer:
        {
            flexDirection:'row'
        },
        catList:
        {
            marginHorizontal: 20
        },
        navigationRowContainer:
        {
            flexDirection: 'row',
            marginBottom: 0,
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 20
        },
        btnCategory:
        {
            elevation: 10,
            borderRadius: 10,
            justifyContent: 'center',
            padding: 10,
            alignItems: 'center',
          
            margin: 10,
        },
        browsemoreContainer:

        {
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderRadius: 10,
            elevation: 5
        },
        txtCategory:
        {
            marginRight: 20,
            textAlignVertical: "center",
            marginLeft: 20,
            fontSize: 20,
        
        },
        searchBar:
        {

            width: '80%',
            alignSelf: "center",
            height: 50,
            borderWidth: 1,
            borderRadius: 15,
            margin: 20
        },
        loadingBar:
        {
            alignSelf: "center",
            top: "50%",
            left: "50%",
            position: 'absolute'
        }

    }
)