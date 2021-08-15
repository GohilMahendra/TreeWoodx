import React, { useEffect } from "react";
import { Dimensions,Text, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";
import { useState } from "react/cjs/react.development";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/core";

import {  TextInput} from "react-native-paper";
import {Input  } from "react-native-elements";
const Admin_product=({navigation})=>
{



  const p=useRoute()




  const fetch_Initials=()=>
  {

    if(p.params==null)
    {
      return
    }
    firestore().collection('products').doc(p.params.item)
   .onSnapshot(snapshot=> {
 
    const obj=
         {
          pname:snapshot.data().prod.pname,
          brand:snapshot.data().prod.brand,
          cat:snapshot.data().prod.cat,
          sub_cat:snapshot.data().prod.sub_cat,
          material:snapshot.data().prod.material,
  
        
          price:snapshot.data().prod.price,
          discount:snapshot.data().prod.discount,
          dimensions:{

              height:snapshot.data().prod.dimensions.height,
              width:snapshot.data().prod.dimensions.width,
              depth:snapshot.data().prod.dimensions.depth
          },
         warranty:snapshot.data().prod.warranty,
          discription:snapshot.data().prod.discription,
          date:snapshot.data().prod.date,
          stock:snapshot.data().prod.stock,
          img1:snapshot.data().prod.img1,
          img2:snapshot.data().prod.img2,
          img3:snapshot.data().prod.img3,
          img3d:snapshot.data().prod.img3d,
          rate:snapshot.data().prod.rate
          }
   
  
    setprod(obj)

    console.log(prod)
  
  
    
    })
  }
  useEffect
  (

  ()=>
  {

  fetch_Initials()

  },[prod,setprod]
  )

    const uploadOnFirestore=()=>
    {


      if(p.params!=null)
      {
        firestore().collection('products').doc(p.params.item).set(
          {
              prod
          }
      )

      }
      else
      {

        firestore().collection('products').add(
            {
                prod
            }
        )

        }
    }
    const [dimensions,setdimentions]=useState
    ({
        height:50,
        width:50,
        depth:50
    })
    const {height,width}=Dimensions.get('screen')
    const [prod,setprod]=useState
    (
        
        {
           
            pname:"Wakefit Titan",
            brand:"Wakefit",
            cat:"Cabinet",
            sub_cat:"Wardrobe",
            material:"Wood",
    
          
            price:12500,
            discount:64,
            dimensions:{

                height:36,
                width:60,
                depth:28
            },
           warranty:36,
            discription:"It’s all wood. Crafted from high-grade mango wood, the Duetto bed makes for the perfect unwind zone. Its sleek frame and minimalist design exude a contemporary flavour and blend in seamlessly with various styles of decor. A gently curving headboard supports your back, letting you sit up to read, watch TV or simply have a conversation. Layer the bed with plush quilts and fluffy pillows for a warm, cosy nook you’ll never want to leave.",
            date:"10/04/2021",
            stock:5,
            img1:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRdhvKeVWU27wW7t-pvkK-5f_nmot0QJ1HvyeM0qMojAKn069kTwyZUzTrrqHK0c3JbLqKZKfLx_Bg&usqp=CAc",
            img2:"",
            img3:"",
            img3d:"",
            rate:5
        }
    )

  
    return(
        <View style={{flex:1,alignItems:'center',
        alignContent:'center',marginHorizontal:20,justifyContent:'center'}}>
         
       
         <ScrollView style={{flex:1}}>
      
         <TextInput
       style={{width:width-40,margin:20,height:50,borderRadius:20,borderWidth:1}}

     value={prod.pname}
       onChangeText={val=>setprod({...prd,pname:val})}
       placeholder="Enter pname"
         />
             <TextInput

      value={prod.brand}
       onChangeText={val=>setprod({...prd,pname:val})}
      label="brand"
       mode="outlined"
       
         />
             <TextInput
         value={prod.cat}
        style={{width:width-40,margin:20,height:50,borderRadius:20,borderWidth:1}}
       placeholder="Enter category(eg . Chair ,Bed ,Cabinet)"
         />
             <TextInput
         value={prod.sub_cat}
       style={{width:width-40,margin:20,height:50,borderRadius:20,borderWidth:1}}
       placeholder="Enter sub category(eg. Queen,King,Office)"
         />
        <Text style={{marginLeft:20,marginBottom:20}}>Enter Dimentions in inches(height,width,depth)</Text>
        
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        <TextInput
         
        value={prod.dimensions.height.toString()}
        style={{width:100,height:50,borderRadius:20,borderWidth:1,textAlign:'center',marginLeft:20}}
        onChangeText={val=>setdimentions({...dimensions,height:val})}
        placeholder="height"
        ></TextInput>
        <TextInput
         value={prod.dimensions.width.toString()}
          style={{width:100,height:50,borderRadius:20,borderWidth:1,textAlign:'center',marginLeft:20}}
        placeholder="width"
        ></TextInput>
        <TextInput
        value={prod.dimensions.depth.toString()}
          style={{width:100,height:50,borderRadius:20,borderWidth:1,textAlign:'center',marginLeft:20}}
        placeholder="depth"
        ></TextInput>
        </View> 
           <TextInput
           value={prod.price.toString()}
       style={{width:width-40,margin:20,alignItems:'center',
       alignContent:"center",height:50,borderRadius:20,borderWidth:1}}
       placeholder="enter price"
         />
           <TextInput
             value={prod.discount.toString()}
       style={{width:width-40,margin:20,height:50,borderRadius:20,borderWidth:1}}
       placeholder="enter discount"
         />
           <TextInput
             value={prod.img1}
       style={{width:width-40,margin:20,height:50,borderRadius:20,borderWidth:1}}
       placeholder="Enter img1"
         />
           <TextInput
       style={{width:width-40,margin:20,height:50,borderRadius:20,borderWidth:1}}
       placeholder="Enter img2"
         />

<TextInput
value={prod.img2}
       style={{width:width-40,margin:20,height:50,borderRadius:20,borderWidth:1}}
       placeholder="Enter img3"
         />
      
      <TextInput
      value={prod.img3}
       style={{width:width-40,margin:20,height:50,borderRadius:20,borderWidth:1}}
       placeholder="Enter stock"
         />

      <TextInput
       style={{width:width-40,margin:20,height:50,borderRadius:20,borderWidth:1}}
       multiline={true}
       numberOfLines={7}
       placeholder="Enter discount"
         />
        
    <TextInput
     style={{width:width-40,margin:20,height:200,borderRadius:20,borderWidth:1}}
     placeholder="Enter Discription"
    >

    </TextInput>


</ScrollView>
<TouchableOpacity

onPress={()=>uploadOnFirestore()}
style={{width:width-60,margin:20,backgroundColor:'red',height:50,justifyContent:'center',
alignItems:'center',borderRadius:30}}
>

    <Text style={{color:'#fff',fontSize:20,textAlign:"center"}}>SUBMIT</Text>
</TouchableOpacity>
                </View>
    )
}
export default Admin_product