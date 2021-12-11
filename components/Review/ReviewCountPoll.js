import React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "react-native";

const ReviewCountPoll = ({ avg }) => {



    return (
        <View>

            <Text
                style={
                    pollStyles.text
                }
            >
                {avg.five}
            </Text>

            <Text
                style={
                    pollStyles.text
                }
            >
                {avg.four}
            </Text>

            <Text
                style={
                    pollStyles.text
                }
            >
                {avg.three}
            </Text>

            <Text
                style={
                    pollStyles.text
                }
            >
                {avg.two}
            </Text>

            <Text
                style={
                    pollStyles.text
                }
            >
                {avg.one}
            </Text>



        </View>


    )
}

export default ReviewCountPoll
const pollStyles = StyleSheet.create
    (
        {
            text:
            {
                marginTop: 10
            }
        }
    )