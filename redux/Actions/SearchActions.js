

import firestore from "@react-native-firebase/firestore";
import { SEARCH_PRODUCT_AUTOCOMPLETE_FAILED, SEARCH_PRODUCT_AUTOCOMPLETE_SUCCESS } from "../Types/SearchTypes";


export const searchProd = (search) => {

    return async (dispatch) => {

        try {
            const qry = firestore()
            .collection('products')
            .where('pname', '>=', search)
            .where('pname', '<=', search+'\uf8ff')
            .limit(10)


            const searchResults = await qry.get();

         
            var list = []

            searchResults.forEach
                (
                    function (child) {
                        list.push({
                            pname: child.data().pname,
                            pbrand: child.data().brand,
                            key: child.id,
                            pcat: child.data().cat
                        })
                    }
                )
            dispatch({ type: SEARCH_PRODUCT_AUTOCOMPLETE_SUCCESS, payload: list })


        }
        catch (err) {

            console.log(err)
            dispatch({ type: SEARCH_PRODUCT_AUTOCOMPLETE_FAILED, payload: err })
        }

    }


}