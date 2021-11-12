import { SEARCH_PRODUCT_AUTOCOMPLETE_FAILED, SEARCH_PRODUCT_AUTOCOMPLETE_REQUEST, SEARCH_PRODUCT_AUTOCOMPLETE_SUCCESS } from "../Types/SearchTypes"


const initialstate = {


searchResults:[],
searchError:null,

//searchTerm:null

}


const SearchReducer = (state = initialstate, action) => {

    switch (action.type) {


        case SEARCH_PRODUCT_AUTOCOMPLETE_REQUEST:

            return{...state,searchError:null,searchResults:[]}
        
        case SEARCH_PRODUCT_AUTOCOMPLETE_SUCCESS:
            return {...state,searchResults:action.payload}
        case SEARCH_PRODUCT_AUTOCOMPLETE_FAILED:
            return {...state,searchError:action.payload}
        default:
            return state

    }

}
export default SearchReducer