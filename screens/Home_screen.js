
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
import ProductCard from "../components/HomeScreen/ProductCard";
import FeaturedCard from "../components/FeaturedCard";
import FeaturedList from "../components/FeaturedList";

const Home_screen=({navigation})=>
{
    const {height,width}=Dimensions.get('screen')



//fetch categories

const chairFetcher=(name)=>
{
    setload(true)

    const quary=(name=="All")?  firestore().collection('products') :firestore().collection('products').where("prod.cat",'==',name)


  quary.onSnapshot(
        snapshot=>
        {
        var list=[]
      
        snapshot.forEach(function(child) {
    
    
            list.push({
                key: child.id,
                pname:child.data().prod.pname,
                pprice: child.data().prod.price,
                pdisc:child.data().prod.discount,
                pimage:child.data().prod.img1,
                pbrand:child.data().prod.brand
              })
        });
        list.reverse()
       
      
        setload(false)
    
        setchair(list)
        console.log(chair+"chair")
       
  });
    

    


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
                pprice: child.data().prod.price,
                pdisc:child.data().prod.discount,
                pimage:child.data().prod.img1,
                pbrand:child.data().prod.brand
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

//  const [chair,setchair]=React.useState()

        const [chair,setchair]=React.useState([])


       
        const [arrivel,setarrival]=useState()
 
        const [ind,setind]=useState(0)
      
        
        const chairbuilder=({item,index})=>
        {
            
          
            return(
               
                <ProductCard
                
                
                item={item}
                navigation={navigation}
                >

                </ProductCard>
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
                ()=>navigation.navigate('Search')
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
         
            

            <FeaturedList>
                
            </FeaturedList>
          
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
         </ScrollView>
        {load && <ActivityIndicator
         style={{alignSelf:"center",top:"50%",left:"50%",position:'absolute'}}
        
         size='large'
         color="green"
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