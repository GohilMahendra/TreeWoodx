

import React, { useCallback, useEffect, useRef, useState } from "react";
import { 
    View,
    Text
 } from "react-native";


 import { ProgressBar, Searchbar } from "react-native-paper";
 import {
     Slider,ListItem
   } from "react-native-elements";
import { TextInput } from "react-native";

import {  

} from "react-native-paper";
import {  } from "react-native-elements";

import firestore from "@react-native-firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
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

const Admin_addOffer=()=>
{



    const bottomsheetref=useRef()
    
    const [list,setlist]=useState()

    

    const [visible,setvisible]=useState(false)


  

    const {height,width}=Dimensions.get('screen')
    return(
        
        <View
        style={
            {
                flex:1
            }
        }
        >
       
        
   <Text>hu</Text>
      
        </View>
    )
}

export default Admin_addOffer