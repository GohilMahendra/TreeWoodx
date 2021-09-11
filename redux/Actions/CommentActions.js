
import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import { lstm } from "@tensorflow/tfjs-layers/dist/exports_layers";
import {
  ADD_COMMENT_FAILED,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  LOAD_COMMENTS_FAILED,
  LOAD_COMMENTS_SUCCESS,
  LOAD_EXTERNAL_DETAILS_FAILED,
  LOAD_EXTERNAL_DETAILS_REQUEST,
  LOAD_EXTERNAL_DETAILS_SUCCESS,
  LOAD_MORE_COMMENTS_REQUEST,
  LOAD_MORE_COMMENTS_SUCCESS
} from "../Types/CommentTypes";


const MAX_FETCH_LIMIT = 1


export const LoadExternalDetails = (pid) => {

  return async (dispatch) => {

    try {
      dispatch({ type: LOAD_EXTERNAL_DETAILS_REQUEST })

      const qry = firestore().collection('reviews').doc(pid)

      const avg = await qry.get()


      console.log(avg.data())
      dispatch({ type: LOAD_EXTERNAL_DETAILS_SUCCESS, payload: avg.data() })


    }
    catch (err) {
      dispatch({ type: LOAD_EXTERNAL_DETAILS_FAILED, payload: err })
    }

  }
}

export const FetchReviews = (pid) => {
  return async (dispatch) => {



    try {


      const qry = firestore()
        .collection('reviews')
        .doc(pid)
        .collection('review')
        .limit(MAX_FETCH_LIMIT)
      const reviews = await qry.get()

      var list = []


      reviews.forEach
        (
          function (child) {
            list.push({...child.data(),key:child.id})
          }
        )


      
      let lastkey = null

      if (list.length >= MAX_FETCH_LIMIT) {
        lastkey = list[list.length - 1].username
      }

      dispatch({
        type: LOAD_COMMENTS_SUCCESS, payload: {
          Reviews: list,
          lastKey: lastkey
        }
      })



    }
    catch (err) {

      console.log(err)
      dispatch({ type: LOAD_COMMENTS_FAILED, payload: err })
    }


  }

}
export const fetchMoreReviews = (pid, lastindex) => {
  return async (dispatch) => {


    try {
      dispatch({ type: LOAD_MORE_COMMENTS_REQUEST })

      const qry = firestore()
        .collection('reviews')
        .doc(pid)
        .collection('review')
        .orderBy('email')
        .limit(MAX_FETCH_LIMIT)

    }
    catch (err) {

    }


  }

}



export const AddComment = (review, key, todaysdate) => {
  return async (dispatch) => {



    dispatch({ type: ADD_COMMENT_REQUEST })



    if (review.review == "" || review.review == undefined) {
      alert('please add review and then try your thoughts are valueable to US')
      return
    }


    const ifExists = await firestore()
      .collection('reviews')
      .doc(key)
      .collection('review').doc(auth().currentUser.uid)
      .get()



    let avg = await firestore()
      .collection('reviews')
      .doc(key)
      .get()





    if (!avg.exists) {

      avg = {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        total: 0,
        avg: 0
      }

    }
    else {
      avg = avg.data()

    }



    if (ifExists.exists) {


      switch (ifExists.data().star) {
        case 1:
          avg.one = avg.one - 1
          break;
        case 2:
          avg.two = avg.two - 1
          break;
        case 3:
          avg.three = avg.three - 1
          break;
        case 4:
          avg.four = avg.four - 1
          break;
        default:
          avg.five = avg.five - 1


      }
      total = avg.total * avg.avg
      total -= ifExists.data().star
      let p = avg.total
      p--

      avg.total = p

      console.log(p)
      let average = total / p

      if (p <= 0) {
        average = 0
      }

      avg.avg = average

    }

    console.log(avg)

    switch (review.rate) {
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


    avg.avg = ((avg.avg * (avg.total - 1)) + (review.rate)) / avg.total

    console.log(avg)


    try {
      await firestore().collection('reviews').doc(key).set
        (
          avg
        )

      await firestore().collection('reviews').doc(key)
        .collection('review')
        .doc(auth().currentUser.uid)
        .set(
          {
            date: todaysdate,
            username: auth().currentUser.displayName
            , star: review.rate,
            review: review.review

          }
        )


      dispatch({ type: ADD_COMMENT_SUCCESS })
    }
    catch (err) {

      dispatch({ type: ADD_COMMENT_FAILED, payload: err })
    }



  }

}