


import { ActivityIndicatorComponent } from "react-native";
import { stat } from "react-native-fs";
import { LOAD_HOME_PRODUCTS_REQUEST, 
    LOAD_HOME_PRODUCTS_SUCCESS,
     LOAD_PRODUCTS_SUCCESS, 
     SEARCH_PRODUCTS_FAILED, 
     SEARCH_PRODUCTS_REQUEST,
     SEARCH_PRODUCTS_SUCCESS} from "../Types/ProductTypes";

const initialstate={
    

   products:[],
   
   HomeProducts:[],


   prodLoad:false,
   homeprodLoad:false,

   productsLoadError:null,
   HomeProductsLoadError:null
    
}


const ProductReducer=(state=initialstate,action)=>


{

    switch(action.type)
    {
   
        case LOAD_PRODUCTS_SUCCESS:

            return {...state,products:action.payload}


        case LOAD_HOME_PRODUCTS_REQUEST:
            console.log("REQUESTED HOMESCREEN")
        case LOAD_HOME_PRODUCTS_SUCCESS:
            console.log(action.payload+"PAYLOAD")
            return {...state,HomeProducts:action.payload}
        case SEARCH_PRODUCTS_REQUEST:
            
        case SEARCH_PRODUCTS_SUCCESS:
            console.log(action.payload+'SEARCH RESULT')
            return {...state,products:action.payload}
        case SEARCH_PRODUCTS_FAILED:
            return {...state,productsLoadError:action.payload}   
        default:
            return state

    }

}
export default ProductReducer