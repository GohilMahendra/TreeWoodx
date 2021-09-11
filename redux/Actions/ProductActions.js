
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import {
    LOAD_HOME_PRODUCTS_FAILED,
    LOAD_HOME_PRODUCTS_REQUEST,
    LOAD_HOME_PRODUCTS_SUCCESS,
    LOAD_PRODUCTS_FAILED,
    LOAD_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAILED,
    SEARCH_PRODUCTS_SUCCESS
} from "../Types/ProductTypes";




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


export const searchProd = (search) => {

    return async (dispatch) => {

        try {
            ser = firestore().collection('products').where('pname', '>=', search).where('pname', '<=', search + '\uf8ff').limit(10)

            const products = await ser.get()

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
            })


            dispatch({ type: SEARCH_PRODUCTS_SUCCESS, payload: list })


        }
        catch (err) {
            dispatch({ type: SEARCH_PRODUCTS_FAILED, payload: err })
        }
    }
}
export const LoadProducts = (category) => {
    return async (dispatch) => {


        try {


            console.log(category)

            let quary = ""
            if (category != null && category != "All" && category != "Search")
                quary = firestore()
                    .collection('products')
                    .where('cat', '==', category)
                    .limit(10)
            else
                quary = firestore()
                    .collection('products')
                    .limit(10)


            quary.onSnapshot(
                (snapshot) => {

                    var list = []

                    snapshot.forEach(function (child) {


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
                    dispatch({ type: LOAD_PRODUCTS_SUCCESS, payload: list })

                })



        }
        catch (err) {
            dispatch({ type: LOAD_PRODUCTS_FAILED, payload: err })
        }





    }



}


export const LoadInitialProducts = (name) => {
    return async (dispatch) => {

        dispatch({ type: LOAD_HOME_PRODUCTS_REQUEST })

        try {
            const quary = (name == "All") ? firestore().collection('products').limit(10) : firestore().collection('products').where("cat", '==', name).limit(10)
            const subcription = quary.onSnapshot(
                snapshot => {
                    var list = []

                    snapshot.forEach(function (child) {


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
                    dispatch({ type: LOAD_HOME_PRODUCTS_SUCCESS, payload: list })
                }).catch(err => console.log(err));

        }
        catch (err) {
            dispatch({ type: LOAD_HOME_PRODUCTS_FAILED, payload: err })
        }





    }
}