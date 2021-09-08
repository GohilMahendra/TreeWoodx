

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
    
} from "../Types/SimilarTypes";



export const FetchSimilarProducts=(category)=>
{
    return async(dispatch)=>
    {

        try

        {

        dispatch({type:LOAD_SIMILAR_BY_PRODUCTS_REQUEST})
        const quary=firestore().collection('products').where('cat',"==",category).limit(1)

        const products=await quary.get()

        list=[]
        products.forEach
        (

            function(child)
            {
                
                list.push({
                    key: child.id,
                    pname:child.data().pname,
                    pprice: child.data().price,
                    pdisc:child.data().discount,
                    priceafterdisc:child.data().priceafterdisc,
                    pimage:child.data().img1,
                    pbrand:child.data().brand
                  })
        

            }
        )

       let lastkey=list[list.length-1].key


       console.log(list)
      dispatch({type:LOAD_SIMILAR_BY_PRODUCTS_SUCCESS,payload:{
            Cart:list,
            lastKey:lastkey
        }})

        }

        
        catch
        (err)
        {
            console.log(err)
            dispatch({type:LOAD_SIMILAR_BY_PRODUCTS_FAILED,payload:err})
        }



    }
}

export const FetchMoreSimilarProducts=(category,lastindex)=>
{
    return async(dispatch)=>
    {
        try
        {


            if(lastindex==null)

            {
            console.log("NULL INDEX")
            return
            }
           // dispatch({type:LOAD_MORE_SIMILAR_BY_PRODUCTS_REQUEST})
            const quary=firestore().collection('products').where('cat','==',category).orderBy(firestore.FieldPath.documentId()).startAfter(lastindex).limit(2)
            const products=await quary.get()
           
          // console.log(products.docs)
            list=[]
        products.forEach
        (

            function(child)
            {
                
                list.push({
                    key: child.id,
                    pname:child.data().pname,
                    pprice: child.data().price,
                    pdisc:child.data().discount,
                    priceafterdisc:child.data().priceafterdisc,
                    pimage:child.data().img1,
                    pbrand:child.data().brand
                  })
        

            }
        )

       let lastKey=list[list.length-1].key

       if(list.length<2)
       lastKey=null

       console.log(lastKey)
        //console.log(list)
    
        dispatch({type:LOAD_MORE_SIMILAR_BY_PRODUCTS_SUCCESS,payload:{
            Cart:list,
            lastKey:lastKey
        }})
        }
        catch(err)
        {
           console.log(err)
        }
      
    }
}
const FetchMoreSimilarBrands=(category,lastindex)=>
{
    return async(dispatch)=>
    {
         
    }
}