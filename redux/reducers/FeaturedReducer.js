import { DELETE_FEATURED_FAILED, DELETE_FEATURED_REQUEST, DELETE_FEATURED_SUCCESS, LOAD_FEATURED_FAILED, LOAD_FEATURED_REQUEST, LOAD_FEATURED_SUCCESS } from "../Types/FeaturedTypes"



const initialstate={
    


    featuredProducts:[],

    featuredLoading:false,

    featuredError:null,
 
    
}


const FeaturedReducer=(state=initialstate,action)=>


{

    switch(action.type)
    {
        case LOAD_FEATURED_REQUEST:
            return {...state,featuredLoading:true,featuredError:null}
        case LOAD_FEATURED_SUCCESS:
            console.log("featured Request Success")
            return {...state,featuredProducts:action.payload,featuredLoading:false}
        case LOAD_FEATURED_FAILED:
            return {...state,featuredLoading:false,featuredError:action.payload}
    
        case DELETE_FEATURED_REQUEST:
        case DELETE_FEATURED_SUCCESS:
        case DELETE_FEATURED_FAILED:
        
        default:
            return state

    }

}
export default FeaturedReducer