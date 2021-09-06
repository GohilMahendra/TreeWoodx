
import React, { useEffect, useRef, useState } from "react";
import { Dimensions,Picker, Image,Button, Pressable, Text,TextInput,View } from "react-native"
;

import Modal from "react-native-modal";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import  Swipeable  from "react-native-gesture-handler/Swipeable";


import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/core";
import Animated from "react-native-reanimated";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Slider } from "react-native-elements/dist/slider/Slider";
import { Searchbar } from "react-native-paper";
import { Card } from "react-native-elements/dist/card/Card";
import { fonts } from "../constants/fonts";
import ProductCard from "../components/Product_list/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { LoadProducts, searchProd } from "../redux/Actions/ProductActions";
import Search from "./Search";

const Product_list=()=>


{
    const navigation=useNavigation()

    

    const searchRef=useRef()


    const product=useSelector(state=>state.Products.products)

    const dispatch=useDispatch()
    const [search,setserach]=useState('')
    const [filters,setfilters]=useState(
      {
        price:0,
        discount:0,

      }
    )

    
    const p=useRoute()
    var item=p.params.item
    

    const [category,setcategory]=useState(item==undefined?null:item)
    const [visible,setvisible]=useState(true)
    const {height,width}=Dimensions.get('screen')





    // useEffect
    // (
    //   ()=>
    //   {

    //     if(item=="search")
    //     searchRef.current.focus() 
    //   },
    //   []
    // )
    const searchProduct=()=>
    {
       


     dispatch(searchProd(search))


    
    }

    const itembuilder=({item,index})=>

    {
       
     const disc=item.pprice-item.pprice*item.pdisc/100   
    
     console.log(item)

     return(

      
      <ProductCard
      navigation={navigation}
      item={item}
      index={index}
      height={height}
      width={width}
      >

      </ProductCard>
          
          
        )
    }
   

    useEffect
    (
      ()=>
      {
        searchProduct()

      },
      [search]
    )
    useEffect
    (   ()=>{ 
      dispatch(LoadProducts(category))
      setcategory(null)

    }
      ,[]
    )



    return(
    <View style={{flex:1,alignItems:"center",backgroundColor:'#fff'}}>
     
        
      
       
       <View style={
         {
           flexDirection:"row",
          
           justifyContent:"space-between"
         }
       }>
    
      <Searchbar
      
      ref={searchRef}

      onChangeText={setserach}
      
      style={
        {
          width:'80%',
          borderRadius:20
        }
      }
      >

      </Searchbar>
      <TouchableOpacity
      style={
        {
          backgroundColor:"black",
          borderRadius:20
        }
      }
      >
        <FontAwesome5Icon name="filter"
        style={{margin:10}}
        size={30} color={"#fff"}></FontAwesome5Icon>
      </TouchableOpacity>
      </View>
      <Modal isVisible={false}
      
      onBackdropPress={()=>setvisible(false)}
      >
        <View style={{height:height/2,
          justifyContent:"space-evenly",
          alignSelf:"center",
          width:width-20,
          borderRadius:30,
          backgroundColor:'#fff'}}>


        <TouchableOpacity> 
        <Text style={{alignSelf:"flex-end",
        fontFamily:"Quicksand-Medium",
        fontSize:18,
        
        color:"#0198E1",
        marginRight:20}}>RESET FILTERS</Text>
        </TouchableOpacity> 
        <Text style={{fontSize:30,alignSelf:"center"}}>SORT BY</Text>
        
        <Slider
        minimumValue={0}
        step={5000}

        onSlidingComplete={(value)=>setfilters({...filters,price:value})}
        maximumValue={100000}
        >

        </Slider>
        <Text>{filters.price}</Text>
          <Button  title="APPLY" onPress={()=>setvisible(!visible)} />
        </View>
      </Modal>
    


      
     
        <FlatList
        


        
        style={{flex:1}}
        data={product}
        numColumns={2}
        keyExtractor={item=>item.key}
        renderItem={itembuilder}
        >

        </FlatList>
    
      
     </View>
    )
}

export default Product_list