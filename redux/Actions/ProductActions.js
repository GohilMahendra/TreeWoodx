
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import product from "../../screens/Product";
import {
    LOAD_HOME_PRODUCTS_FAILED,
    LOAD_HOME_PRODUCTS_REQUEST,
    LOAD_HOME_PRODUCTS_SUCCESS,
    LOAD_MORE_PRODUCTS_FAILED,
    LOAD_MORE_PRODUCTS_REQUEST,
    LOAD_MORE_PRODUCTS_SUCCESS,
    LOAD_PRODUCTS_FAILED,
    LOAD_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAILED,
    SEARCH_PRODUCTS_SUCCESS
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
        console.log("Add stock called")

        try {
            const res = await firestore().collection('products').doc(pid).update
                (
                    {
                        stock: stk
                    }
                )

            console.log(res)
        }
        catch (err) {

            console.log(err)

        }

    }

}

export const ChangeDiscount = (pid, disc) => {
    return async (dispatch) => {
        try {
            const res = await firestore().collection('products').doc(pid).update
                (
                    {
                        discount: disc
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


            console.log(products + "prodcu")



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

export const LoadProducts = (category, search) => {
    return async (dispatch) => {


        try {


            let quary = ""
            if (category != null && 
                search == "" && 
                category != "All"
                && category != "Search") 
            {
                quary = firestore()
                    .collection('products')
                    .where('cat', '==', category)
                    .limit(MAX_FETCH_LIMIT)
            }

            else if (search != null && search != "") {
                quary = firestore()
                    .collection('products')
                    .where('pname', '>=', search)
                    .where('pname', '<=', search + '\uf8ff').limit(MAX_FETCH_LIMIT)


            }
            else {
                quary = firestore()
                    .collection('products')
                    .limit(MAX_FETCH_LIMIT)
            }





            const products = await quary.get()

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

            var lastkey = null
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


export const loadMoreProducts = (category, search, lastindex) => {
    return async (dispatch) => {


        try {

            if (lastindex == null || search.length > 0 || search != "") {
                console.log("NULL INDEX")
                return
            }
    
            if (category != null &&

                category != "All"
                && category != "Search") {

                quary = firestore().collection('products')
                    .where('cat', '==', category)
                    .where('pname','==',search)
                    .orderBy(firestore.FieldPath.documentId())
                    .startAfter(lastindex)
                    .limit(MAX_FETCH_LIMIT)

            }

            else {
                quary = firestore()
                    .collection('products')
                    .orderBy(firestore.FieldPath.documentId())
                    .startAfter(lastindex)
                    .limit(MAX_FETCH_LIMIT)
            }



            var list = []

            const products = await quary.get()

            console.log(products)
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

            console.log(list + "LIST")
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

