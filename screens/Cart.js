import React, { useState } from "react";
import { 

    Dimensions,
    Text,TouchableOpacity,View,Image, TextInput
 } from "react-native";
import { FlatList, Swipeable } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";
import { cartdata } from "../data/cartdata";
import InputSpinner from "react-native-input-spinner";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { useEffect } from "react/cjs/react.development";
import  auth, { firebase }  from "@react-native-firebase/auth";
import  database  from "@react-native-firebase/database"
import firestore from "@react-native-firebase/firestore";

const {height,width}=Dimensions.get('screen')
 const Cart=({navigation})=>
 {




   
  const remove=async(pid)=>

  {

  await firestore().collection('cart').doc(auth().currentUser.uid).collection('products').doc(pid).delete()
  }
    

    
useEffect
(
  ()=>{ 
    
    
   firestore().collection('cart').doc(auth().currentUser.uid).collection('products').onSnapshot((snapshot)=> {

    var list=[]
  

   // console.log(snapshot.
    snapshot.forEach(function(child) {

  


      if(child && child.exists)
      {
        console.log(child.data())
      }
     settot(tot+child.data().price)

     
     
        list.push({
            key: child.id,
            quantity:child.data().quantity,
            pname:child.data().pname,
            price: child.data().price,
            discount:child.data().discount,
            img1:child.data().img1,
            brand:child.data().brand
          })
    });
   
    setcart(list)  

   
    var total=0
    for(var i=0;i<list.length;i++)
    {
      var price=list[i].price-list[i].price*list[i].discount/100
      total+=Math.floor(price)
    }
    settot(total)


    setload(false)
})
},[cart,setcart]
)

     
const [tot,settot]=useState(0)
    const [cart,setcart]=useState()
    const [price,setprice]=useState()

    const [load
    ,setload]=useState(true)
     const itemBuilder=({item,index})=>
     
     {
     
        const org_price=Math.floor(item.price-item.price*item.discount/100)


        return(
     
          <Swipeable>         
          <TouchableOpacity 
        
         
           style={{width:width,borderRadius:20,backgroundColor:'#fff',
marginLeft:10,height:200,elevation:5,
           marginBottom:20}}>
            
           <View style={{flexDirection:'row',borderRadius:20}}>

            <Image
            source={{uri:item.img1}}
            style={{borderRadius:20,height:200,width:width/2.5,alignSelf:'center'}}
            >

            </Image>
                     
            <View style={{justifyContent:'space-evenly',
            borderRadius:20,alignSelf:'center',alignItems:"center"}}>


            <Text style={{textAlign:'center',width:width/2,
            fontFamily:'Orbitron-Black',
            fontWeight:'bold',
            fontSize:18}}> {item.pname}</Text>
            <Text style={{fontSize:18,color:'gray',fontFamily:'Orbitron-Black'}}>seller :{item.brand}</Text>            
            <View style={{flexDirection:'row',justifyContent:'space-evenly',height:30}}>


            <Text style={{fontWeight:'bold',marginRight:20,marginLeft:20,fontSize:15}}>RS {org_price*item.quantity}</Text>
            <Text style={{fontWeight:'bold',color:'gray',textDecorationLine:'line-through',fontSize:15}}>RS {item.quantity*item.price}</Text>
            </View>
            <Text style={{color:'green'}}>{item.discount} % OFF</Text>
        
            <TouchableOpacity
              onPress={()=>remove(item.key)}
            style={{width:'100%',alignItems:'center',borderRadius:20,backgroundColor:'#a40606'}}
            >
              <Text style={{color:'#fff'}}>REMOVE</Text>
            </TouchableOpacity>
            </View>
         
           </View>
          
          
           </TouchableOpacity>
          
           </Swipeable> 
         )

     }

    return(
  <View style={{flex:1}}>
  <View style={{flex:1}}>
        <View style={{marginTop:10,flex:1,width:width-20}}>
        <Text style={{alignSelf:'center',fontFamily:'Orbitron-Black',
        fontSize:30,margin:20}}>cart</Text>
        <FlatList 
        style={{flex:0.5}}
        data={cart}
        renderItem={itemBuilder}
            keyExtractor={item=>item.key}
        
        >

    

        </FlatList>
        </View>
        <View style={{marginTop:10,borderRadius:30,backgroundColor:'#fff',
        shadowOffset:{height:5,width:5},
        shadowOpacity:1,shadowRadius:20,
        borderRadius:30,bottom:10}}>
               <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{margin:20,fontSize:25}}>Total  </Text>
                <Text style={{margin:20,fontSize:25,alignSelf:'flex-end',fontFamily:'Orbitron-Black'}}>
                  RS {tot}</Text>
                  </View>
                <TouchableOpacity


                onPress={()=>navigation.navigate("Checkout")}
                style={{height:50,backgroundColor:"blue",
                borderRadius:30,flexDirection:'row',width:width-40,margin:20,justifyContent:'space-evenly',alignItems:'center'}}
                >
                    <LinearGradient
                 style={{height:50,borderRadius:30,width:width-40}}
                 colors={["#2c3e50","#000000"]}
                    >                 
                   <Text style={{right:20,textAlign:'center',
                   fontSize:20,alignSelf:'center'
                    ,color:'#fff',textAlignVertical:'center'}}>PROCEED TO CHECKOUT
                     
                    </Text>
                </LinearGradient>

                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
 }
 export default Cart