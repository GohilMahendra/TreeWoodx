
import auth, { firebase } from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import { getDiscountRange, getPriceRange } from "../../functions/CalculationHelpers";

import {
    LOAD_HOME_PRODUCTS_FAILED,
    LOAD_HOME_PRODUCTS_REQUEST,
    LOAD_HOME_PRODUCTS_SUCCESS,
    LOAD_MORE_PRODUCTS_FAILED,

    LOAD_MORE_PRODUCTS_SUCCESS,
    LOAD_PRODUCTS_FAILED,
    LOAD_PRODUCTS_SUCCESS,

} from "../Types/ProductTypes";



const MAX_FETCH_LIMIT = 2

export const DeleteProduct = (pid) => {

    return async (dispatch) => {
        firestore().collection('products').doc(pid).delete().
            then(
                suc => {

                    console.log("DELETED SUCCESSFULLY!!YEY")
                }
            ).catch(err => console.log(err))

    }
}
export const AddProduct = (key, prod) => {
    return async (dispatch) => {
        ifexist = await firestore().collection('products').doc(key).get()

        if (ifexist.exists || key != null) {


        }

    }
}
export const AddStock = (pid, stk) => {
    return async (dispatch) => {

        try {
            const res = await firestore().collection('products').doc(pid).update
                (
                    {
                        stock: firestore.FieldValue.increment(stk)
                    }
                )
        }
        catch (err) {

            console.log(err)

        }

    }

}

export const ChangeDiscount = (pid, disc, price) => {
    return async (dispatch) => {
        try {


            console.log(price)
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

        }
        catch (err) {

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

    if (filters.material != "" && filters.material != undefined && filters.material != null) {

        qry = qry.where('material', '==', filters.material)
    }
    if (filters.priceRange != "" && filters.priceRange != undefined && filters.priceRange != null) {
        qry = qry.where('priceRange', '==', filters.priceRange)

    }
    if (filters.discountRange != "" && filters.discountRange != undefined && filters.discountRange != null) {
        qry = qry.where('discountRange', '==', filters.discountRange)

    }
    if (filters.color != "" && filters.color != undefined && filters.color != null) {
        qry = qry.where('color', '==', filters.color)

    }
    if (filters.brand != "" && filters.brand != undefined && filters.brand != null) {
        qry = qry.where('brand', '==', filters.brand)

    }
    if (filters.search != "" && filters.search != undefined && filters.search != null) {
        qry = qry.where('pname', '==', filters.search)

    }

    return qry

}


export const LoadProducts = (filters = null) => {
    return async (dispatch) => {

        try {
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

            console.log(lastkey)
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


export const loadMoreProducts = (filters, lastindex) => {
    return async (dispatch) => {


        try {

            if (lastindex == null) {
                console.log("NULL INDEX")
                return
            }


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
            console.log(err)
            dispatch({ type: LOAD_MORE_PRODUCTS_FAILED, payload: err })
        }


    }

}

