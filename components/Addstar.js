import React from "react";

import { View,Text } from "react-native";

import  FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const AddStar=({star})=>
  {

    
    return(
      <View style={{flexDirection:'row',
      width:70,
      justifyContent:"space-evenly",
      margin:20,
      marginTop:0,
      borderRadius:15,
      backgroundColor:"green",
     
      }}> 

      
      <FontAwesome5Icon
     
      name={'star'}
      size={25}
      color={"#fff"}
      solid={true}
      >

      </FontAwesome5Icon>
      <Text
      style=
      {
        {
          fontSize:20,
          color:'#fff',
          textAlign:"center",
          textAlignVertical:"center",

          
        }
      }
      >
        {star}
      </Text>
  </View>


    )
  }

  export default AddStar
