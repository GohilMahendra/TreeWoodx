

import React, { useRef, useState } from "react";
import {
    View,
    Text
} from "react-native";


import { Dimensions } from "react-native";

import { Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";


import Carousel from "react-native-snap-carousel";


const { height, width } = Dimensions.get('screen')
const ImageSwiper = ({ data }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const ref = useRef(null);


    const renderItem = ({ item, index }) => {


        return (

            <View

                style={
                    {
                        height: 350,
                        width: width - 20,
                        borderRadius: 15,
                        backgroundColor: "#fff",
                        margin: 10
                    }
                }
            >
                <Image

                    source={
                        {
                            uri: item
                        }
                    }
                    style={
                        {
                            flex: 1,
                            borderRadius: 15
                        }
                    }
                    resizeMode="stretch"


                >

                </Image>
                <ActivityIndicator
                    style={{
                        position: "absolute",
                        alignSelf: "center"
                    }}
                >

                </ActivityIndicator>
            </View>


        )
    }

    return (

        <View
            style={
                {
                    flex: 1
                }
            }
        >

            <Carousel



                layout="default"
                layoutCardOffset={5}
                ref={ref}

                itemHeight={300}

                itemWidth={width}
                data={data}

                renderItem={renderItem}
                sliderWidth={width}
            />

        </View>
    )
}

export default ImageSwiper