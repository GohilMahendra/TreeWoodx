import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import { LOAD_COMMENTS_FAILED } from "../Types/CommentTypes";


import {
    LOAD_FEATURED_REQUEST,
    LOAD_FEATURED_SUCCESS,
    LOAD_FEATURED_FAILED,
    DELETE_FEATURED_SUCCESS,
    DELETE_FEATURED_FAILED
} from "../Types/FeaturedTypes";


export const deleteFeaturedProduct = (key) => {
    return async (dispatch) => {
        dispatch({ type: LOAD_FEATURED_REQUEST })

        try {

            const quary = firestore().collection('featured').doc(key)

            const res = await quary.delete()
            dispatch({ type: DELETE_FEATURED_SUCCESS })


        }
        catch (err) {
            dispatch({ type: DELETE_FEATURED_FAILED, payload: err })

        }
    }
}
export const fetchFeaturedProducts = () => {

    return async (dispatch) => {

        dispatch({ type: LOAD_FEATURED_REQUEST })

        try {


            const quary = firestore().collection('featured')

            const featured = await quary.get()

            var list = []
            featured.forEach
                (
                    function (child) {

                        list.push(child.data())


                    }
                )

            dispatch({ type: LOAD_FEATURED_SUCCESS, payload: list })
        }
        catch (err) {
            dispatch({ type: LOAD_COMMENTS_FAILED, payload: "There is Some Problem in Featured" })

        }
    }
}