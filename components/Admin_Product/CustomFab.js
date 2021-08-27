import React from "react";
import { useState } from "react";
import { ShadowPropTypesIOS } from "react-native";
import { 
View,Text,StyleSheet,Image,SafeAreaView, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView, ActivityIndicator

 } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

 import { 
     fonts
  } from "../../constants/fonts";


  const CustomFab=(props)=>
  {

    const {navigation}=props



    
    const ToggleShow=()=>
    {
        setshow(!show)
    }
    
    
    const [show,setshow]=useState(false)
    return(

    <View
   
    >

     {
        
        show && <TouchableOpacity
    style={
        {
            height:50,
            width:50,
            borderRadius:50,
            position:"absolute",
            bottom:130,
            right:10,
            backgroundColor:'black',
            alignItems:"center",
            justifyContent:"center"
            
        }
    }

 
    >
   

        
        <FontAwesome5Icon
    name="plus"
    color="#fff"

    >

    </FontAwesome5Icon>

    </TouchableOpacity>
  }

  {show &&  <TouchableOpacity
    style={
        {
            height:50,
            width:50,
            borderRadius:50,
            position:"absolute",
            bottom:70,
            right:10,
            backgroundColor:'black',
            alignItems:"center",
            justifyContent:"center"
            
        }
    }
    >
    <FontAwesome5Icon
    name="plus"
    color="#fff"

    >

    </FontAwesome5Icon>

    </TouchableOpacity>
  }
    <TouchableOpacity
    style={
        {
            height:50,
            width:50,
            borderRadius:50,
            position:"absolute",
            bottom:10,
            right:10,
            backgroundColor:'black',
            alignItems:"center",
            justifyContent:"center"
            
        }
    }

    onPress={()=>ToggleShow()}
    >

    {show
    ?
   <Text
   style={
       {
           color:'#fff'
       }
   }
   >
       X
   </Text>
    :
    <FontAwesome5Icon
    name="plus"
    color="#fff"

    >

    </FontAwesome5Icon>
  }
    </TouchableOpacity>
    </View>
    )

  }
  export default CustomFab