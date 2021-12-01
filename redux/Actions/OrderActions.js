import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { LOAD_ORDERS_FAILED, LOAD_ORDERS_REQUEST, LOAD_ORDERS_SUCCESS, MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS } from "../Types/OrderReducer";


let date = new Date()
const todaysdate = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear()



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


export const getOrders = () => {

  return async (dispatch) => {
    try {
      dispatch({ type: LOAD_ORDERS_REQUEST })
      const quary = firestore().collection('Orders').where('userid', '==', auth().currentUser.uid)

      const orders = await quary.get()

      list = []

      orders.forEach
        (
          function (child) {

            const key = child.id

            list.push({ ...key, ...child.data() })

          }
        )

      dispatch({ type: LOAD_ORDERS_SUCCESS, payload: list })
    }
    catch (err) {
      dispatch({ type: LOAD_ORDERS_FAILED, payload: "SOME ERROR IN LOADING ERROR" })

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