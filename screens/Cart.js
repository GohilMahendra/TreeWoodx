import React, { useState } from "react";
import { 

    Dimensions,
    Text,TouchableOpacity,View,Image, TextInput, ActivityIndicator
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
import { fonts } from "../constants/fonts";
import { Card } from "react-native-elements/dist/card/Card";
import CartCard from "../components/CartCard";
import EmptyCartScreen from "../components/EmptyCartScreen";
import { useDispatch, useSelector } from "react-redux";

import { changeCartQuantity, removeFromCart } from "../redux/Actions/CartActions";
const {height,width}=Dimensions.get('screen')
 const Cart=({navigation})=>
 {



  const dispatch=useDispatch()

  
  const cart=useSelector(state=>state.Cart.Cart)
  const tot=useSelector(state=>state.Cart.totalPrice)

  const loading=useSelector(state=>state.Cart.loading)
  const changeQuantity=async(quantity,pid)=>
    {
  
      dispatch(changeCartQuantity(quantity,pid))
      
    }


   
  const remove=async(pid)=>

  {

    dispatch(removeFromCart(pid))
}
    


  
 

// useEffect
// (
//   ()=>{ 
    
    
//    firestore().collection('cart').doc(auth().currentUser.uid).collection('products').onSnapshot((snapshot)=> {

//     var list=[]
  
//     var total=0

//    // console.log(snapshot.
//     snapshot.forEach(function(child) {

  


//       if(child && child.exists)
//       {
//         console.log(child.data())
//       }
    
     

//       var pricex= child.data().price- child.data().price* child.data().discount/100
//       total+=child.data().quantity*pricex
     
//         list.push({
//             key: child.id,
//             quantity:child.data().quantity,
//             pname:child.data().pname,
//             price: child.data().price,
//             discount:child.data().discount,
//             img1:child.data().img1,
//             brand:child.data().brand,
            
//           })
//     });
   
//     setcart(list)  

   
//     // var total=0
//     // for(var i=0;i<list.length;i++)
//     // {
//     //   var price=list[i].price-list[i].price*list[i].discount/100
//     //   total+=Math.floor(price)
//     // }
//     settot(total)


//     setload(false)
// })
// },[]
// )


// const [cart,setcart]=useState([])
     
//     const [tot,settot]=useState(0)
  
//     const [price,setprice]=useState()

//     const [load
//     ,setload]=useState(true)
     const itemBuilder=({item,index})=>
     
     {
     
        const org_price=Math.floor(item.price-item.price*item.discount/100)


        console.log(JSON.stringify(item)+"item")

        return(
     


          
            <View
            style={
            {
              marginVertical:10
            }
            }
            >
                 
                 <CartCard
                 
                 item={item}
                 navigation={navigation}
                 onRemovePress={remove}
                 changeQuantity={changeQuantity}
                 >

                 </CartCard>
                 </View>
         )

     }

    return(
       
        <View style={{flex:1,backgroundColor:"#E3E8F0"}}>
  <View style={{flex:1}}>
        <View style={{marginTop:10,flex:1,width:width-20}}>
        <Text style={{alignSelf:'center',fontFamily:fonts.Federo_Regular,
        fontSize:30,margin:20}}>MY CART</Text>
       <FlatList 
        style={{flex:1}}
       
        data={cart}
        ListEmptyComponent={EmptyCartScreen}
        renderItem={itemBuilder}
            keyExtractor={item=>item.key}
        
        >

    

        </FlatList>
 
        </View>
        <View style={{marginTop:10,borderRadius:30,
        shadowOffset:{height:5,width:5},
        shadowOpacity:1,shadowRadius:20,
        backgroundColor:'#fff',
        borderRadius:30,bottom:10,alignItems:'flex-end'}}>
               
               <View
               style={
                 {
                  backgroundColor:'#fff',
                 }
               }
               >
                <Text style={{marginHorizontal:20,fontSize:25,fontFamily:fonts.Quicksand_Medium}}>TOTAL </Text>
                <Text style={{marginHorizontal:20,fontWeight:"bold",fontSize:25,fontFamily:fonts.Quicksand_Medium}}>
                  RS {tot}</Text>
                </View>
                
               {
               (tot>0) &&
               <TouchableOpacity


                onPress={()=>navigation.navigate("Checkout")}
                style={{height:50,backgroundColor:"blue",
                borderRadius:15,
                flexDirection:'row',
                width:width-40,
                margin:20,
                justifyContent:'space-evenly'
                ,
                alignItems:'center'}}
                >
                    <LinearGradient
                 style={{height:50,
                  borderRadius:15,
                  width:width-40,
                  alignItems:'center',
                  justifyContent:"center"}}
                 colors={["black","silver"]}
                    >                 
                   <Text style={{textAlign:'center',
                   fontSize:20,alignSelf:'center'
                   ,fontFamily:fonts.Federo_Regular
                    ,color:'#fff',textAlignVertical:'center'}}>PROCEED TO CHECKOUT
                     
                    </Text>
                </LinearGradient>

                </TouchableOpacity>}
            </View>
            </View>
        </View>
    )
 }
 export default Cart