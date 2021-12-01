import {

  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILED,
  FETCH_CART_SUCCESS,
  FETCH_CART_REQUEST,
  FETCH_CART_FAILED,
  REMOVE_FROM_CART,
  CHANGE_QUANTITY_REQUEST,
  CHANGE_QUANTITY_SUCCESS,
  CHANGE_QUANTITY_FAILED,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILED

} from "../Types/CartTypes";



import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";





export const changeCartQuantity = (quantity, pid) => {



  return async (dispatch) => {


    dispatch({ type: CHANGE_QUANTITY_REQUEST })


    try {
      const res = await firestore()
        .collection('cart')
        .doc(auth().currentUser.uid)
        .collection('products')
        .doc(pid)
        .update
        (
          {
            quantity: quantity
          }
        )

      dispatch({ type: CHANGE_QUANTITY_SUCCESS, payload: res })
    }

    catch (err) {
      dispatch({ type: CHANGE_QUANTITY_FAILED, payload: err })
    }


  }
}


export const AddToCart = (product, key) => {



  console.log(product.priceafterdisc)


  //console.log(prod+'prod')
  return async (dispatch) => {

    //console.log(product)
    dispatch({ type: ADD_TO_CART_REQUEST })

    try {


      const productx = {
        pname: product.pname,
        brand: product.brand,
        price: product.price,
        stock: product.stock,
        priceafterdisc: product.priceafterdisc,
        cat: product.cat,
        quantity: 1,
        img1: product.img1,
        discount: product.discount
      }

      await firestore().collection('cart').doc(auth().currentUser.uid).collection('products').doc(key).set(
        productx
      )

      dispatch({ type: ADD_TO_CART_SUCCESS, payload: productx })


    }
    catch (err) {

      dispatch({ type: ADD_TO_CART_FAILED, payload: err })

    }

  }




}


export const removeFromCart = (pid) => {



  return async (dispatch) => {
    try {

      dispatch({ type: REMOVE_FROM_CART_REQUEST })


      const res = await firestore().collection('cart').doc(auth().currentUser.uid).collection('products').doc(pid).delete()


      dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: res })
    }
    catch (err) {
      console.log(err)
      dispatch({ type: REMOVE_FROM_CART_FAILED, payload: err })
    }

  }
}
export const fetchCartproducts = () => {

  return async (dispatch) => {




    dispatch({ type: FETCH_CART_REQUEST })
    try {


      const subscribe = firestore().collection('cart')
        .doc(auth().currentUser.uid)
        .collection('products').onSnapshot

        (
          (snapshot) => {

            var total = 0
            var count = 0
            var list = []
            snapshot.forEach
              (
                function (child) {

                 
                  total = total + child.data().quantity * child.data().priceafterdisc
                  count = count + 1
                  console.log(total)
                  list.push({
                    key: child.id,
                    quantity: child.data().quantity,
                    pname: child.data().pname,
                    price: child.data().price,
                    discount: child.data().discount,
                    img1: child.data().img1,
                    brand: child.data().brand,


                  })



                }

              )
            dispatch({
              type: FETCH_CART_SUCCESS, payload:
              {
                Cart: list,
                total: count,
                totalprice: total
              }
            })
          }
        )

      return () => subscribe()

    }



    catch (err) {

      console.log("SOME PROBLEM IN CAERT")
      dispatch({ type: FETCH_CART_FAILED, payload: err })

    }
  }




}
