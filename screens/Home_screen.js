
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

const Home_screen=({navigation})=>
{
    const {height,width}=Dimensions.get('screen')
//         const getChairData=()=>
// {
//   console.log('called')
//   database().ref('/products/').on("value", function(snapshot) {

//     var list=[]
//     console.log(snapshot.val());
//     snapshot.forEach(function(child) {

       
//         list.push({
//             key: child.key,
//             pname:child.val().name,
//             pprice: child.val().price,
//             pdisc:child.val().discount,
//             pimgae:child.val.img1,
//             pbrand:child.val().brand
//           })
//     });
//     setchair(list)

//     console.log(chair)
// });
// }


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
       
        console.log(list+'l')
        setload(false)
    
        setchair(list)
       
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
  ()=>{   firestore().collection('products').onSnapshot(
    (snapshot)=> {

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
    }
    );
    list.reverse()
    setchair(list)

    console.log(chair)
});}
  ,[chair,setchair]
)

//  const [chair,setchair]=React.useState()

        const [chair,setchair]=React.useState('')


        const [arrivel,setarrival]=useState()
 
        const [ind,setind]=useState(0)
      
        
        const chairbuilder=({item,index})=>
        {
            
          
            const disc_price=Math.floor(item.pprice-item.pprice*item.pdisc/100)
            return(
               <View style={{height:350,alignItems:'center'}}>


                <TouchableOpacity 
                
                onPress={()=>navigation.navigate("product",{item:item})}
                style={{height:'100%',width:'100%',
                marginTop:20,marginBottom:20,width:200,marginRight:20}}>
                 

                <View style={{backgroundColor:"#fff",height:300,width:200,
                borderRadius:20,shadowColor: "#fff",
                shadowOffset: {
                    width: -15,
                    height: 5,
                },
                shadowOpacity: 1,
                shadowRadius: 100,
                
                elevation: 7,}}>
                <Image
                source={{uri:item.pimage}}
                style={{borderRadius:20,
                    height:200,
                    width:180,
                    margin:10,
                    shadowColor:'black'}}
                ></Image> 
                <View 
                style={{backgroundColor:'#fff',
                alignItems:"center",
                height:100,
                borderRadius:20}}>
                <Text 
                style={{alignSelf:'center',
                fontWeight:'bold',
                fontSize:18}}>{item.pname}</Text>
                
                    <Text 
                    style={{fontSize:20,
                    fontWeight:'bold'}}>RS {disc_price}</Text>
              
                    <Text 
                    style={{fontSize:20,
                    color:'green'}}>{item.pdisc}% off</Text>
            
               
               <Text 
               style={{alignItems:'center',
               fontSize:20,
               fontStyle:'italic',
               alignSelf:'center'}}>{item.brand}</Text>
                </View>   
                </View>
                </TouchableOpacity>
               </View>
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
                   blurRadius={2}
                   source={{uri:item.pimage}}
                   >
                      
                       </Image> 
                       <Text 
                       style={{transform:[{translateY:-70}],
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
                    <FontAwesome5Icon 
                    style={{alignSelf:"center"}} 
                    name="chair" color="#fff"
                     size={30}></FontAwesome5Icon>
                </TouchableOpacity>
            )
        }
        return(
           
            <View style={{flex:1,backgroundColor:"#EEE9E9"}}>
        
            <View style={{flexDirection:"row",width:width}}>
            <TextInput
            style={{width:width-100,height:50,borderWidth:1,
                borderRadius:30,margin:20}}
            placeholder="serach"

            
           />
            <TouchableOpacity style={{margin:20,
            marginLeft:0,
            alignItems:'center',
            borderRadius:15,
            justifyContent:'center',
            backgroundColor:'black',
            width:50}}
            onPress={()=>navigation.navigate('Search')}
            >
                <FontAwesome5 name="filter"
                
       
                size={30} color="#fff"></FontAwesome5>
            </TouchableOpacity>
         </View>

         <ScrollView 
         >
  
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
        <View style={{flexDirection:'row',justifyContent:'space-between',margin:20}}>
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
         style={{top:height/2,alignSelf:"center",position:'absolute'}}
        
         size='large'
         color="green"
         >

         </ActivityIndicator>}
            </View>
        )
    }
export default Home_screen