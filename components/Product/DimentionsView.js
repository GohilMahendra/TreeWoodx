import React from "react";

import { View,Text, Dimensions } from "react-native";


const {height,width}=Dimensions.get('screen')
const DimentionsView=({productHeight,productWidth,productLength})=>
  {

    return(
      <View style={{flexDirection:'row',
      justifyContent:"space-evenly",
      width:width,marginTop:20}}>
  
      
      <View style={{height:100,
      borderRadius:20,width:100,
        
        justifyContent:'center',alignItems:'center',
        backgroundColor:'#fff', 
          shadowOffset: {width:10, height: 6},
        shadowOpacity:1,shadowColor:'#455fff',
        shadowRadius:20,elevation:30}}>
  
  
      <Text>Height</Text>
      <Text>{productHeight}</Text>
  
      </View>
  
      <View style={{height:100, shadowOffset: 
      {width:20, height: -60},
        shadowOpacity:1,shadowColor:'#455fff',
        shadowRadius:30,elevation:10,
        justifyContent:'center',
        alignItems:'center',borderRadius:20,width:100,
        backgroundColor:'#fff'}}>
  
      <Text>width</Text>
      <Text>{productWidth}</Text>
  </View>
  <View style={{height:100, shadowOffset: {width:10, height: 6},
        shadowOpacity:1,shadowColor:'#fbffff',
  
        shadowRadius:6,elevation:30,justifyContent:'center',
        alignItems:'center',borderRadius:20,width:100,backgroundColor:'#fff'}}>
  <Text>length</Text>
      <Text>{productLength}</Text>
      </View>
      </View>


    )
  }

  export default DimentionsView
