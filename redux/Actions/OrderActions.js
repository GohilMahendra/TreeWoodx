import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS } from "../Types/OrderReducer";
import { ActionSheetIOS } from "react-native";



let date=new Date()
const todaysdate=date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()



const checkIFinStock=async(cart)=>
{
  var inStock=true


 
  var childName=null
  cart.forEach
  (

    async function(child)
    {
      const prodref= firestore().collection('products').doc(child.key)

      const data=await prodref.get()


   //   console.log(data.data().stock<cart.quantity+"is out of stock")
     if(data.data().stock < cart.quantity || data.data().stock<=0)
     {
     inStock=false
     childName=child.pname
    }
  }
  )


  if(inStock==false)
  console.log("wind")


  console.log(inStock+""+childName)



  return {inStock,childName}
  



}



export const makeOrder=(cart,price,address,paymentDetails)=>
{

    

    return async(dispatch)=>
    {



    

    try
    {
    dispatch({type:MAKE_ORDER_REQUEST})
    let {inStock,childName}=await checkIFinStock(cart)
    console.log(inStock)



    if(inStock==false)
    {
      alert("could not make Transactions because Product is Out Of Stock"+childName)
      return
    }

    let writebatch=firestore().batch()

    cart.forEach(
      function(child)
      {
        const ref=firestore().collection('products').doc(child.key)
        const decrement=firestore.FieldValue.increment(-child.quantity);

      
        
        writebatch.update(ref,{stock:decrement})
      }
    )

    writebatch.commit()
    

    await firestore().collection('cart').doc(auth().currentUser.uid).delete()


  


   



    const order= {
        
        date:todaysdate,
        userid:auth().currentUser.uid,
        email:auth().currentUser.email,
        name:auth().currentUser.displayName,
        totalPrice:price,

        products:cart,
        address:address,



        paymentDetails:paymentDetails
    }




    const success=await firestore().collection('Orders').add
    (
        order
    )
    console.log(success+"SUCESS METHOD")

    dispatch({type:MAKE_ORDER_SUCCESS})
    }
    catch(err)
    {
        dispatch({type:MAKE_ORDER_FAILED,payload:err})
        console.log(err)
    }
    }

}