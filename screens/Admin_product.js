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



  date=new Date()

  const p=useRoute()



  const todaysdate=date.getDate()+'/'+date.getUTCMonth()+'/'+date.getFullYear()
  const fetch_Initials=()=>
  {

    if(p.params==undefined)
    {
      return
    }
    firestore().collection('products').doc(p.params.item)
   .onSnapshot(snapshot=> {
 
    const obj=
         {
          pname:snapshot.data().pname,
          brand:snapshot.data().brand,
          cat:snapshot.data().cat,
          sub_cat:snapshot.data().sub_cat,
          material:snapshot.data().material,
  
        
          price:snapshot.data().price,
          discount:snapshot.data().discount,
          dimensions:{

              height:snapshot.data().dimensions.height,
              width:snapshot.data().dimensions.width,
              length:snapshot.data().dimensions.length
          },
         warranty:snapshot.data().warranty,
          discription:snapshot.data().discription,
          date:snapshot.data().date,
          stock:snapshot.data().stock,
          img1:snapshot.data().img1,
          img2:snapshot.data().img2,
          img3:snapshot.data().img3,
          img4:snapshot.data().img4,
        
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

  },[]
  )

    const uploadOnFirestore=async()=>
    {



      try

      {

        let res=""
      if(p.params!=null)
      {
        res =await firestore().collection('products').doc(p.params.item).set(
          
              prod
          
      )

      console.log(res)
      }
      else
      {

        res =await firestore().collection('products').add(
            
                prod
            
        )

        console.log(res)
        }
      }
      catch(err)
      {
        console.log(err)
      }
    }
    const [dimensions,setdimentions]=useState
    ({
        height:50,
        width:50,
        length:50
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
    
          

            priceafterdisc:0,
            price:12500,
            discount:64,
            dimensions:{

                height:36,
                width:60,
                length:28
            },
           warranty:36,
            discription:"It’s all wood. Crafted from high-grade mango wood, the Duetto bed makes for the perfect unwind zone. Its sleek frame and minimalist design exude a contemporary flavour and blend in seamlessly with various styles of decor. A gently curving headboard supports your back, letting you sit up to read, watch TV or simply have a conversation. Layer the bed with plush quilts and fluffy pillows for a warm, cosy nook you’ll never want to leave.",
            date:todaysdate,
            stock:5,
            img1:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRdhvKeVWU27wW7t-pvkK-5f_nmot0QJ1HvyeM0qMojAKn069kTwyZUzTrrqHK0c3JbLqKZKfLx_Bg&usqp=CAc",
            img2:"",
            img3:"",
            img4:"",
          
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
        <Text style={{marginLeft:20,marginBottom:20}}>Enter Dimentions in inches(height,width,length)</Text>
        
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
        value={prod.dimensions.length.toString()}
          style={{width:100,height:50,borderRadius:20,borderWidth:1,textAlign:'center',marginLeft:20}}
        placeholder="length"
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