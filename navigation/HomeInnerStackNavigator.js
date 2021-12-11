
import React from "react";
import {
    Button, Image, SafeAreaView, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView

} from "react-native";

import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Home_screen from "../screens/Home/Home_screen";
import Product from "../screens/Product/Product";

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Product_list from "../screens/Product/Product_list";
import Search from "../screens/Search/Search";
import Comments from "../screens/Comments/Comments";
import SimilarBrands from "../screens/Product/SimilarBrands";
import SimilarProducts from "../screens/Product/SimilarProducts";
import { useNavigation } from "@react-navigation/core";

const newnav = createStackNavigator()
const HomeInnerStackNavigator = () => {


    const navigation=useNavigation()
    return (
        <newnav.Navigator
            initialRouteName="Homescreen"
        
        >
            <newnav.Screen

                options=
                {
                    {
                        headerShown: true,
                        headerTitle: "Home",
                        headerLeft: () =>
                        (
                            null
                        ),

                        headerRight: () =>
                        (
                            <TouchableOpacity
                                onPress={
                                    () => navigation.navigate('Search')
                                }
                                style={{
                                    margin: 10,
                                    marginHorizontal: 20
                                }}
                            >
                                <FontAwesome5Icon
                                    name={'search'}
                                    size={20}

                                ></FontAwesome5Icon>
                            </TouchableOpacity>

                        )

                    }
                }
                name="Homescreen"
                component={Home_screen}
            />

            <newnav.Screen
                options={
                    ({ route }) => ({ title: route.params.name, headerTransparent: true, headerTitleAlign: "center" })
                }
                name="product"
                component={Product}
            >
            </newnav.Screen>

            <newnav.Screen
                options={({ route }) => ({
                    title: route.params.name
                    , headerTitleAlign: "center"
                })}
                name="SimilarProducts"
                component={SimilarProducts}
            />

            <newnav.Screen
                options={({ route }) => ({
                    title: route.params.name
                    , headerTitleAlign: "center"
                })}
                name="SimilarBrands"
                component={SimilarBrands}
            />

            <newnav.Screen
                options={{
                    headerTitleAlign: 'center',
                }}
                name="Comments"
                component={Comments}
            />

            <newnav.Screen
                options={{
                    headerTitleAlign: 'center'
                    , headerShown: false
                }}
                name="Search"
                component={Search}
            >
            </newnav.Screen>

            <newnav.Screen

                options={({ route }) => ({
                    title: route.params.search != undefined ? route.params.search :(route.params.brand)?route.params.brand: "",
                    headerTransparent: true,
                    //  headerShown:true,
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                marginHorizontal: 20

                            }}
                            onPress={
                                () => navigation.navigate('Search')
                            }
                        >
                            <FontAwesome5Icon
                                name={'search'}
                                size={20}
                                color={"black"}
                                solid={false}
                            ></FontAwesome5Icon>
                        </TouchableOpacity>
                    ),
                })}
                name="Product_list"
                component={Product_list}
            >

            </newnav.Screen>

        </newnav.Navigator>

    )
}
export default HomeInnerStackNavigator