
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Appbar, ProgressBar } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AddStar from "./Addstar";
import CountConverter from "./CountConverter";
import ReviewCountPoll from "./ReviewCountPoll";


const ReviewRatings = ({ avg} ) => {

  var max = avg.total

  console.log(avg)

  return (
    <View style={{ marginHorizontal: 10 }}>
      <View style={{
        borderRightColor: "grey",
        alignItems: "center",
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginHorizontal: 20
      }}>


        <FontAwesome5Icon
          style={{
            padding: 10,
            backgroundColor: "green",
            borderRadius: 20
          }}
          size={20} color="#fff" name="star" solid={true}>
          <Text>{parseFloat(avg.avg).toFixed(2)}</Text>
        </FontAwesome5Icon>

        <Text style={{
          marginHorizontal: 10,
          fontSize: 20
        }}>Total {CountConverter(max)} Reviews</Text>
      </View>




      <View style={
        {
          flexDirection: "row",
          justifyContent: "center",
          marginHorizontal: 10

        }
      }>
        <View style={
          {
            width: "20%",
            marginTop: 10
          }
        }>
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
        <View style={{ width: "60%", marginTop: 20 }}>





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
          style={{
            width: '20%',
            marginTop: 10

          }}
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
      reviewStarFONTS:
      {

        marginTop: 10

      }
    }
  )
export default ReviewRatings

