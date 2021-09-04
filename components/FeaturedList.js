

import React, { useCallback, useEffect, useRef, useState } from "react";
import { 
    View,
    Text,
    
 } from "react-native";

 import { 

    FlatList
  } from "react-native-gesture-handler";

import { Dimensions } from "react-native";

import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import firestore from "@react-native-firebase/firestore";
const {height,width}=Dimensions.get('screen')
import FeaturedCard from "./FeaturedCard";


const FeaturedList=()=>
{




    const navigation=useNavigation()
    const [featured,setFeatured]=useState([])

    const [load,setload]=useState(false)

    const featuredFetcher=async()=>
{

    try
    {
    setload(true)
    const featuredx=await firestore().collection('featured').get()
    list=[]
    featuredx.forEach
    (
        (child)=>
        {


           // console.log(child)
         
            list.push(child.data())
        }
    )
    if(list!=[])
    {
    setFeatured(list)
    setload(false)
}
    }
    catch(err)
    {
        console.log(err)
    }
}


useEffect
(
    ()=>
    {

        featuredFetcher()
    },
    []
)

const FeaturedBuilder=({item,index})=>
{


    console.log(item.pname)
// console.log(JSON.stringify(item)+'featured item')
    return(
        <TouchableOpacity
        
        onPress={
            ()=>navigation.navigate('product',
            {
                item:{
                    key:item.key
                }
            })
        }
        style={
            {

            
                height:height/3,
                width:'100%'

            }
        }
        >
            <FeaturedCard
            data={item}
            >

            </FeaturedCard>
        </TouchableOpacity>
    )
}
  return(

      <View>
            <FlatList
            horizontal
            style={
            {
                margin:10,
                height:height/3.5,
                width:width-20
                
            }
            }


            data={featured}
            renderItem={FeaturedBuilder}
            keyExtractor={item=>item.key}
            >

            </FlatList>

           {load && <ActivityIndicator
            style={
                {
                    position:"absolute",
                    alignSelf:'center',
                    top:'40%'



                }
            
            }
            animating={true}
            size={"large"}
            color={"black"}
            >

            </ActivityIndicator>}

      </View>
  )
            
    
}

export default FeaturedList