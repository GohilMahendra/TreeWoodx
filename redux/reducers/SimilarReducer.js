

import {

    

    LOAD_SIMILAR_BY_PRODUCTS_FAILED,
    LOAD_SIMILAR_BY_PRODUCTS_SUCCESS,
    LOAD_SIMILAR_BY_PRODUCTS_REQUEST,
    LOAD_MORE_SIMILAR_BY_PRODUCTS_REQUEST,
    LOAD_MORE_SIMILAR_BY_PRODUCTS_SUCCESS,
    LOAD_MORE_SIMILAR_BY_PRODUCTS_FAILED,

    
  } from "../Types/SimilarTypes";


const initialstate={
    


    similarProducts:[],
    similarBrands:[],


    similarProductsInitial:[],
    similarBrandsInitial:[],



    moreProductsRefreash:null,
    moreBrandsRefreash:null,

    lastKeyProduct:null,
    lastKeyBrand:null,

    similarProductsError:null,
    similarBrandsError:null,

    
 
    
}


const SimilarReducer=(state=initialstate,action)=>


{

    switch(action.type)
    {


        case LOAD_SIMILAR_BY_PRODUCTS_REQUEST:
            return {...state,similarProductsError:null}

        case LOAD_SIMILAR_BY_PRODUCTS_SUCCESS:
         
            return {...state,similarProducts:action.payload.Cart
                ,lastKeyProduct:action.payload.lastKey}

        case LOAD_SIMILAR_BY_PRODUCTS_FAILED:
            return {...state,similarProductsError:action.payload}
        // case LOAD_MORE_SIMILAR_BY_PRODUCTS_REQUEST:
        case LOAD_MORE_SIMILAR_BY_PRODUCTS_SUCCESS:
            let data=[...state.similarProducts,...action.payload.Cart]
            let length=data.length
            
            console.log("LOAD MORE SUCCESS")
            console.log(length)
            return {...state,similarProducts:[...state.similarProducts,...action.payload.Cart],
            lastKeyProduct:action.payload.lastKey
            }
        // case LOAD_MORE_SIMILAR_BY_PRODUCTS_FAILED:
        //     return {...state}
         default:
            return state

    }

}
export default SimilarReducer