


import { ActivityIndicatorComponent } from "react-native";
import { stat } from "react-native-fs";
import {
    LOAD_HOME_PRODUCTS_FAILED, LOAD_HOME_PRODUCTS_REQUEST,
    LOAD_HOME_PRODUCTS_SUCCESS,
    LOAD_PRODUCTS_FAILED,
    LOAD_PRODUCTS_REQUEST,
    LOAD_PRODUCTS_SUCCESS,
    LOAD_MORE_PRODUCTS_REQUEST,
    LOAD_MORE_PRODUCTS_SUCCESS,
    LOAD_MORE_PRODUCTS_FAILED,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILED,
   
} from "../Types/ProductTypes";

const initialstate = {


    products: [],

    HomeProducts: [],
    prodLoad: false,
    homeprodLoad: false,
    moreproductsLoad: false,

    addProductLoad: false,
    addProductError: null,

    lastindex: null,

    productsLoadError: null,
    HomeProductsLoadError: null,
    moreproductsLoadError: null,

}


const ProductReducer = (state = initialstate, action) => {

    switch (action.type) {

        case LOAD_PRODUCTS_REQUEST:
            return {
                ...state,
                productsLoadError: null,
                prodLoad: true
            }

        case LOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload.Products,
                lastindex: action.payload.lastKey,
                prodLoad: false
            }

        case LOAD_PRODUCTS_FAILED:
            return {
                ...state,
                prodLoad: false,
                productsLoadError: action.payload
            }

        case LOAD_MORE_PRODUCTS_REQUEST:
            return {
                ...state,
                moreproductsLoadError: null,
                moreproductsLoad: true

            }
        case LOAD_MORE_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: [...state.products, ...action.payload.Products],
                moreproductsLoad: false,
                lastindex: action.payload.lastKey

            }
        case LOAD_MORE_PRODUCTS_FAILED:
            return {
                ...state,
                moreproductsLoad: false,
                moreproductsLoadError: action.payload
            }

        case LOAD_HOME_PRODUCTS_REQUEST:
            console.log("REQUESTED HOMESCREEN")
            return {
                ...state,
                homeprodLoad: true,
                HomeProductsLoadError: null
            }

        case LOAD_HOME_PRODUCTS_SUCCESS:
            console.log(action.payload + "PAYLOAD")
            return {
                ...state,
                HomeProducts: action.payload,
                homeprodLoad: false
            }

        case LOAD_HOME_PRODUCTS_FAILED:
            return {
                ...state,
                HomeProductsLoadError: action.payload,
                homeprodLoad: false
            }

        case ADD_PRODUCT_REQUEST:
            return {
                ...state,
                addProductLoad: true,
                addProductError: null
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                addProductLoad: false,
               
            }
        case ADD_PRODUCT_FAILED:
            return {
                ...state,
                addProductLoad: false,
                addProductError: action.payload
            }

        default:
            return state

    }

}
export default ProductReducer