import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { getDiscountRange, getPriceRange } from "../../functions/CalculationHelpers";

import {
    ADD_PRODUCT_FAILED,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,

    DELETE_PRODUCT_FAILED,

    DELETE_PRODUCT_REQUEST,

    DELETE_PRODUCT_SUCCESS,

    LOAD_HOME_PRODUCTS_FAILED,
    LOAD_HOME_PRODUCTS_REQUEST,
    LOAD_HOME_PRODUCTS_SUCCESS,
    LOAD_MORE_PRODUCTS_FAILED,

    LOAD_MORE_PRODUCTS_REQUEST,

    LOAD_MORE_PRODUCTS_SUCCESS,
    LOAD_PRODUCTS_FAILED,
    LOAD_PRODUCTS_REQUEST,
    LOAD_PRODUCTS_SUCCESS,

} from "../Types/ProductTypes";



const MAX_FETCH_LIMIT = 4

export const DeleteProduct = (pid) => {

    return async (dispatch) => {

        try {

            dispatch({ type: DELETE_PRODUCT_REQUEST })
            const del = await firestore()
                .collection('products')
                .doc(pid)
                .delete()


            dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: { id: pid } })

        }
        catch (err) {
            dispatch({ type: DELETE_PRODUCT_FAILED, payload: err })
            Alert.alert("Delete failed", "" + err)

        }


    }
}
export const AddProduct = (key = "", prod) => {
    return async (dispatch) => {

        try {
            dispatch({ type: ADD_PRODUCT_REQUEST })
            if (key != "" && key != "") {
                await firestore()
                    .collection('products')
                    .doc(key)
                    .set(prod)
            }
            else {
                await firestore()
                    .collection('products')
                    .add(prod)
            }
            Alert.alert("Product added SuccessFully", "Now it is listed on app !!")
            dispatch({ type: ADD_PRODUCT_SUCCESS })

        }
        catch (err) {
            dispatch({ type: ADD_PRODUCT_FAILED })

            Alert.alert("" + err)
            console.log(err)

        }


    }
}
export const AddStock = (pid, stk) => {
    return async (dispatch) => {

        try {


            const res = await firestore().collection('products').doc(pid).update
                (
                    {
                        stock: firestore.FieldValue.increment(Number(stk))
                    }
                )

            Alert.alert("Stock Added", "Extra Stock of " + stk + "Items Added")
        }
        catch (err) {

            console.log(err)
            Alert.alert("Error", "" + err)

        }

    }

}

export const ChangeDiscount = (pid, disc, price) => {
    return async (dispatch) => {
        try {

            const priceafterdisc = price - (price * disc) / 100

            const discountRange = getDiscountRange(disc)
            const priceRange = getPriceRange(priceafterdisc)
            const res = await firestore().collection('products').doc(pid).update
                (
                    {
                        discount: disc,
                        priceafterdisc: priceafterdisc,
                        discountRange: discountRange,
                        priceRange: priceRange
                    }
                )
            Alert.alert("DISCOUNT SUCCESS", "REFRESH TO SEE CHANGE")

        }
        catch (err) {

            Alert.alert("Error", "" + err)

        }

    }

}

export const LoadInitialProducts = (name) => {
    return async (dispatch) => {

        dispatch({ type: LOAD_HOME_PRODUCTS_REQUEST })

        try {
            const quary = (name == "All" || name == null) ?
                firestore()
                    .collection('products')
                    .limit(10) :

                firestore()
                    .collection('products')
                    .where("cat", '==', name)
                    .limit(10)

            const products = await quary.get()

            var list = []

            products.forEach(function (child) {


                list.push({
                    key: child.id,
                    pname: child.data().pname,
                    priceafterdisc: child.data().priceafterdisc,
                    pprice: child.data().price,
                    pdisc: child.data().discount,
                    pimage: child.data().img1,
                    pbrand: child.data().brand,

                })
            });

            dispatch({
                type: LOAD_HOME_PRODUCTS_SUCCESS, payload: list
            })

        }
        catch (err) {
            console.log(err)
            dispatch({
                type: LOAD_HOME_PRODUCTS_FAILED, payload: err
            })
        }
    }
}


const qryBuilder = (filters) => {

    let qry = firestore().collection('products')

    let teststring = ""
    if (filters.material != "" && filters.material != undefined && filters.material != null) {

        teststring += filters.material
        qry = qry.where('material', '==', filters.material)
    }
    if (filters.priceRange != "" && filters.priceRange != undefined && filters.priceRange != null) {
        qry = qry.where('priceRange', '==', filters.priceRange)
        teststring += filters.priceRange

    }
    if (filters.cat != "" && filters.cat != undefined && filters.cat != null) {
        qry = qry.where('cat', '==', filters.cat)
        teststring += filters.cat

    }
    if (filters.discountRange != "" && filters.discountRange != undefined && filters.discountRange != null) {
        qry = qry.where('discountRange', '==', filters.discountRange)
        teststring += filters.discountRange
    }
    if (filters.color != "" && filters.color != undefined && filters.color != null) {
        qry = qry.where('color', '==', filters.color)
        teststring += filters.color

    }
    if (filters.brand != "" && filters.brand != undefined && filters.brand != null) {
        qry = qry.where('brand', '==', filters.brand)
        teststring += filters.brand

    }
    if (filters.search != "" && filters.search != undefined && filters.search != null) {
        qry = qry.where('pname', '==', filters.search)
        teststring += filters.search

    }

    return qry

}


export const LoadProducts = (filters = null) => {
    return async (dispatch) => {

        try {

            dispatch({ type: LOAD_PRODUCTS_REQUEST })
            let qry = null

            if (filters == null) {
                qry = firestore()
                    .collection('products')
            }
            else {
                qry = qryBuilder(filters)
            }

            const products = await qry.limit(MAX_FETCH_LIMIT).get()

            var list = []
            products.forEach(function (child) {


                list.push({
                    key: child.id,
                    pname: child.data().pname,
                    pprice: child.data().price,
                    priceafterdisc: child.data().priceafterdisc,
                    pdisc: child.data().discount,
                    pstock: child.data().stock,
                    pimage: child.data().img1,
                    pbrand: child.data().brand
                })
            }

            )


            let lastkey = null
            if (list.length >= MAX_FETCH_LIMIT) {
                lastkey = list[list.length - 1].key
            }


            dispatch({
                type: LOAD_PRODUCTS_SUCCESS, payload:
                {
                    Products: list,
                    lastKey: lastkey
                }
            })


        }
        catch (err) {
            dispatch({ type: LOAD_PRODUCTS_FAILED, payload: err })
        }

    }

}


export const loadMoreProducts = (filters) => {
    return async (dispatch, getState) => {

        try {


            const lastindex = getState().Products.lastindex
            if (lastindex == null) {
                console.log("NULL INDEX END REACHED")
                return
            }

            dispatch({ type: LOAD_MORE_PRODUCTS_REQUEST })


            let qry = null


            if (filters == null) {
                qry = firestore()
                    .collection('products')

            }
            else {
                qry = qryBuilder(filters)
            }


            var list = []

            const products = await qry
                .orderBy(firestore.FieldPath.documentId())
                .startAfter(lastindex)
                .limit(MAX_FETCH_LIMIT)
                .get()

            products.forEach(function (child) {


                list.push({
                    key: child.id,
                    pname: child.data().pname,
                    pprice: child.data().price,
                    priceafterdisc: child.data().priceafterdisc,
                    pdisc: child.data().discount,
                    pstock: child.data().stock,
                    pimage: child.data().img1,
                    pbrand: child.data().brand
                })
            }

            )

            let lastkey = null
            if (list.length >= MAX_FETCH_LIMIT) {
                lastkey = list[list.length - 1].key
            }


            dispatch({
                type: LOAD_MORE_PRODUCTS_SUCCESS, payload:
                {
                    Products: list,
                    lastKey: lastkey
                }
            })


        }
        catch (err) {
            Alert.alert("" + err)
            dispatch({ type: LOAD_MORE_PRODUCTS_FAILED, payload: err })
        }


    }

}

