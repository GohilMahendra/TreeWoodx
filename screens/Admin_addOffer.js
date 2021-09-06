

import React, { useCallback, useEffect, useRef, useState } from "react";
import { 
    View,
    Text
 } from "react-native";


import firestore from "@react-native-firebase/firestore";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import dummydata from "../constants/dummydata.json";
import { Dimensions } from "react-native";
import { colorsArray } from "../constants/colors";
import { Image } from "react-native";
import { fonts } from "../constants/fonts";
import { TouchableOpacity } from "react-native";
import {Snackbar  } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { ImageBackground } from "react-native";
import FeaturedCard from "../components/FeaturedCard";
import { useDispatch } from "react-redux";

import {  
    ADD_TO_CART_REQUEST
} from "../redux/Types/CartTypes";
import { fetchCartproducts } from "../redux/Actions/CartActions";



import { imagedata } from "../data/imagedata";

import  Carousel from "react-native-snap-carousel";


const {height,width}=Dimensions.get('screen') 
const Admin_addOffer=()=>
{




    const data=
    [
     "https://media.istockphoto.com/photos/ikea-furniture-retail-store-picture-id458735317?k=20&m=458735317&s=612x612&w=0&h=ZGfTOSH0AP-_tiT6Odx2xdzSC3A9ZPxxIPxdA0Q5YaU=",
    "https://images.livemint.com/img/2021/06/16/1600x900/AFP_9C798F_1623852372865_1623852565862.jpg"
    ]

    useEffect
    (
        ()=>
        {

      
          console.log(activeIndex)
        },
        [activeIndex,setActiveIndex]
    )
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState(imagedata);
    const ref = useRef(null);

    const [img,setimg]=useState(data[0])

    const renderItem = ({ item, index }) => 
    {
    
     
    return(

        <View

        style={
            {
                height:height/2,
                width:width-20,
                borderRadius:15,
                backgroundColor:"#fff",
                margin:10
            }
        }
        >
            <Image
    
    source={
        {
            uri:item
        }
    }
    style={
        {
           flex:1,
            borderRadius:20
        }
    }
    resizeMode="cover"


            >

            </Image>
        </View>


        )
        }
   
    return(
        
        <View
        style={
            {
                flex:1
            }
        }
        >

    
       



     <Carousel
     
     
     
     layout="default"
     layoutCardOffset={5}
     ref={ref}

     itemHeight={300}
  
     itemWidth={width}
     data={data}

     renderItem={renderItem}
     sliderWidth={width}
     />

        </View>
    )
}

export default Admin_addOffer