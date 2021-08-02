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
import {fonts} from "../constants/fonts";

 const SimilarItems=({category,navigation})=>
 {



    if(category==undefined)
    return

    useEffect
    (
        ()=>
        {
         
 


            try
            {
     setloading(true)
    firestore().collection('products').where('prod.cat',"==",category).limit(5).onSnapshot((snapshot)=> {

        
//    setsuccess(true)
 // console.log(snapshot.docs)


    var li=[]
    snapshot.forEach(function(child) {

  
        li.push({
            key: child.id,
            pname:child.data().prod.pname,
            pprice: child.data().prod.price,
            pdisc:child.data().prod.discount,
            pimage:child.data().prod.img1,
            pbrand:child.data().prod.brand
        })
    });

   
    setproducts(li)
   // console.log(JSON.stringify(products)+ "similar item dtaa")
    
   setloading(false)

  })
}
catch(err)
{
    setError(true)
    console.log(err)
}
},


        
        []
    )

    const [products,setproducts]=useState([])

    const [loading,setloading]=useState(false)

    const [Error,setError]=useState(false)

    console.log("BrandName Recived As "+JSON.stringify(category))

    const SimilerItemBuilder=({item,index})=>
    {


        if(item==undefined)
        return
        console.log(item.key)
        return(
          <TouchableOpacity
          
          onPress=
          {
                  ()=>navigation.push("product",{item:{

                    "key":item.key
                  }})
          }
          style={{
              backgroundColor:"transparent",
              borderRadius:10,
              width:150,

              marginHorizontal:10,
              justifyContent:"center"
          }}
          >
              <Image
              style
              ={
                  {
                    
                    borderRadius:10,

                    height:120,
                   
                  }
              }
              source={{uri:item.pimage}}
              >

              </Image>
              <Text
              style=
              {
                  {
                    fontFamily:fonts.Orbitron_Black,
                      alignSelf:"center"
                  }
              }
              >{item.pname}</Text>
              <View style={{flexDirection:'row',
              justifyContent:"space-around"}}>

              <Text
              style={
                  {
                    fontFamily:fonts.Merienda_Regular,
                      textDecorationLine:"line-through"
                  }
              }
              >RS .{item.pprice}</Text>
              <Text
              style={
                  {
                    fontFamily:fonts.Merienda_Regular
                  }
              }
              >RS .{item.pprice-(item.pdisc*item.pprice/100)}</Text>
              
              </View>
              <Text style={
                  {
                      color:'green',
                      alignSelf:'center',
                      fontFamily:fonts.Merienda_Regular
                  }
              }>{item.pdisc} %OFF</Text>
               <Text style={
                  {
                      color:'grey',
                      alignSelf:'center',
                      fontFamily:fonts.Merienda_Regular
                  }
              }>{item.pbrand}</Text>
          </TouchableOpacity>
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
        {(!loading)&&
            <View style={{flex:1}}>

<FlatList
    

    horizontal
    data={products}

   keyExtractor={(item)=>item.key}

    renderItem={SimilerItemBuilder}



    style={{marginHorizontal:10,flex:1}}

    >

    </FlatList>


            </View>

        }
        </View>
    )
 }

 export default SimilarItems