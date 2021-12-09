
import auth from "@react-native-firebase/auth";

import firestore, { firebase } from "@react-native-firebase/firestore";
import { constraints } from "@tensorflow/tfjs-layers";
import { lstm } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { Alert } from "react-native";
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
            list.push({ key: child.id, ...child.data() })
          }
        )


      let lastkey = null

      if (list.length >= MAX_FETCH_LIMIT) {
        lastkey = list[list.length - 1].key
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


export const fetchMoreReviews = (pid) => {

  return async (dispatch, getState) => {

    try {

      const id = getState().Comment.lastCommentIndex
      if (id == null) {
        console.log("NUll ID")
        return
      }


      dispatch({ type: LOAD_MORE_COMMENTS_REQUEST })

      const qry = firestore()
        .collection('reviews')
        .doc(pid)
        .collection('review')
        .orderBy(firestore.FieldPath.documentId())
        .startAfter(id)
        .limit(MAX_FETCH_LIMIT)

      const reviews = await qry.get()

      var list = []

      reviews.forEach
        (
          function (child) {
            list.push({ key: child.id, ...child.data() })
          }
        )


      let lastkey = null

      if (list.length >= MAX_FETCH_LIMIT) {
        lastkey = list[list.length - 1].key
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



export const AddComment = (review, key, todaysdate) => {
  return async (dispatch) => {

    if (review.review == "" || review.review == undefined) {
      alert("add some words", "please add review and then try your thoughts are valueable to US")
      return

    }

    try {
      dispatch({ type: ADD_COMMENT_REQUEST })


      var star = Number(review.rate)

      const ifExists = await firestore()
        .collection('reviews')
        .doc(key)
        .collection('review')
        .doc(auth().currentUser.uid)
        .get()


      const data = await firestore()
        .collection('reviews')
        .doc(key)
        .get()



      if (ifExists.exists) {

        if (ifExists.data().star == 1) {
          await firestore()
            .collection('reviews')
            .doc(key)
            .update(
              {
                total: firebase.firestore.FieldValue.increment(-1),
                totalStar: firebase.firestore.FieldValue.increment(-1),
                one: firebase.firestore.FieldValue.increment(-1)
              }
            )
        }
        else if (ifExists.data().star == 2) {
          await firestore()
            .collection('reviews')
            .doc(key)
            .update(
              {
                total: firebase.firestore.FieldValue.increment(-1),
                totalStar: firebase.firestore.FieldValue.increment(-2),
                two: firebase.firestore.FieldValue.increment(-1)
              }
            )
        }
        else if (ifExists.data().star == 3) {
          await firestore()
            .collection('reviews')
            .doc(key)
            .update(
              {
                total: firebase.firestore.FieldValue.increment(-1),
                totalStar: firebase.firestore.FieldValue.increment(-3),
                three: firebase.firestore.FieldValue.increment(-1)
              }
            )
        }
        else if (ifExists.data().star == 4) {
          await firestore()
            .collection('reviews')
            .doc(key)
            .update(
              {
                total: firebase.firestore.FieldValue.increment(-1),
                totalStar: firebase.firestore.FieldValue.increment(-4),
                four: firebase.firestore.FieldValue.increment(-1)
              }
            )
        }
        else if (ifExists.data().star == 5) {
          await firestore()
            .collection('reviews')
            .doc(key)
            .update(
              {
                total: firebase.firestore.FieldValue.increment(-1),
                totalStar: firebase.firestore.FieldValue.increment(-5),
                five: firebase.firestore.FieldValue.increment(-1)
              }
            )
        }

      }


      if (data.exists) {

        console.log(star)
        if (star == 1) {
          await firestore()
            .collection('reviews')
            .doc(key)
            .update(
              {
                total: firebase.firestore.FieldValue.increment(1),
                totalStar: firebase.firestore.FieldValue.increment(1),
                one: firebase.firestore.FieldValue.increment(1)
              }
            )
        }

        else if (star == 2) {
          await firestore()
            .collection('reviews')
            .doc(key)
            .update(
              {
                total: firebase.firestore.FieldValue.increment(1),
                totalStar: firebase.firestore.FieldValue.increment(2),
                two: firebase.firestore.FieldValue.increment(1)
              }
            )
        }

        else if (star == 3) {
          await firestore()
            .collection('reviews')
            .doc(key)
            .update(
              {
                total: firebase.firestore.FieldValue.increment(1),
                totalStar: firebase.firestore.FieldValue.increment(3),
                three: firebase.firestore.FieldValue.increment(1)
              }
            )
        }

        else if (star == 4) {
          await firestore()
            .collection('reviews')
            .doc(key)
            .update(
              {
                total: firebase.firestore.FieldValue.increment(1),
                totalStar: firebase.firestore.FieldValue.increment(4),
                four: firebase.firestore.FieldValue.increment(1)
              }
            )
        }

        else if (star == 5) {
          await firestore()
            .collection('reviews')
            .doc(key)
            .update(
              {
                total: firebase.firestore.FieldValue.increment(1),
                totalStar: firebase.firestore.FieldValue.increment(5),
                five: firebase.firestore.FieldValue.increment(1)
              }
            )
        }

      }

      else {
        await
          firestore()
            .collection('reviews')
            .doc(key)
            .set(
              {
                totalStar: star,
                total: 1,
                one: (star == 1) ? 1 : 0,
                two: (star == 2) ? 1 : 0,
                three: (star == 3) ? 1 : 0,
                four: (star == 4) ? 1 : 0,
                five: (star == 5) ? 1 : 0


              }
            )
      }



      const addReview = await firestore().collection('reviews').doc(key)
        .collection('review')
        .doc(auth().currentUser.uid)
        .set(
          {
            date: todaysdate,
            username: auth().currentUser.displayName,
            star: review.rate,
            review: review.review

          }
        )



      dispatch({ type: ADD_COMMENT_SUCCESS })
      Alert.alert("Comment Added", "Thanks for your Review")
    }
    catch (err) {

      Alert.alert("Err", "" + err)
      dispatch({ type: ADD_COMMENT_FAILED, payload: err })
    }

  }

}