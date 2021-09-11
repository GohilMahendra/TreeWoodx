


import { ActivityIndicatorComponent } from "react-native";
import { stat } from "react-native-fs";
import { LOAD_HOME_PRODUCTS_FAILED, LOAD_HOME_PRODUCTS_REQUEST, 
    LOAD_HOME_PRODUCTS_SUCCESS,
     LOAD_PRODUCTS_FAILED,
     LOAD_PRODUCTS_REQUEST,
     LOAD_PRODUCTS_SUCCESS, 
     SEARCH_PRODUCTS_FAILED, 
     SEARCH_PRODUCTS_REQUEST,
     SEARCH_PRODUCTS_SUCCESS} from "../Types/ProductTypes";

const initialstate={
    

   products:[],
   
   HomeProducts:[],
   prodLoad:false,
   homeprodLoad:false,

   lastindex:null,
   
   productsLoadError:null,
   HomeProductsLoadError:null
    
}


const ProductReducer=(state=initialstate,action)=>


{

    switch(action.type)
    {

        case LOAD_PRODUCTS_REQUEST:
            return {...state,
                productsLoadError:null,
                prodLoad:true}

        case LOAD_PRODUCTS_SUCCESS:
            return {...state,
                products:action.payload,
                prodLoad:false}
        
        case LOAD_PRODUCTS_FAILED:
            return {...state,
                prodLoad:false,
                productsLoadError:action.payload}


        case LOAD_HOME_PRODUCTS_REQUEST:
            console.log("REQUESTED HOMESCREEN")
            return {...state,
                homeprodLoad:true,
                HomeProductsLoadError:null}

        case LOAD_HOME_PRODUCTS_SUCCESS:
            console.log(action.payload+"PAYLOAD")
            return {...state,
                HomeProducts:action.payload,
                homeprodLoad:false}
    
        case LOAD_HOME_PRODUCTS_FAILED:
            return {...state,
                HomeProductsLoadError:action.payload,
                homeprodLoad:false}
        
        case SEARCH_PRODUCTS_REQUEST:
            return {...state,productsLoadError:null}
            
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