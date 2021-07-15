import React from "react";
import {View,Text, TextInput, Dimensions, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
import {  } from "@boltsource/react-viro";
const Payment=()=>
{


  const {height,width}=Dimensions.get('screen')
    return(
        <View style={{flex:1}}>
       
       <View style={{height:height/3
    
     
       }}>


       <LinearGradient
       style={{flex:1, borderBottomLeftRadius:90,justifyContent:'center',
        borderBottomRightRadius:90,alignItems:'center'}}
        colors={['pink','blue']}
       >
          <Text style={{fontSize:30,fontWeight:'bold',textShadowColor:'#fff'
        ,color:'#fff',textShadowOffset:{height:0,width:0},shadowOpacity:1,textShadowRadius:20
        }}>Paypal</Text>
       </LinearGradient>
     
       </View>
     
     <View style={{margin:20,backgroundColor:'#fff',borderRadius:30}}>
      <TextInput
      placeholder="Enter your name here"
    
      style={{margin:20,borderRadius:20,borderWidth:1,textAlign:'center'}}>
    
      </TextInput>
      <TextInput
      placeholder="Credit Card Number(16 digit12)"
      style={{borderRadius:20,alignContent:'center',alignItems:'center',
      textAlign:'center',borderWidth:1,margin:20}}>
    
      </TextInput>

      <View style={{flexDirection:'row',justifyContent:"space-between"}}>

      <TextInput
      placeholder="Expiry Date"
      style={{borderRadius:20,borderWidth:1,margin:20}}>
    
      </TextInput>
      <TextInput
      maxLength={3}
      placeholder="CVV"
      style={{borderRadius:20,width:70,textAlign:'center',borderWidth:1,margin:20}}>
    
      </TextInput>
      </View>


      </View>
      
      <TouchableOpacity style={{margin:20,justifyContent:'center',
      height:70,alignItems:'center',borderRadius:30,backgroundColor:'blue'}}>

<LinearGradient
style={{flex:1,height:70,width:'100%',justifyContent:'center',borderRadius:30}}
    colors={['pink','blue']}
    >
       <Text style={{color:'#fff',textAlign:'center',
       textAlignVertical:'center',fontSize:20}}>PAY</Text>
      
       </LinearGradient>
      </TouchableOpacity>
   
        </View>
    )
}

export default Payment