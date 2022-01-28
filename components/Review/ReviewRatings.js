
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Appbar, ProgressBar } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AddStar from "./Addstar";
import ReviewCountPoll from "./ReviewCountPoll";

const { height, width } = Dimensions.get('window')

const ReviewRatings = ({ avg }) => {


  return (
    <View style={styles.Container}>
      <View
        style={styles.detailsContainer}
      >
        <AddStar
          star={avg.totalStar / avg.total}
        ></AddStar>

        <Text
          style={{
            fontSize: 18
          }}
        >
          Total {avg.total} Ratings
        </Text>
      </View>

      <View
        style={styles.reviewContainer}
      >
        <Text>5</Text>
        <ProgressBar
          color={"green"}
          progress={avg.five / avg.total}
          style={{
            width: width - 100,
            height: 20,

          }}
        />
        <Text>{avg.five}</Text>
      </View>
      <View
        style={styles.reviewContainer}
      >
        <Text>4</Text>
        <ProgressBar
          color={"green"}
          progress={avg.four / avg.total}
          style={{
            width: width - 100,
            height: 20,

          }}
        />
        <Text>{avg.four}</Text>
      </View>
      <View
        style={styles.reviewContainer}
      >
        <Text>3</Text>
        <ProgressBar
          color={"green"}
          progress={avg.three / avg.total}
          style={{
            width: width - 100,
            height: 20,

          }}
        />
        <Text>{avg.three}</Text>
      </View>
      <View
        style={styles.reviewContainer}
      >
        <Text>2</Text>
        <ProgressBar
          color={"orange"}
          progress={avg.two / avg.total}
          style={{
            width: width - 100,
            height: 20,

          }}
        />
        <Text>{avg.two}</Text>
      </View>
      <View
        style={styles.reviewContainer}
      >
        <Text>1</Text>
        <ProgressBar
          color={"red"}
          progress={avg.one / avg.total}
          style={{
            width: width - 100,
            height: 20,

          }}
        />
        <Text>{avg.one}</Text>
      </View>

    </View>


  )
}
const styles = StyleSheet.create
  (
    {
      Container:
      {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        elevation: 15
      },
      reviewContainer:
      {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        justifyContent: "space-between"
      },
      detailsContainer:
      {
        alignItems: 'center',
        borderBottomWidth: 0.5,
      }

    }
  )
export default ReviewRatings

