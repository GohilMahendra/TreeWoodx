import { tsNullKeyword } from "@babel/types"
import { ADD_FEATURED_SUCCESS, DELETE_FEATURED_FAILED, DELETE_FEATURED_REQUEST, DELETE_FEATURED_SUCCESS, LOAD_FEATURED_FAILED, LOAD_FEATURED_REQUEST, LOAD_FEATURED_SUCCESS } from "../Types/FeaturedTypes"



const initialstate={
    


    featuredProducts:[],

    featuredLoading:false,

    featuredError:null,


    deleteSuccess:false,
    deleteError:null
 
    
}


const FeaturedReducer=(state=initialstate,action)=>


{

    switch(action.type)
    {
        case LOAD_FEATURED_REQUEST:
            return {...state,
                featuredLoading:true,
                featuredError:null}
        case LOAD_FEATURED_SUCCESS:
          
            return {...state,
                featuredProducts:action.payload,
                featuredLoading:false}
        case LOAD_FEATURED_FAILED:
            return {...state,featuredLoading:false,
                featuredError:action.payload}
    
        case DELETE_FEATURED_REQUEST:
            return{
                ...state,
                deleteSuccess:false,
                deleteError:null

            }
        case DELETE_FEATURED_SUCCESS:
            return {
                ...state,
                deleteSuccess:true,
        
            }
             
        case DELETE_FEATURED_FAILED:
            return {
                ...state,
                deleteSuccess:false,
                deleteError:action.payload
            }
        case ADD_FEATURED_SUCCESS:
            return state
        
        default:
            return state

    }

}
export default FeaturedReducer