

import {

    LOAD_MORE_SIMILAR_BY_BRANDS_SUCCESS,
    LOAD_SIMILAR_BY_BRANDS_SUCCESS,
    LOAD_SIMILAR_BY_BRANDS_FAILED
  } from "../Types/SimilarTypes";


const initialstate={
    


    similarProducts:[],
    similarBrands:[],


    similarProductsError:null,
    similarBrandsError:null,

    
 
    
}


const SimilarReducer=(state=initialstate,action)=>


{

    switch(action.type)
    {


        case LOAD_SIMILAR_BY_BRANDS_SUCCESS:
            return {...state,similarBrandsError:null,similarBrands:action,payload}
        case LOAD_SIMILAR_BY_BRANDS_FAILED:
            
         default:
            return state

    }

}
export default SimilarReducer