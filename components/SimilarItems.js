import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button,Image, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import { 

    View,Text
 } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { 
    fonts
 } from "../constants/fonts";

import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { stat } from "react-native-fs";

import { FetchSimilarProducts } from "../redux/Actions/SimilarActions";
 const SimilarItems=({category,navigation,curruntID})=>
 {

     
    if(category==undefined)
    return

    const dispatch=useDispatch()
    const emptyScreen=()=>
    {
        return(

            <View
            style=
            {
                {
                    
                   
                    height:200,
                    justifyContent:"center",
                    alignItems:"center"
                }
            }
            >

            <Text
            style={
                {
                    borderWidth:1,
                    width:width-60,
                    alignSelf:"center",
                    textAlign:"center",
                    
                }
            }
            >NO SiMILAR ITEMS FOUND</Text>

            </View>
        )
        }
    useEffect
    (
        ()=>
        {
        
        
            dispatch(FetchSimilarProducts(category))
        },
        []
    )

   const products=useSelector(state=>state.Similar.similarProducts)

    
    const SimilerItemBuilder=({item,index})=>
    {


        if(item==undefined)
        return
        console.log(item.key)
        return(
      
            <ProductCard
            item={item}
            >

            </ProductCard>
        )
    }
    return(
        <View style={{margin:20}}>
            <View style={{flexDirection:"row",marginVertical:10,justifyContent:"space-between"}}>
            <Text
            style=
            {
                {
                    fontFamily:fonts.Quicksand_Medium,
                    fontWeight:"bold",
                    fontSize:20,
                    textAlignVertical:"center",
                    textAlign:"center"
                }
            }
            >SIMILAR PRODUCTS</Text>
            <TouchableOpacity
            style={
                {
                    
                    backgroundColor:"black",
                    borderRadius:10
                }

            
            }

            onPress={()=>navigation.navigate("SimilarProducts",
            {
                categoryname:category,
                by:"category",
                name:"similar category"
            }
            )}
            disabled={(products!=undefined && products.length>0)?false:true}
            >
                <Text
                style={
                    {
                        color:"white",
                        margin:10
                    }
                }
                >VIEW MORE</Text>

            </TouchableOpacity>
       </View>
      
            <View style={{flex:1}}>

<FlatList
    

    horizontal
    data={products}

    emptyScreen={emptyScreen}
   keyExtractor={(item)=>item.key}

    renderItem={SimilerItemBuilder}



    style={{marginHorizontal:10,height:350}}

    >

    </FlatList>


            </View>

        
        </View>
    )
 }

 export default SimilarItems