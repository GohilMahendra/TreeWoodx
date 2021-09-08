
import React from "react";
import { 
View,Text,StyleSheet,Image,SafeAreaView, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView, ActivityIndicator
,RefreshControl
 } from "react-native";

import  FontAwesome5  from "react-native-vector-icons/FontAwesome5";
import { categories } from "../data/categories";

import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import { Appbar, Searchbar } from "react-native-paper";
import { StatusBar } from "react-native";
import ProductCard from "../components/ProductCard";
import FeaturedCard from "../components/FeaturedCard";
import FeaturedList from "../components/FeaturedList";
import { useDispatch, useSelector } from "react-redux";
import { LoadInitialProducts } from "../redux/Actions/ProductActions";
import { stat } from "react-native-fs";

const Home_screen=({navigation})=>
{
    const {height,width}=Dimensions.get('screen')






    const chair=useSelector(state=>state.Products.HomeProducts)

    console.log(chair)
    const dispatch=useDispatch()
//fetch categories

const chairFetcher=(name)=>
{


    dispatch(LoadInitialProducts(name))

}
 


// //debuging watcher function 
// useEffect
// (
//     ()=>
//     {
//         console.log(featured+"featured data")

//     },
//     [featured]
// )




useEffect
(

    ()=>{
        firestore().collection('products').onSnapshot(
        (snapshot)=> {

        var list=[]
     
        snapshot.forEach(function(child) {
    
    
      
           
            list.push({
                key: child.id,
                pname:child.data().pname,
                pprice: child.data().price,
                pdisc:child.data().discount,
                pimage:child.data().img1,
                pbrand:child.data().brand
              })
        }
        );
        list.reverse()
        setarrival(list)
    
        console.log(chair)
    });}
      ,[arrivel,setarrival]
)

useEffect
(
  ()=>{   
      chairFetcher("All")
}
  ,[]
)

       // const [chair,setchair]=React.useState([])


       
        const [arrivel,setarrival]=useState()
 
        const [ind,setind]=useState(0)
      
        
        const chairbuilder=({item,index})=>
        {
            
          
            return(
               
                   
        <TouchableOpacity 
        
        onPress={()=>navigation.navigate("product",{item:item,name:item.pname})}
      >
                <ProductCard
                
                
                item={item}
                
                >

                </ProductCard>
                </TouchableOpacity>
            )
        }

        const [load,setload]=useState(false)
 
        const arrivalBuilder=({item,index})=>
        {
            return(
                <TouchableOpacity style={{height:150,width:300,
                borderRadius:20
                ,margin:20}}>
                   <Image
                   style={{height:150,
                   backgroundColor:'gray',
                   borderRadius:20}}
                   blurRadius={1}
                   source={{uri:item.pimage}}
                   >
                      
                       </Image> 
                       <Text 
                       style={{
                       fontSize:20,
                       color:"#fff",
                       alignSelf:"center"}}>
                           {item.pname}
                       </Text>
                </TouchableOpacity>
            )

        }

       
        const catbuilder=({item,index})=>
        {
            return(
                <TouchableOpacity
                
                onPress={()=>{setind(index),chairFetcher(item.name)}}
                style={{height:100
                    ,
                    width:100,
                    elevation:12,borderRadius:20
                    ,justifyContent:'center',
                    alignItems:'center',
                backgroundColor:(ind==index)?'black':'white',
                marginRight:20,borderWidth:1,borderRadius:20}}>
      
                   
                    <Text 
                    style={{marginRight:20,
                    textAlignVertical:"center",
                    marginLeft:20,
                    fontSize:20,
                    color:(ind==index)?'white':'black'}}>{item.name}</Text>
                   
                </TouchableOpacity>
            )
        }
        return(
           

            <View 
            
            style={{flex:1,backgroundColor:"#EEE9E9"}}>
        
            
           
       
       
         <ScrollView 
        >

            <TouchableOpacity
            onPress={
                ()=>navigation.navigate('Product_list',{item:'search'})
            }
            >
              <Searchbar

            
            editable={false}
            style={{width:'80%',alignSelf:"center",height:50,borderWidth:1,
                borderRadius:15,margin:20}}
            placeholder="search......"

            disableFullscreenUI={true}
         
            
           />
     </TouchableOpacity>
         
            

            
            <View
            style={
                {
                    height:300
                }
            }
            >
            <FeaturedList/>
            </View>                
            
          
            <FlatList
            horizontal
            style={{marginLeft:20,marginRight:20}}
            renderItem={catbuilder}
            data={categories}
            keyExtractor={item=>item.id.toString()}
            >

         
            </FlatList>
            <View 
            style={{flexDirection:'row',
            marginBottom:0,
            justifyContent:'space-between',
            margin:20}}>
            <Text style={{fontSize:20}}>

            
            browse more {categories[ind].name}
            </Text>

            <TouchableOpacity
            onPress={()=>{navigation.navigate("Product_list",{item:categories[ind].name})}}
            >
            <FontAwesome5
            name={'angle-right'}
            size={30}
            ></FontAwesome5>
            </TouchableOpacity>
            </View>
  {/* <View style={{flexDirection:'row',justifyContent:'space-between',margin:20}}>
    <Text style={{fontSize:20,fontWeight:'bold'}}>CHAIRS</Text>
    <TouchableOpacity>
        <FontAwesome5 name="arrow-right" size={30}></FontAwesome5>
    </TouchableOpacity>
    </View> */}
        <FlatList
        
        horizontal
        style={{height:400,margin:20,marginTop:0}}
        data={chair}
        renderItem={chairbuilder}
            keyExtractor={item=>item.key}
        >


        </FlatList>
        <View style={{flexDirection:'row',
        justifyContent:'space-between',
        margin:20}}>
    <Text style={{fontSize:20,fontWeight:'bold'}}>BEST DISCOUNT OFFERS</Text>
    <TouchableOpacity>
        <FontAwesome5 name="angle-right" size={30}></FontAwesome5>
    </TouchableOpacity>
    </View>
        <FlatList
        horizontal
        style={{height:400,margin:20,}}
        data={arrivel}
        renderItem={arrivalBuilder}
            keyExtractor={item=>item.key}
        >

        </FlatList>

        <Image
        source={
            {
                uri:"https://www.ikea.com/in/en/images/products/lagkapten-adils-desk-black-brown-black__0977217_pe813462_s5.jpg?f=xl"
            }
        }
        style={
            {
                height:500,
                width:500,
                backgroundColor:'blue'
            }
        }
        >

        </Image>
         </ScrollView>
        {load && <ActivityIndicator
         style={{alignSelf:"center",top:"50%",left:"50%",position:'absolute'}}
        
         size='large'
         colo11111111r="green"
         >

         </ActivityIndicator>}
            </View>
        )
    }
export default Home_screen

const Homestyles=StyleSheet.create(
    {

    }
)