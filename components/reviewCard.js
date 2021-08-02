import React from "react";
import { Dimensions } from "react-native";

import { View ,Text} from "react-native";


import AddStar from "./Addstar";
const ReviewCard=({rev})=>
  {

   // console.log(rev)
    
    
    const {height,width}=Dimensions.get('screen')
    return(
        <View style={{marginHorizontal:20,
            width:width-40,
            borderRadius:15,
            alignSelf:"center",
            borderTopWidth:1,
            marginTop:20,
            borderBottomWidth:1,
            backgroundColor:"transparent"}}>
           
        
               
          <View style={{flexDirection:"row",
          alignItems:"center",
          justifyContent:"space-between"}}>
    
    
    
          <AddStar
          star={rev.star}
          />
          <Text style={{
            textAlign:'center',
            marginHorizontal:20,
            textAlignVertical:'center'
          }}>{rev.date}</Text>
         
        
        
         
          </View>
          <Text style={{
            fontSize:20,
            marginHorizontal:20,
            fontWeight:'bold'}}>{rev.email}</Text>
         
    
    
    
         <Text style={{fontSize:15,marginHorizontal:20}}>{rev.review}</Text>
          </View>


    )
  }

  export default ReviewCard
