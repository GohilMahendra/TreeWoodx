import { stat } from "react-native-fs"
import { LOAD_FEATURED_FAILED, LOAD_FEATURED_REQUEST, LOAD_FEATURED_SUCCESS } from "../Types/FeaturedTypes"
import { LOAD_MORE_ORDERS_FAILED, LOAD_MORE_ORDERS_REQUEST, LOAD_MORE_ORDERS_SUCCESS, LOAD_ORDERS_FAILED, LOAD_ORDERS_REQUEST, LOAD_ORDERS_SUCCESS, MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS } from "../Types/OrderReducer"



const initialstate = {
    Orders: [],
    loadOrderError: null,
    loadOrdersLoading: false,

    loadMoreError: null,
    loadMoreLoading: false,


    orderSuccess: false,
    orderLoading: false,
    orderFailedError: null,

    lastKeyOrder: null

}


const OrderReducer = (state = initialstate, action) => {

    switch (action.type) {
        case MAKE_ORDER_REQUEST:
            return {
                ...state,
                orderFailedError: null,
                orderLoading: true,
                OrderSuccess: false
            }

        case MAKE_ORDER_SUCCESS:
            console.log("SUCEESS ORDER ")
            return { ...state, orderSuccess: true, orderLoading: false }

        case MAKE_ORDER_FAILED:
            return {
                ...state,
                orderFailedError: action.payload,
                orderLoading: false
            }

        case LOAD_ORDERS_REQUEST:
            return {
                ...state, loadOrdersLoading: true,
                loadOrderError: null
            }

        case LOAD_ORDERS_SUCCESS:
            return {
                ...state, loadOrdersLoading: false,
                Orders: action.payload.orders,
                lastKeyOrder: action.payload.lastKey

            }
        case LOAD_ORDERS_FAILED:
            return {
                ...state, loadOrdersLoading: false,
                loadOrderError: action.payload
            }
        case LOAD_MORE_ORDERS_REQUEST:
            return {
                ...state,
                loadMoreLoading:true,
                loadMoreError:null
            }
        case LOAD_MORE_ORDERS_SUCCESS:
            return {
                ...state,
                loadMoreLoading:false,
                Orders:[...state.Orders,...action.payload.orders]
            }
        case LOAD_MORE_ORDERS_FAILED:
            return {
                ...state,
                loadMoreLoading:false,
                loadMoreError:action.payload
            }
        default:
            return state

    }

}
export default OrderReducer