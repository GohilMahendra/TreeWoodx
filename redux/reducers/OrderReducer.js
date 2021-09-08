import { stat } from "react-native-fs"
import { LOAD_FEATURED_FAILED, LOAD_FEATURED_REQUEST, LOAD_FEATURED_SUCCESS } from "../Types/FeaturedTypes"
import { MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS } from "../Types/OrderReducer"



const initialstate={
    


    
    Orders=[],
    loadOrderError:null,


    OrderSuccess:false,

    orderLoading:false,
    orderFailedError:null,

    
 
    
}


const OrderReducer=(state=initialstate,action)=>


{

    switch(action.type)
    {
           case MAKE_ORDER_REQUEST:
               return {...state,orderFailedError:null,orderLoading:true,OrderSuccess:false}
           case MAKE_ORDER_SUCCESS:
               console.log("SUCEESS ORDER ")
               return {...state,OrderSuccess:true,orderLoading:false}
           case MAKE_ORDER_FAILED:
               return {...state,orderFailedError:action.payload,orderLoading:false}
           default:
               return state

    }

}
export default OrderReducer