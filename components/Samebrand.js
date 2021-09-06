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
import { Dimensions } from "react-native";
import ProductCard from "./ProductCard";

 const Samebrand=({brand,navigation,curruntID})=>
 {


    const{height,width}=Dimensions.get(
        'screen'
    )
    console.log(curruntID+'currunt ID')

    if(brand==undefined)
    return


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
            >NO RELETED BRANDS FOUND</Text>

            </View>
        )
        }
    useEffect
    (
        ()=>
        {
         
 


            try
            {
     setloading(true)
    firestore().collection('products').where('brand',"==",brand).limit(5).onSnapshot((snapshot)=> {

        
//    setsuccess(true)
 //console.log(snapshot.docs)


    var li=[]
    snapshot.forEach(function(child) {

  
        li.push({
            key: child.id,
            pname:child.data().pname,
            pprice: child.data().price,
            pdisc:child.data().discount,
            pimage:child.data().img1,
            pbrand:child.data().brand
        })
    });

   
   // li=li.filter(obj=>obj.key!=curruntID)
    setproducts(li)
    console.log(JSON.stringify(products)+ "similar item data")
    
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

    console.log("BrandName Recived As "+JSON.stringify(brand))

    const SimilerItemBuilder=({item,index})=>
    {


     

       
       // console.log(item.key)
        return(
<ProductCard
item={item}
></ProductCard>
       
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
                    textTransform:'uppercase',
                    textAlignVertical:"center",
                   
                    width:'70%'
                    
                    
                }
            }
            
            
            >MORE FROM {brand}</Text>
            <TouchableOpacity
            style={
                {
                    backgroundColor:"black",
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:"center"
                }
            }
            onPress={()=>navigation.navigate("SimilarBrands",
            {
                brandname:brand,
               
                name:"similar items for "+brand+" brand"
            }
            )}
           disabled={(products!=undefined && products.length>0)?false:true}
            >
                <Text
                style={
                    {
                        color:"white",
                        margin:10,
                        textAlignVertical:'center'
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

    ListEmptyComponent={emptyScreen}

   keyExtractor={(item)=>item.key}

    renderItem={SimilerItemBuilder}



    style={{marginHorizontal:10,height:350}}

    >

    </FlatList>


            </View>

        }
        </View>
    )
 }

 export default Samebrand