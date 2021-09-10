import React from "react";
import { Dimensions } from "react-native";

import { View, Text, StyleSheet } from "react-native";
import { fonts } from "../constants/fonts";


import AddStar from "./Addstar";
const { height, width } = Dimensions.get('screen')
const ReviewCard = ({ rev }) => {

  // console.log(rev)



  return (
    <View style={styles.container}>

      <View style={styles.innerView}>

        <AddStar
          star={rev.star}
        />
        <Text style={styles.dateText}>{rev.date}</Text>

      </View>
      <Text style={styles.usernameText}>{rev.username}</Text>
      <Text style={styles.reviewText}>{rev.review}</Text>

    </View>


  )
}


const styles = StyleSheet.create(
  {
    container:
    {
      marginHorizontal: 20,
      width: width - 40,
      borderRadius: 15,
      alignSelf: "center",
      borderTopWidth: 1,
      marginTop: 20,
      borderBottomWidth: 1,
      backgroundColor: "transparent"
    },
    innerView:
    {
      flexDirection: "row",
      alignItems: "center",

      margin: 10,

      justifyContent: "space-between"
    },
    reviewText:
    {
      fontSize: 15,
      marginHorizontal: 20
    },
    usernameText:
    {
      fontSize: 20,
      marginHorizontal: 20,
      fontFamily: fonts.Quicksand_Medium,

    },
    dateText:
    {
      textAlign: 'center',
      marginHorizontal: 20,
      fontSize: 20,
      fontFamily: fonts.Federo_Regular,
      alignSelf: "center",
      textAlignVertical: 'center'
    }
  }
)
export default ReviewCard
