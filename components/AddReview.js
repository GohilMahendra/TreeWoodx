import React ,{useState}from "react";

import { View,Text,StyleSheet,TextInput } from "react-native";

import  FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { AddComment } from "../redux/Actions/CommentActions";


const AddReview=({pid,todaysdate})=>
  {


    const dispatch=useDispatch()

    const [review, setreview] = useState(
        {
          rate: 5,
          review: '',
    
        }
      )


      const addRate = () => {

        dispatch(AddComment(review,pid,todaysdate))
    
      }
    
    
    return(
        <View style={styles.addReviewContainer}>
        <Text style={{
          margin: 20, fontFamily: "Federo-Regular",
          fontSize: 30
        }}>REVIEWS</Text>


        {/**custom made review star component */}
        <View style={{ flexDirection: 'row', margin: 20, marginTop: 0 }}>

          <TouchableOpacity
            onPress={() => setreview({ ...review, rate: 1 })}
          >
            <FontAwesome5Icon name="star" size={30} solid={(review.rate >= 1) ? true : false}></FontAwesome5Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setreview({ ...review, rate: 2 })}>
            <FontAwesome5Icon name="star" size={30} solid={(review.rate >= 2) ? true : false}></FontAwesome5Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setreview({ ...review, rate: 3 })}
          >
            <FontAwesome5Icon name="star" size={30} solid={(review.rate >= 3) ? true : false}></FontAwesome5Icon>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setreview({ ...review, rate: 4 })}
          >
            <FontAwesome5Icon name="star" size={30} solid={(review.rate >= 4) ? true : false}></FontAwesome5Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setreview({ ...review, rate: 5 })}
          >
            <FontAwesome5Icon name="star" size={30} solid={(review.rate >= 5) ? true : false}></FontAwesome5Icon>
          </TouchableOpacity>
        </View>

        <TextInput

          onChangeText={val => setreview({ ...review, review: val })}
          placeholder=" + Add review Here"
          style={{
            borderRadius: 20, alignSelf: 'center',
            borderWidth: 1, width:'80%'
          }}
          multiline={true}

        >

        </TextInput>

        <TouchableOpacity

          onPress={() => addRate()}
          style={styles.addbtnReview}>
          <Text style={styles.addbtnReviewText}>Add</Text>
        </TouchableOpacity>
      </View>



    )
  }

  const styles=StyleSheet.create
  (
      {
          
      addbtnReviewText:
      {
        color: "#fff",
      },
	    addReviewContainer:
      {
        alignContent: "center",
        alignItems: 'center',
        margin: 20
      },
	  
	     addbtnReview:
      {

        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        height: 50,
        width: 70,
        borderRadius: 20,
        backgroundColor: 'black'
      },
	  
	  
	     reviewContainer:
      {
        marginHorizontal: 20,
        width: '80%',
        borderRadius: 15,
        alignSelf: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "transparent"
      },


      }
  )

  export default AddReview
