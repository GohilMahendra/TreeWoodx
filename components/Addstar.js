import React from "react";

import { View } from "react-native";

import  FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const AddStar=(star)=>
  {

    star=star.star
    
    return(
      <View style={{flexDirection:'row',margin:20,marginTop:0}}> 

 
  <FontAwesome5Icon name="star" size={30} solid={(star>=1)?true:false}></FontAwesome5Icon>
 
 
  <FontAwesome5Icon name="star" size={30}  solid={(star>=2)?true:false}></FontAwesome5Icon>
 
  <FontAwesome5Icon name="star" size={30}  solid={(star>=3)?true:false}></FontAwesome5Icon>
 
  <FontAwesome5Icon name="star" size={30}  solid={(star>=4)?true:false}></FontAwesome5Icon>

  <FontAwesome5Icon name="star" size={30}  solid={(star>=5)?true:false}></FontAwesome5Icon>

  </View>


    )
  }

  export default AddStar
