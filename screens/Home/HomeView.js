
import React from "react";
import {
  Button, Image, SafeAreaView, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView

} from "react-native";

import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import Home_screen from "./Home_screen";
import product from "../Product/Product";
import Product_list from "../Product/Product_list";
import Comments from "../Comments/Comments";
import Search from "../Search/Search";

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import SimilarProducts from "../Product/SimilarProducts";
import SimilarBrands from "../Product/SimilarBrands";
const newnav = createStackNavigator()
const HomeView = ({ navigation }) => {


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
        component={product}
      >
      </newnav.Screen>

      <newnav.Screen
        options={({ route }) => ({ title: route.params.name 
        ,headerTitleAlign:"center"
        })}
        name="SimilarProducts"
        component={SimilarProducts}
      />

      <newnav.Screen
        options={({ route }) => ({ title: route.params.name 
          ,headerTitleAlign:"center"
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
          title: route.params.name,
          headerTransparent:true,
        //  headerShown:true,
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginHorizontal:20

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
export default HomeView