
import React, { useEffect, useState } from "react";
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

const Product_list=()=>
{
    const navigation=useNavigation()

    


    const [search,setserach]=useState('')
    const [filters,setfilters]=useState(
      {
        price:0,
        discount:0,

      }
    )

    
    const p=useRoute()
    var item
    if(p.params.item!=null)
    {
     item=p.params.item
    }
    
    const [visible,setvisible]=useState(true)
    const {height,width}=Dimensions.get('screen')

    const searchProd=()=>
    {
       




      if(search=="")
      return

      let ser=""
      if(filters.price!=0)
      {
        console.log("price quary selected")
         ser=firestore().collection('products').where('prod.price',">=",filters.price) 
      }
      else
      {
         ser=firestore().collection('products').where('prod.pname', '>=', search).where('prod.pname', '<=', search+ '\uf8ff')
      }
        ser.onSnapshot(
            (snapshot)=> {
    
            var list=[]
         
            snapshot.forEach(function(child) {
        
                console.log(child)
        
          
               
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
            setproduct(list)
        })
    }


    const del=()=>
    {

        console.log('calldd')
    }
    const leftdelete=(progress,dragX)=>
    {
      
      return(
      
    
        <View style={{flex:1,marginLeft:0,marginTop:20,
        borderRadius:30,justifyContent:'center',
        backgroundColor:'#ff0010'}}>
          <Animated.Text  style={{color:'#fff',marginLeft:45,fontSize:25}}>DELETE</Animated.Text>
          <FontAwesome5Icon></FontAwesome5Icon>
        </View>
      )
    }
    const itembuilder=({item,index})=>

    {
       
     const disc=item.pprice-item.pprice*item.pdisc/100   
    
     console.log(item)

     return(

      
            <TouchableOpacity
            onPress={()=>navigation.navigate("product",{item:item})}
            style={{margin:10,
            borderRadius:20,
            shadowOpacity:0.5,
            shadowOffset:{height:-15,width:15},
            shadowColor:'#FFF8DC'
            ,justifyContent:'center',
            alignItems:"center",
            shadowRadius:25,
            elevation:15,
          
            
            width:width/2-40,
            
           // backgroundColor:"blue",
            marginBottom:20,
            }}>
              
              <View style={{flex:1}}>

              <Image
              
              style={{width:width/2-40-10,height:200}}
              source={{uri:item.pimage}}


              />
              <Text>{item.pname}</Text>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                <Text style={{textDecorationLine:"line-through"}}>{item.pprice}</Text>
                <Text>{item.pprice-item.pdisc*item.pprice/100}</Text>
              </View>
              <Text>
                {
              item.pbrand
                }
              </Text>
              <Card
              
              >

              </Card>
              </View>

            </TouchableOpacity>
          
        )
    }
   

    useEffect
    (
      ()=>
      {
        searchProd()

      },
      [filters]
    )
    useEffect
    (   ()=>{ firestore().collection('products').onSnapshot(
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
        setproduct(list)
    
    })}
      ,[product,setproduct]
    )


   // const [search,setsearch]=useState('')

    const [loading,setloading]=React.useState(false)
    const [product,setproduct]=React.useState()
    return(
    <View style={{flex:1,backgroundColor:'#fff'}}>
     
        
      
       
       <View style={
         {
           flexDirection:"row",
           marginHorizontal:10,
           justifyContent:"space-between"
         }
       }>
    
      <Searchbar
      
      value={search}

      
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
        


        
        style={{flex:1,marginHorizontal:10}}
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