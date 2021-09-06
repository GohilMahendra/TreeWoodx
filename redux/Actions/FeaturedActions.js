

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { categories } from "../../data/categories";
const FetchSimilarProducts=(category)=>
{
    return async(dispatch)=>
    {

        const quary=firestore().collection('products').where('prod.cat',"==",category).limit(10)

        const similarProducts=await quary.get()

        list=[]
        similarProducts.forEach
        (
            function(child)
            {
                list.push({
                    key: child.id,
                    quantity:child.data().quantity,
                    pname:child.data().pname,
                    price: child.data().price,
                    discount:child.data().discount,
                    img1:child.data().img1,
                    brand:child.data().brand,
                  
                    
                  })
        
            }
        )


        console.log(list)
    }
}

const FetchMoreSimilarProducts=()=>
{
    return async(dispatch)=>
    {
        
    }
}

export const FetchSimilarBrands=(brand)=>
{
    return async(dispatch)=>
    {
        const quary=firestore().collection('products').where('prod.brand',"==",brand).limit(10)

        const similarProducts=await quary.get()

        list=[]

        console.log(similarProducts.docs)
        similarProducts.forEach
        (
            function(child)
            {

                console.log(child)
                 
                list.push({
                    key: child.id,
                    pname:child.data().prod.pname,
                    pprice: child.data().prod.price,
                    pdisc:child.data().prod.discount,
                    pimage:child.data().prod.img1,
                    pbrand:child.data().prod.brand
                  })
        
            }
        )


        console.log(list)


    }
}

const FetchMoreSimilarBrands=()=>
{
    return async(dispatch)=>
    {
        
    }
}