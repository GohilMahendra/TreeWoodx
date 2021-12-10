

import firestore from "@react-native-firebase/firestore";
import { data } from "@tensorflow/tfjs";
import { Alert } from "react-native";

import { SEARCH_PRODUCT_AUTOCOMPLETE_FAILED, SEARCH_PRODUCT_AUTOCOMPLETE_SUCCESS } from "../Types/SearchTypes";


export const searchProd = (search, productSearch = false) => {

    return async (dispatch) => {

        try {

            let qry = null

            if (productSearch) {
                qry = firestore()
                    .collection('products')
                    .where('pname', '>=', search)
                    .where('pname', '<=', search + '\uf8ff')
                    .limit(10)
            }
            else {
                qry = firestore()
                    .collection('products')
                    .where('brand', '>=', search)
                    .where('brand', '<=', search + '\uf8ff')
                    .limit(10)
            }


            const searchResults = await qry.get();


            var list = []

            searchResults.forEach
                (
                    function (child) {
                        list.push({
                            pname: child.data().pname,
                            key: child.id,
                            pbrand: child.data().brand

                        })
                    }
                )


            
          

            dispatch({ type: SEARCH_PRODUCT_AUTOCOMPLETE_SUCCESS, payload: list })


        }
        catch (err) {

            console.log(err)
            Alert.alert("" + err)
            dispatch({ type: SEARCH_PRODUCT_AUTOCOMPLETE_FAILED, payload: err })
        }

    }


}