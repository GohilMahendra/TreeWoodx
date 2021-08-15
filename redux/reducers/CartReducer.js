

import { stat } from "react-native-fs";
import {

    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_QUANTITY,
    LOAD_CART_ITEMS
  } from "../constants/Cart";



const initialstate={
    

    Cart:[],
    total:0,
    totalPrice:0
}
const CartReducer=(state=initialstate,action)=>


{

    switch(action.type)
    {
        case ADD_TO_CART:
        case REMOVE_FROM_CART:

        default:
            return state

    }



    


}
export default CartReducer