import React, { useEffect } from "react";
import { Dimensions,Text,StyleSheet,TextInput, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";
import { useState } from "react/cjs/react.development";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/core";

const {height,width}=Dimensions.get('screen')
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

       // console.log(res)
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
   // const {height,width}=Dimensions.get('screen')
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

                height:dimensions.height,
                width:dimensions.width,
                length:dimensions.length
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
        alignContent:'center',justifyContent:'center'}}>
         
       
         <ScrollView style={{flex:1}}>
      

        <View
        style={
          {
            justifyContent:'center',
            alignItems:'center',
           alignContent:"center"
          }
        }
        >
         
         <TextInput
       style={styles.inputText}

     value={prod.pname}
       onChangeText={val=>setprod({...prd,pname:val})}
       placeholder="Enter pname"
         />
             <TextInput

        style={styles.inputText}

      value={prod.brand}
       onChangeText={val=>setprod({...prd,pname:val})}
      label="brand"
       mode="outlined"
       
         />
             <TextInput
         value={prod.cat}
        style={styles.inputText}
       placeholder="Enter category(eg . Chair ,Bed ,Cabinet)"
         />
             <TextInput
         value={prod.sub_cat}
       style={styles.inputText}
       placeholder="Enter sub category(eg. Queen,King,Office)"
         />
        <Text style={{marginLeft:20,marginBottom:20}}>Enter Dimentions in inches(height,width,length)</Text>
        
        <View style={{flexDirection:'row',alignSelf:"center",right:20,justifyContent:'space-around'}}>
        <TextInput
         
        value={prod.dimensions.height.toString()}
        style={styles.inputTextNumbers}
        onChangeText={val=>setdimentions({...dimensions,height:val})}
        placeholder="height"
        ></TextInput>
        <TextInput
         value={prod.dimensions.width.toString()}
          style={styles.inputTextNumbers}
        placeholder="width"
        ></TextInput>
        <TextInput
        value={prod.dimensions.length.toString()}
          style={styles.inputTextNumbers}
        placeholder="length"
        ></TextInput>
        </View> 
           <TextInput
           value={prod.price.toString()}
       style={styles.inputText}
       placeholder="enter price"
         />
           <TextInput
             value={prod.discount.toString()}
       style={styles.inputText}
       placeholder="enter discount"
         />
           <TextInput
             value={prod.img1}
       style={{margin:20,height:50,borderRadius:20,borderWidth:1}}
       placeholder="Enter img1"
         />
           <TextInput
           value={prod.img2}
       style={styles.inputText}
       placeholder="Enter img2"
         />

<TextInput
value={prod.img3}
       style={styles.inputText}
       placeholder="Enter img3"
         />
      
      <TextInput
      value={prod.img4}
       style={styles.inputText}
       placeholder="Enter stock"
         />

      <TextInput
       style={styles.inputTextNumbers}
     
       value={prod.discount}
       placeholder="Enter discount"
         />
        
    <TextInput
      value={prod.discription}
     style={{width:width-60,alignSelf:"center",right:20,height:200,borderRadius:20,borderWidth:1}}
     placeholder="Enter Discription"
      multiline={true}
      numberOfLines={7}
    >

    </TextInput>


</View>

</ScrollView>

<TouchableOpacity

//onPress={()=>uploadOnFirestore()}
style={{width:width-60,margin:20,marginBottom:0,backgroundColor:'red',height:50,justifyContent:'center',
alignItems:'center',borderRadius:30}}
>

    <Text style={{color:'#fff',fontSize:20,textAlign:"center"}}>SUBMIT</Text>
</TouchableOpacity>
                </View>
    )
}

const styles=StyleSheet.create
(
  {
     inputText:
     {
      // marginHorizontal:10,
       marginVertical:10,
       height:50,
       width:width-40,
       right:20,
       alignSelf:"center",
       borderRadius:20,
       borderWidth:1,
       textAlign:'center'

     },
     inputTextNumbers:
     {width:100,margin:20,height:50,borderRadius:20,borderWidth:1}
  }
)

export default Admin_product