import { tsNullKeyword } from "@babel/types"
import { Item } from "react-native-paper/lib/typescript/components/List/List"
import { ADD_FEATURED_FAILED, ADD_FEATURED_SUCCESS, DELETE_FEATURED_FAILED, DELETE_FEATURED_REQUEST, DELETE_FEATURED_SUCCESS, LOAD_FEATURED_FAILED, LOAD_FEATURED_REQUEST, LOAD_FEATURED_SUCCESS } from "../Types/FeaturedTypes"



const initialstate = {

    featuredProducts: [],
    featuredLoading: false,
    featuredError: null,

    addfeatureLoad: false,
    addfeatureError: null,

    deleteLoad: false,
    deleteError: null

}


const FeaturedReducer = (state = initialstate, action) => {

    switch (action.type) {
        case LOAD_FEATURED_REQUEST:
            return {
                ...state,
                featuredLoading: true,
                featuredError: null
            }
        case LOAD_FEATURED_SUCCESS:

            return {
                ...state,
                featuredProducts: action.payload,
                featuredLoading: false
            }
        case LOAD_FEATURED_FAILED:
            return {
                ...state, featuredLoading: false,
                featuredError: action.payload
            }

        case DELETE_FEATURED_REQUEST:
            return {
                ...state,
                deleteLoad: false,
                deleteError: null

            }
        case DELETE_FEATURED_SUCCESS:


        let newArr=[...state.featuredProducts]

        const index=newArr.findIndex(item=>item.key==action.payload.id)
        newArr.splice(index,1)
            return {
                ...state,
                featuredProducts:newArr,
                deleteLoad: false,

            }

        case DELETE_FEATURED_FAILED:
            return {
                ...state,
                deleteLoad: false,
                deleteError: action.payload
            }
        case ADD_FEATURED_SUCCESS:
            return {
                ...state,
                addfeatureLoad: true,
                addfeatureError: null
            }
        case ADD_FEATURED_SUCCESS:
            return {
                ...state,
                addfeatureLoad: false,
            }
        case ADD_FEATURED_FAILED:
            return {
                ...state,
                addfeatureLoad: false,
                addfeatureError: action.payload
            }

        default:
            return state

    }

}
export default FeaturedReducer