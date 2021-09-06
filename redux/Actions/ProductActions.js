
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import { LOAD_HOME_PRODUCTS_FAILED,
     LOAD_HOME_PRODUCTS_REQUEST, 
     LOAD_HOME_PRODUCTS_SUCCESS, 
     LOAD_PRODUCTS_FAILED, 
     LOAD_PRODUCTS_SUCCESS, 
     SEARCH_PRODUCTS_FAILED, 
     SEARCH_PRODUCTS_SUCCESS 
} from "../Types/ProductTypes";




export const AddProduct=(key,prod)=>
{
    return async(dispatch)=>
    {
        ifexist=await firestore().collection('products').doc(key).get()

        if(ifexist.exists || key!=null)
        {


        }

    }
}
export const AddStock=(pid)=>
{
    return async(dispatch)=>
    {

    }

}

export const ChangeDiscount=(pid)=>
{
    return async(dispatch)=>
    {

    }
    
}


export const searchProd=(search)=>
{

    return async(dispatch)=>
    {
   
        try
        {
        ser=firestore().collection('products').where('prod.pname', '>=', search).where('prod.pname', '<=', search+ '\uf8ff').limit(20)
      
        const products=await ser.get()
    
            var list=[]
         
            products.forEach(function(child) {
        
               
                list.push({
                    key: child.id,
                    pname:child.data().pname,
                    pprice: child.data().price,
                    priceafterdisc:child.data().priceafterdisc,
                    pdisc:child.data().discount,
                    pimage:child.data().img1,
                    pbrand:child.data().brand
                  })
            })
          


            console.log(list+"SEARCH RESULT")
            dispatch({type:SEARCH_PRODUCTS_SUCCESS,payload:list})
        

    }
    catch(err)
    {
        dispatch({type:SEARCH_PRODUCTS_FAILED,payload:err})
    }
    }
}
export const LoadProducts=(category)=>
{
    return async(dispatch)=>
    {


       try
       {


        console.log(category)

        let quary=""
        if(category!=null && category!="All" && category!="Search")
        quary=firestore().collection('products').where('prod.cat','==',category).limit(20)
        else
        quary=firestore().collection('products').limit(20)
        
      
       quary.onSnapshot(
            (snapshot)=> {
    
            var list=[]
         
            snapshot.forEach(function(child) {
        
        
          
               
                list.push({
                    key: child.id,
                    pname:child.data().pname,
                    pprice: child.data().price,
                    priceafterdisc:child.data().priceafterdisc,
                    pdisc:child.data().discount,
                    pimage:child.data().img1,
                    pbrand:child.data().brand
                  })
            }
        
            )
            dispatch({type:LOAD_PRODUCTS_SUCCESS,payload:list})

        })

        

       }
       catch(err)
       {
           dispatch({type:LOAD_PRODUCTS_FAILED,payload:err})
       }
       



 
  }



}


 export const LoadInitialProducts=(name)=>
 {
     return async(dispatch)=>
     {

        dispatch({type:LOAD_HOME_PRODUCTS_REQUEST})

        try
        {
        const quary=(name=="All")?  firestore().collection('products') :firestore().collection('products').where("prod.cat",'==',name)


        

        quary.onSnapshot(
        snapshot=>
        {
        var list=[]
      
        snapshot.forEach(function(child) {
    
    
            list.push({
                key: child.id,
                pname:child.data().pname,
                priceafterdisc:child.data().priceafterdisc,
                pprice: child.data().price,
                pdisc:child.data().discount,
                pimage:child.data().img1,
                pbrand:child.data().brand,
                
              })
        });
      

      console.log(list+"INTIAL LOAD")

        dispatch({type:LOAD_HOME_PRODUCTS_SUCCESS,payload:list})


         });

         
              



        }
        catch(err)
        {
            dispatch({type:LOAD_HOME_PRODUCTS_FAILED,payload:err})
        }
        



  
   }
 }