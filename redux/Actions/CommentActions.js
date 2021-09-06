
 import auth from "@react-native-firebase/auth";

 import firestore from "@react-native-firebase/firestore";
import { ADD_COMMENT_FAILED, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS } from "../Types/CommentTypes";
 


//  export const LoadExternalDetails=async()=>
//  {
     
//     return async(dispatch)=>
//     {

//     }
//  }

//  export const FetachReviews=async()=>
//  {
//     return async(dispatch)=>
//     {
        
//     }

//  }
//  export const fetchMoreReviews=async()=>
//  {
//     return async(dispatch)=>
//     {
        
//     }

//  }


export const test=async()=>
{

  return async(dispatch)=>
  {
  console.log("TESTINFF")
  }
 }
 export const AddComment=(review,key,todaysdate)=>
 {
    return async(dispatch)=>
    {



      dispatch({type:ADD_COMMENT_REQUEST})

   

    if(review.review=="" || review.review==undefined)
    {
      alert('please add review and then try your thoughts are valueable to US')
      return
    }


    const ifExists=await firestore()
                          .collection('reviews')
                          .doc(key)
                          .collection('review').doc(auth().currentUser.uid)
                          .get()

    

    let avg=await firestore()
                    .collection('reviews')
                    .doc(key)
                    .get()

    
                          
    
    
     if(!avg.exists)
     {

        avg={
          one:0,
          two:0,
          three:0,
          four:0,
          five:0,
          total:0,
          avg:0
        }

     }
     else
     {
       avg=avg.data()
       
           }



     if(ifExists.exists)
     {


      switch(ifExists.data().star)
      {
        case 1:
          avg.one=avg.one-1
          break;
        case 2:
          avg.two=avg.two-1
          break;
        case 3:
          avg.three=avg.three-1
          break;
        case 4:
          avg.four=avg.four-1
          break;
        default:
          avg.five=avg.five-1


      }
      total=avg.total * avg.avg
      total-=ifExists.data().star
      let p=avg.total
      p--

      avg.total=p

      console.log(p)
    let average=total/p

    if(p<=0)
     {
       average=0
     }

      avg.avg=average
  
     }

     console.log(avg)

     switch(review.rate)
     {
       case 1:
         avg.one++;
         break;
       case 2:
         avg.two++;
         break;
       case 3:
         avg.three++;
         break;
       case 4:
         avg.four++;
         break;
       default:
         avg.five++;
        
     }


     avg.total++;


     avg.avg=((avg.avg*(avg.total-1))+(review.rate))/avg.total

     console.log(avg)


     try
     {
    await firestore().collection('reviews').doc(key).set
     (
       avg
     )
     
    await firestore().collection('reviews').doc(key)
       .collection('review')
       .doc(auth().currentUser.uid)
       .set(
         {
          date:todaysdate,
          username:auth().currentUser.displayName
          ,star:review.rate,
          review:review.review

         }
       )


      dispatch({type:ADD_COMMENT_SUCCESS})
     }
     catch(err)
     {

      dispatch({type:ADD_COMMENT_FAILED,payload:err})
     }


        
     }

 }