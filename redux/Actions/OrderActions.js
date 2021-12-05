import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { LOAD_MORE_ORDERS_FAILED, LOAD_MORE_ORDERS_REQUEST, LOAD_MORE_ORDERS_SUCCESS, LOAD_ORDERS_FAILED, LOAD_ORDERS_REQUEST, LOAD_ORDERS_SUCCESS, MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS } from "../Types/OrderReducer";



const MAX_FETCH_LIMIT = 1



const checkIFinStock = async (cart) => {

  var inStock = true
  var childName = null
  cart.forEach
    (

      async function (child) {
        const prodref = firestore().collection('products').doc(child.key)

        const data = await prodref.get()
        if (data.data().stock < child.quantity || data.data().stock <= 0) {
          inStock = false
          childName = child.pname
        }
      }
    )



  return { inStock, childName }

}


export const getOrders = (All = null) => {

  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_ORDERS_REQUEST })

      let quary = null

      if (All != null && All == "All") {
        quary = firestore()
          .collection('Orders')
          .limit(MAX_FETCH_LIMIT)

      }
      else {
        quary = firestore()
          .collection('Orders')
          .where('userid', '==', auth().currentUser.uid)
          .limit(MAX_FETCH_LIMIT)
      }
      const subscription = quary.onSnapshot(
        (snapshot) => {
          let list = []

          snapshot.forEach
            (
              function (child) {

                const key = child.id

                list.push({ key, ...child.data() })

              }
            )

          let lastindex = null
          if (list.length >= MAX_FETCH_LIMIT) {
            lastindex = list[list.length - 1].key
          }

          dispatch({
            type: LOAD_ORDERS_SUCCESS, payload: {
              orders: list,
              lastKey: lastindex
            }
          })

        }
        , (err) => {
          dispatch({ type: LOAD_ORDERS_FAILED, payload: "SOME ERROR IN LOADING ERROR" })


        }
      )

      return () => subscription()

    }
    catch (err) {


      dispatch({ type: LOAD_ORDERS_FAILED, payload: "SOME ERROR IN LOADING ERROR" })

    }

  }


}

export const getMoreOrders = (All = null) => {

  return async (dispatch) => {
    try {

      const lastID = getState().Orders.lastKeyOrder
      if (lastID == null) {
        return
      }
      dispatch({ type: LOAD_MORE_ORDERS_REQUEST })

      let quary = null

      if (All != null && All == "All") {
        quary = firestore()
          .collection('Orders')
          .orderBy(firestore.FieldPath.documentId())
          .startAfter(lastID)
          .limit(MAX_FETCH_LIMIT)

      }
      else {
        quary = firestore()
          .collection('Orders')
          .where('userid', '==', auth().currentUser.uid)
          .orderBy(firestore.FieldPath.documentId())
          .startAfter(lastID)
          .limit(MAX_FETCH_LIMIT)
      }


      const subscription = quary.onSnapshot(
        (snapshot) => {
          let list = []

          snapshot.forEach
            (
              function (child) {

                const key = child.id

                list.push({ key, ...child.data() })

              }
            )
          let lastindex = null
          if (list.length >= MAX_FETCH_LIMIT) {
            lastindex = list[list.length - 1].key
          }

          dispatch({
            type: LOAD_MORE_ORDERS_SUCCESS, payload: {
              orders: list,
              lastKey: lastindex
            }
          })
        },
        err => {
          dispatch({ type: LOAD_MORE_ORDERS_FAILED, payload: "SOME ERROR IN LOADING ERROR" })
        }
      )

      return ()=>subscription()

    }
    catch (err) {
      dispatch({ type: LOAD_MORE_ORDERS_FAILED, payload: "SOME ERROR IN LOADING ERROR" })

    }

  }


}
export const makeOrder = (cart, price, address, paymentDetails) => {

  return async (dispatch) => {

    try {
      dispatch({ type: MAKE_ORDER_REQUEST })
      let { inStock, childName } = await checkIFinStock(cart)
      if (inStock == false) {
        alert("could not make Transactions because Product is Out Of Stock" + childName)
        return
      }

      console.log(inStock)
      let writebatch = firestore().batch()

      cart.forEach(
        function (child) {
          const ref = firestore().collection('products').doc(child.key)
          const decrement = firestore.FieldValue.increment(-child.quantity);
          writebatch.update(ref, { stock: decrement })

        }
      )

      writebatch.commit()

      const date = new Date().toISOString()
      const order = {
        date: date,
        userid: auth().currentUser.uid,
        email: address.contactDetails.emailID,
        phoneNo: address.contactDetails.mobileno,
        name: address.contactDetails.fullName,
        totalPrice: price,
        products: cart,
        states: "Ordered",
        address: address,
        paymentDetails: paymentDetails
      }


      const success = await firestore().collection('Orders').add
        (
          order
        )
      dispatch({ type: MAKE_ORDER_SUCCESS })
    }
    catch (err) {
      dispatch({ type: MAKE_ORDER_FAILED, payload: err })
      console.log(err)
    }
  }


}

const getStatus = (status) => {

  console.log(status)
  switch (status) {

    case "Ordered":
      return "Packaged"

    case "Packaged":
      return "Shipped"

    case "Shipped":
      return "Delivered"

    default:
      return "Delivered"

  }

}
export const changeStatus = (status, id) => {
  return async (dispatch, getState) => {
    try {
      const new_status = getStatus(status)

      const res = await firestore()
        .collection('Orders')
        .doc(id)
        .update
        (
          {
            status: new_status
          }
        )


    }
    catch (err) {
      console.log(err)
    }

  }
}