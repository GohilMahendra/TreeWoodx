
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Appbar, ProgressBar } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AddStar from "./Addstar";
import CountConverter from "../CountConverter";
import ReviewCountPoll from "./ReviewCountPoll";


const ReviewRatings = ({ avg }) => {

  var max = avg.total

  return (
    <View style={styles.Container}>
      <View style={styles.ratingConatainer}>


        <FontAwesome5Icon
          style={styles.iconStyle}
          size={20} color="#fff" name="star" solid={true}>
          <Text>{parseFloat(avg.avg).toFixed(2)}</Text>
        </FontAwesome5Icon>

        <Text style={{
          marginHorizontal: 10,
          fontSize: 20
        }}>Total {CountConverter(max)} Reviews</Text>
      </View>

      <View style={styles.ratingPollContainer}>
        <View style={styles.ratingNumberContainer}>
          <Text
            style=
            {
              styles.reviewStarFONTS
            }
          >5</Text>
          <Text
            style={
              styles.reviewStarFONTS
            }
          >4</Text>
          <Text
            style={
              styles.reviewStarFONTS
            }
          >3</Text>
          <Text
            style={
              styles.reviewStarFONTS
            }
          >2</Text>
          <Text
            style={
              styles.reviewStarFONTS
            }
          >1</Text>
        </View>

        <View style={styles.ProgressContainer}>
          <ProgressBar
            style={[ReviewRatingsStyles.progressBar, { marginTop: 0 }]}
            progress={avg.five / max}
            color={"green"}
          />

          <ProgressBar
            style={ReviewRatingsStyles.progressBar}
            progress={avg.four / max}
            color={"green"}
          >

          </ProgressBar>
          <ProgressBar
            style={ReviewRatingsStyles.progressBar}
            progress={avg.three / max}
            color={"#7CFC00"}
          >
          </ProgressBar>

          <ProgressBar
            style={ReviewRatingsStyles.progressBar}
            progress={avg.two / max}
            color={"orange"}
          >
          </ProgressBar>

          <ProgressBar
            style={ReviewRatingsStyles.progressBar}
            progress={avg.one / max}
            color={"red"}
          />

        </View>

        <View
          style={styles.countPollContainer}
        >
          <ReviewCountPoll
            avg={avg}
          >

          </ReviewCountPoll>
        </View>
      </View>

    </View>

  )
}
const ReviewRatingsStyles = StyleSheet.create(
  {
    progressBar: {

      backgroundColor: '#fff',
      borderRadius: 3,
      marginTop: 20,
      height: 10,
      width: "80%"


    }

  }
)

const styles = StyleSheet.create
  (
    {
      iconStyle:
      {
        padding: 10,
        backgroundColor: "green",
        borderRadius: 20
      },
      Container:
      {
        flexDirection: 'row',
        width: 70,
        justifyContent: "space-evenly",
        margin: 20,
        marginTop: 0,
        borderRadius: 15,
        backgroundColor: "green",

      },
      ratingConatainer:
      {
        borderRightColor: "grey",
        alignItems: "center",
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginHorizontal: 20
      },
      countPollContainer:
      {
        width: '20%',
        marginTop: 10

      },
      ratingNumberContainer:
      {
        width: "20%",
        marginTop: 10
      },

      ratingPollContainer:

      {
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 10

      },
      ProgressContainer:
      {
        width: "60%",
        marginTop: 20
      },
      reviewStarFONTS:
      {

        marginTop: 10

      }
    }
  )
export default ReviewRatings

