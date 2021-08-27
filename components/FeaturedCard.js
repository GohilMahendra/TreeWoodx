

import React, { useCallback, useEffect, useRef, useState } from "react";
import { 
    View,
    Text
 } from "react-native";


import { Dimensions } from "react-native";

import { Image } from "react-native";
import { fonts } from "../constants/fonts";
import { TouchableOpacity } from "react-native";
import {Snackbar  } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { ImageBackground } from "react-native";
import { Item } from "react-native-paper/lib/typescript/components/List/List";


const FeaturedCard=(props,{forshow=false})=>
{


    const {data}=props

    const bottomsheetref=useRef()
    


 
    return(
      
        <TouchableOpacity
        style={
            {
                
              height:200,
                
                marginHorizontal:20,
               
                borderRadius:15,
                marginHorizontal:20,
               
                borderRadius:15,

                
              
                
            }
        }

        onPress={
            
            ()=>{    navigation.navigate('poduct',{
                item:{
                    key:data.key
                }
            })}
            
        }
        disabled={forshow?false:true}
        >
     
    


         <LinearGradient
        style={
            {
                flex:1,
                borderRadius:20,
                
            }
        }
        colors={[data.background_color,data.background_color_2]}
        >      
        <View
        style={
            {
             
                flex:1,
                flexDirection:"row",
                
            }
        }
        s
        >
            <View
            style={
                {
                    width:'60%',
                    justifyContent:"center",
                    alignItems:'center',
                    //elevation:5    ,
                   
                               
                }
            }
            
            >
                <View
                style={
                    {
                      
                        borderColor:'#fff',
                        borderWidth:2,
                       
                        alignItems:'center',
                       
                    }
                }
                >
            <Text
            style={
                {
                   
                    marginVertical:10,
                    color:data.font_headline_color,
                    fontFamily:data.font_headline_fontstyle,
                    fontSize:18
                }
            }
            >{data.headline}</Text>
            <Text
            style={
                {
                   
                    color:data.font_brand_color,
                    fontFamily:fonts.Federo_Regular,
                    
                    margin:10,

                    fontSize:20
                }
            }
            >{data.pbrand} 'S {data.pname}</Text>
           {(data.focus=='discount') ?
           
           <View
           style={
               {
                   backgroundColor:"transparent",
                   borderWidth:1,
                   margin:10
                  
               }
           }
           >
           <Text
             style={
                {
                    marginHorizontal:10,
                    color:"black",

                    fontFamily:data.font_focus_fontstyle,
                    
                    fontSize:25
                }
            }
            >
                {data.pdisc} % OFF
            </Text>
            </View>
            :<View
            
            style={
                {
                    flexDirection:"row",
                    justifyContent:"space-between"
                }
            }>
            <Text
             style={
                {
                    marginVertical:10,
                    color:data.focus_color,
                    fontFamily:data.font_focus_fontstyle,
                    
                    fontSize:25
                }
            }
            >
                RS {data.pprice-(data.pdisc*data.pprice/100)}
            </Text>
            <Text
             style={
                {
                    marginVertical:10,
                    color:"#fff",
                    fontFamily:data.font_focus_fontstyle,
                   alignSelf:'center',
                    color:"silver", 
                    fontSize:18,
                    textDecorationLine:"line-through",
                    textDecorationStyle:"dotted"
                }
            }
            >
                RS {data.pprice}
            </Text>
            </View>
            }
            </View>
            </View>

            <View
            style={
            {
                width:'40%',
                justifyContent:"center"
            }
            }
            >
                <Image
                source={
                    {
                        uri:"data:image/jpeg;base64,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"
                    }
                }
                //blurRadius={2}
                style={
                    {
                      
                        height:"70%",
                        margin:10,
                       
                        opacity:0.65
                        ,
                        
                        backgroundColor:data.backgroundColor,
                        borderTopLeftRadius:data.imageleftRadios,
                        borderBottomRightRadius:data.imageRIghtRadios

                    }
                }
               
                >

                </Image>
            </View>
                
        </View>

     
        </LinearGradient>   

        </TouchableOpacity>
        
        

    )
}

export default FeaturedCard