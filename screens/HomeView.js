
import React from "react";
import { 
Button,Image,SafeAreaView, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView

 } from "react-native";

import {  createStackNavigator, HeaderTitle} from "@react-navigation/stack";
import Home_screen from "./Home_screen";
import product from "./Product";
import Product_list from "./Product_list";
import Comments from "./Comments";
import Search from "./Search";

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import VisionSearch from "./VisionSearch";
import SimilarProducts from "./SimilarProducts";
import SimilarBrands from "./SimilarBrands";
const newnav=createStackNavigator()
   const HomeView=({navigation})=>
{


    return(
        <newnav.Navigator
        initialRouteName="Homescreen"
      
       
        >
        <newnav.Screen
        
        options=
        {
            {
                headerShown:false
            }
        }
        name="Homescreen"
        component={Home_screen}
  
          
  />
        <newnav.Screen
        
        options={
    
          ({ route }) => ({ title: route.params.name,headerTransparent:true,headerTitleAlign:"center" })
         
     }
        
        name="product"
        component={product}
        >

        </newnav.Screen>
        <newnav.Screen
        
      
        options={({ route }) => ({ title: route.params.name })}
        name="SimilarProducts"
        component={SimilarProducts}
        />
        <newnav.Screen
        
      
        options={({ route }) => ({ title: route.params.name })}
        name="SimilarBrands"
        component={SimilarBrands}
        />
        <newnav.Screen
        
        options={{
          headerTitleAlign:'center',
          
          
         }}
        
        name="Comments"
        component={Comments}
        />
        
        <newnav.Screen
        
        options={{
          headerTitleAlign:'center'
         ,headerShown:false}}
        
        name="VisionSearch"
        component={VisionSearch}
        >
        
        </newnav.Screen>
        <newnav.Screen
        
        options={{
          headerTitleAlign:'center'
         ,headerShown:false}}
        
        name="Search"
        component={Search}
        >

        </newnav.Screen>

        <newnav.Screen
         options={({ route }) => ({ title: route.params.name ,
        
          headerRight: () => (
           <TouchableOpacity
           style={{
             margin:10

           }}
           onPress={
          ()=>navigation.navigate('Search')
           }
           >
             <FontAwesome5Icon
             name={'search'}
             size={20}
             color={"grey"}
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