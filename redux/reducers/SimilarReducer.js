

import {



    LOAD_SIMILAR_BY_PRODUCTS_FAILED,
    LOAD_SIMILAR_BY_PRODUCTS_SUCCESS,
    LOAD_SIMILAR_BY_PRODUCTS_REQUEST,
    LOAD_MORE_SIMILAR_BY_PRODUCTS_REQUEST,
    LOAD_MORE_SIMILAR_BY_PRODUCTS_SUCCESS,
    LOAD_MORE_SIMILAR_BY_PRODUCTS_FAILED,
    LOAD_SIMILAR_BY_BRANDS_REQUEST,
    LOAD_SIMILAR_BY_BRANDS_SUCCESS,
    LOAD_SIMILAR_BY_BRANDS_FAILED,
    INITIAL_LOAD_SIMILAR_BY_PRODUCTS_REQUEST,
    INITIAL_LOAD_SIMILAR_BY_BRANDS_SUCCESS,
    INITIAL_LOAD_SIMILAR_BY_PRODUCTS_SUCCESS,
    INITIAL_LOAD_SIMILAR_BY_PRODUCTS_FAILED,
    LOAD_MORE_SIMILAR_BY_BRANDS_FAILED,
    LOAD_MORE_SIMILAR_BY_BRANDS_REQUEST,
    LOAD_MORE_SIMILAR_BY_BRANDS_SUCCESS,


} from "../Types/SimilarTypes";


const initialstate = {



    similarProducts: [],
    similarBrands: [],



    similarProductsInitialLoading: false,
    similarBrandsInitialLoading: false,


    similarProductsError: null,
    similarBrandsError: null,


    moreProductsLoading: false,
    moreBrandsLoading: false,

    moreProductsError: null,
    moreBrandsError: null,

    lastKeyProduct: null,
    lastKeyBrand: null,



}


const SimilarReducer = (state = initialstate, action) => {

    switch (action.type) {


        case LOAD_SIMILAR_BY_PRODUCTS_REQUEST:
            return {
                ...state, similarProductsError: null,
                similarProductsInitialLoading: true
            }

        case LOAD_SIMILAR_BY_PRODUCTS_SUCCESS:
            return {
                ...state,
                similarProducts: action.payload.Products,
                similarProductsInitialLoading: false
                , lastKeyProduct: action.payload.lastKey
            }

        case LOAD_SIMILAR_BY_PRODUCTS_FAILED:
            return {
                ...state,
                similarProductsError: action.payload,
                similarProductsInitialLoading: false
            }

        case LOAD_MORE_SIMILAR_BY_PRODUCTS_REQUEST:
            return {
                ...state, moreProductsLoading: true,
                moreProductsError: null

            }
        case LOAD_MORE_SIMILAR_BY_PRODUCTS_SUCCESS:

            return {
                ...state,
                similarProducts: [...state.similarProducts, ...action.payload.Products]
                ,
                lastKeyProduct: action.payload.lastKey,
                moreProductsLoading: false
            }
        case LOAD_MORE_SIMILAR_BY_PRODUCTS_FAILED:
            return {
                ...state, moreProductsLoading: false,
                moreProductsError: action.payload
            }


        case LOAD_SIMILAR_BY_BRANDS_REQUEST:
            return {
                ...state,
                similarBrandsInitialLoading: true,
                similarBrandsError: null,


            }
        case LOAD_SIMILAR_BY_BRANDS_SUCCESS:
            return {
                ...state, similarBrands: action.payload.Products,
                lastKeyBrand: action.payload.lastKey,

                similarBrandsInitialLoading: false,

            }
        case LOAD_SIMILAR_BY_BRANDS_FAILED:
            return {
                ...state,
                similarBrandsError: action.payload,
                similarBrandsInitialLoading: false
            }

        case LOAD_MORE_SIMILAR_BY_BRANDS_REQUEST:
            return {
                ...state,
                moreBrandsLoading: true,
                moreBrandsError: null
            }
        case LOAD_MORE_SIMILAR_BY_BRANDS_SUCCESS:
            return {
                ...state,
                similarBrands: [...state.similarProducts, ...action.payload.Products],
                lastKeyBrand: action.payload.lastKey,
                moreBrandsLoading: false
            }
        case LOAD_MORE_SIMILAR_BY_BRANDS_FAILED:
            return {
                ...state, moreProductsError: action.payload,
                moreBrandsLoading: false
            }
        default:
            return state

    }

}
export default SimilarReducer