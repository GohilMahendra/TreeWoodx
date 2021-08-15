
import React from "react";
import { 
View,Text,StyleSheet,Image,SafeAreaView, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView, ActivityIndicator

 } from "react-native";

import  FontAwesome5  from "react-native-vector-icons/FontAwesome5";
import { categories } from "../data/categories";
import { chairdata } from "../data/chairdata";
import { beddata } from "../data/beddata";

import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import database from "@react-native-firebase/database";
import firestore from "@react-native-firebase/firestore";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { set } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Searchbar } from "react-native-paper";
import { StatusBar } from "react-native";
import {fonts  } from "../constants/fonts";
import ProductCard from "../components/HomeScreen/ProductCard";

const Home_screen=({navigation})=>
{
    const {height,width}=Dimensions.get('screen')



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
                style={{height:50,width:(ind==index)?200:90
                    ,flexDirection:'row',
                    elevation:12,borderRadius:20
                    ,justifyContent:'center',
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
        
            
           
           <StatusBar
           hidden={true}
           showHideTransition={true}
          
           >

           </StatusBar>
        

         <ScrollView 
         >
              <Searchbar
            style={{width:'80%',alignSelf:"center",height:50,borderWidth:1,
                borderRadius:15,margin:20}}
            placeholder="search......"

            onTouchStart={
                ()=>navigation.navigate('Search')
            }
            
           />
  
            <TouchableOpacity>
               
                <View 
                style={{width:width-40,
                margin:20,
                borderRadius:30,
                height:height/3}}>
                <LinearGradient
                colors={['black','gray']}
                style={{flex:1,borderRadius:30}}
                >

                <View style={{flexDirection:'row',flex:1,borderRadius:30}}>
                <View style={{borderWidth:1,height:'50%',
                width:'50%',alignSelf:'center',margin:10,borderColor:'#fff'}}>
                <Text 
                style={{fontSize:20,
                color:'#fff'}}>
                    GET EXCITING DEALS ON SOFAS
                </Text>
                <Text 
                style={{alignSelf:'center',
                fontSize:35,
                color:"#fff",
                fontWeight:'bold'}}>50% OFF</Text>
                   </View>
                <Image
                source={{uri:'https://thumbs.dreamstime.com/b/white-sofa-black-background-insulated-1652176.jpg'}}
                style={{backgroundColor:'#fff',
                height:'50%',
                width:'40%',
                alignSelf:'center'}}
                >

                </Image>
                </View>
       
                </LinearGradient>
                </View>                    
            </TouchableOpacity>
            
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