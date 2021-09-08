

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


const {height,width}=Dimensions.get('screen')

const FeaturedCard=(props)=>
{


    const {data}=props

    
    console.log(data.background_color 
        +"for"+data.pname)

  //  console.log(data)
 
    return(
      
        <View
        style={
            {
                
          

              flex:1,
                borderRadius:15,

                borderRadius:15,

            }
        }
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
                        borderWidth:0.2,
                       

                        borderRadius:data.border_radius,
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
                   borderRadius:10,
                   backgroundColor:data.focus_background_color,
                
                   margin:10
                  
               }
           }
           >
           <Text
             style={
                {
                    marginHorizontal:10,
                    color:data.font_focus_color,

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
                    backgroundColor:data.focus_background_color,
                    flexDirection:"row",
                    borderRadius:10,
                    margin:10,
                    justifyContent:"space-between"
                }
            }>
            <Text
             style={
                {
                    
                    color:data.font_focus_color,
                    fontFamily:data.font_focus_fontstyle,
                    marginHorizontal:10,
                    alignSelf:'center',
                    fontSize:18
                }
            }
            >
                RS {data.pprice-(data.pprice*data.pdisc)/100}
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
                        uri:data.pimage
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

        </View>
        
        

    )
}

export default FeaturedCard