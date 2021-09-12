

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { CommonActions } from "@react-navigation/routers";
import { ClipPath } from "react-native-svg";
import { categories } from "../../data/categories";

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

    LOAD_MORE_SIMILAR_BY_BRANDS_REQUEST,
    LOAD_MORE_SIMILAR_BY_BRANDS_SUCCESS,
    LOAD_MORE_SIMILAR_BY_BRANDS_FAILED,

} from "../Types/SimilarTypes";


const MAX_FETCH_LIMIT = 2

{/**

The problem i found was while doing lazy loading the size of array increase
and i dont want more then 10 items in products screen

because it is much less time when user actually opens the releted brands 
screen so theere is two way of doing this

    1) make seperate array for the product screen for loading similar 10
     products
    2) make sure flatlist of similar screen get only 10 products 
    by slicing/reducing
    array opration


i am going with first way because if user gets error in lazy loading or 
refresh time in similar Screens there is must be seprate state which is 
constant
at that time 


Google playstore uses first method i found with their UI they donwload
 10 or any constant  similars in appscreen and use same state in similar 
 Screens means user dont wait for initial loading although play store dont 
 use react native but logic is
 same

*/}


{/**


    for similar Product Screen
*/}




export const FetchSimilarProducts = (category) => {
    return async (dispatch) => {

        try {

            dispatch({ type: LOAD_SIMILAR_BY_PRODUCTS_REQUEST })
            const quary = firestore()
                .collection('products')
                .where('cat', "==", category)
                .limit(MAX_FETCH_LIMIT)

            const products = await quary.get()

            let list = []
            products.forEach
                (

                    function (child) {

                        list.push({
                            key: child.id,
                            pname: child.data().pname,
                            pprice: child.data().price,
                            pdisc: child.data().discount,
                            priceafterdisc: child.data().priceafterdisc,
                            pimage: child.data().img1,
                            pbrand: child.data().brand
                        })


                    }
                )


            var lastkey = null

            if (list.length >= MAX_FETCH_LIMIT) {
                lastkey = list[list.length - 1].key
            }

            //  console.log(list)
            dispatch({
                type: LOAD_SIMILAR_BY_PRODUCTS_SUCCESS, payload: {
                    Products: list,
                    lastKey: lastkey
                }
            })

        }


        catch
        (err) {
            console.log(err)
            dispatch({
                type: LOAD_SIMILAR_BY_PRODUCTS_FAILED,
                payload: err
            })
        }



    }
}

export const FetchMoreSimilarProducts = (category, lastindex) => {
    return async (dispatch) => {
        try {


            if (lastindex == null) {
                console.log("NULL INDEX")
                return
            }
            // dispatch({type:LOAD_MORE_SIMILAR_BY_PRODUCTS_REQUEST})
            const quary = firestore()
                .collection('products')
                .where('cat', '==', category)
                .orderBy(firestore.FieldPath.documentId())
                .startAfter(lastindex).limit(MAX_FETCH_LIMIT)
            const products = await quary.get()

            // console.log(products.docs)
            let list = []
            products.forEach
                (

                    function (child) {

                        list.push({
                            key: child.id,
                            pname: child.data().pname,
                            pprice: child.data().price,
                            pdisc: child.data().discount,
                            priceafterdisc: child.data().priceafterdisc,
                            pimage: child.data().img1,
                            pbrand: child.data().brand
                        })


                    }
                )


            var lastkey = null

            if (list.length >= MAX_FETCH_LIMIT) {
                lastkey = list[list.length - 1].key
            }


            dispatch({
                type: LOAD_MORE_SIMILAR_BY_PRODUCTS_SUCCESS, payload: {
                    Products: list,
                    lastKey: lastkey
                }
            })
        }
        catch (err) {
            console.log(err)
        }

    }
}
export const FetchSimilarBrands = (Brand) => {
    return async (dispatch) => {
        try {

            dispatch({ type: LOAD_SIMILAR_BY_BRANDS_REQUEST })
            const quary = firestore()
                .collection('products')
                .where('brand', "==", Brand)
                .limit(MAX_FETCH_LIMIT)

            const products = await quary.get()

            var list = []
            products.forEach
                (

                    function (child) {

                        list.push({
                            key: child.id,
                            pname: child.data().pname,
                            pprice: child.data().price,
                            pdisc: child.data().discount,
                            priceafterdisc: child.data().priceafterdisc,
                            pimage: child.data().img1,
                            pbrand: child.data().brand
                        })


                    }
                )

            console.log(list)


            var lastkey = null
            if (list.length >= MAX_FETCH_LIMIT) {
                lastkey = list[list.length - 1].key
            }


            dispatch({
                type: LOAD_SIMILAR_BY_BRANDS_SUCCESS,
                payload: {
                    Products: list,
                    lastKey: lastkey
                }
            })

        }


        catch
        (err) {
            console.log(err)
            dispatch({ type: LOAD_SIMILAR_BY_BRANDS_FAILED, payload: err })
        }



    }
}

export const FetchMoreSimilarBrands = (Brand, lastindex) => {
    return async (dispatch) => {
        try {

            dispatch({ type: LOAD_MORE_SIMILAR_BY_BRANDS_REQUEST })

            if (lastindex == null) {
                console.log("NULL INDEX")
                return
            }
            // dispatch({type:LOAD_MORE_SIMILAR_BY_PRODUCTS_REQUEST})
            const quary = firestore().collection('products')
                .where('brand', '==', Brand)
                .orderBy(firestore.FieldPath.documentId())
                .startAfter(lastindex)
                .limit(MAX_FETCH_LIMIT)


            const products = await quary.get()
            var list = []
            products.forEach
                (

                    function (child) {

                        list.push({
                            key: child.id,
                            pname: child.data().pname,
                            pprice: child.data().price,
                            pdisc: child.data().discount,
                            priceafterdisc: child.data().priceafterdisc,
                            pimage: child.data().img1,
                            pbrand: child.data().brand
                        })


                    }
                )

            let lastKey = null
            if (list.length >= MAX_FETCH_LIMIT)
                lastKey = list[list.length - 1].key

            dispatch({
                type: LOAD_MORE_SIMILAR_BY_BRANDS_SUCCESS,
                payload: {
                    Products: list,
                    lastKey: lastKey
                }
            })
        }
        catch (err) {

            console.log(err)
            dispatch({ type: LOAD_MORE_SIMILAR_BY_BRANDS_FAILED, payload: err })
        }

    }
}

