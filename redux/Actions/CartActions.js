import { 

    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILED,
    FETCH_CART_SUCCESS,
    FETCH_CART_REQUEST,
    FETCH_CART_FAILED

 } from "../Types/CartTypes";



 import auth from "@react-native-firebase/auth";

 import firestore from "@react-native-firebase/firestore";
 



 export const AddToCart=(product)=>
 {


  

  
  //console.log(prod+'prod')
  return async(dispatch)=>
  {

    //console.log(product)
    dispatch({type:ADD_TO_CART_REQUEST})

    try
    {


    //  console.log(JSON.stringify(product)+'product in try blocj')

      const productx={

        
        pname:product.pname,
        brand:product.brand,
        price:product.price,
        stock:product.stock,
        cat:product.cat,
        quantity:1,
        sub_cat:product.sub_cat,
        img1:product.img1,
        discount:product.discount
      }

    

    //console.log(productx)
   // console.log(productx+'productx value in cart')
    dispatch({type:ADD_TO_CART_SUCCESS,payload:productx})

    
  }
  catch(err)
  {

    dispatch({type:ADD_TO_CART_FAILED,payload:err})
  
  }
  
}

  
   

 }
 
 export const fetchCartproducts=()=>
 {

  return async(dispatch)=>
  {


    
    var total=0
    var count=0
    var list=[]
    dispatch({type:FETCH_CART_REQUEST})
    try
    {

    firestore().collection('cart').doc(auth().currentUser.uid).collection('products').onSnapshot
    (
      (snapshot)=>
      {
        snapshot.forEach
        (
          function(child)
          {

            if(!child.exists)
            {
              return
            }
            

            
      var pricex= child.data().price- child.data().price* child.data().discount/100
      total+=child.data().quantity*pricex
      count=count+1
        list.push({
            key: child.id,
            quantity:child.data().quantity,
            pname:child.data().pname,
            price: child.data().price,
            discount:child.data().discount,
            img1:child.data().img1,
            brand:child.data().brand,
            
          })

      

          }
        )
        console.log(list+'list 2')
        dispatch({type:FETCH_CART_SUCCESS,payload:
          {
            Cart:list,
            total:count,
            totalprice:total
          }})
      }
    )
    

   
    
    
    
   
  }
    catch(err)
    {
      dispatch({type:FETCH_CART_FAILED,payload:err})

    }
  }
     
    


 }
 