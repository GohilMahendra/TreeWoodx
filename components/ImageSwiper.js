

import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";


import { Dimensions } from "react-native";

import { Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";


import Carousel from "react-native-snap-carousel";


const { height, width } = Dimensions.get('screen')
const ImageSwiper = ({ data }) => {
    const ref = useRef(null);


    const renderItem = ({ item, index }) => {


        return (

            <View

                style={styles.imageContainer}
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
                          
                            borderRadius:15
                        }
                    }
                    resizeMode="cover"


                >

                </Image>

            </View>


        )
    }

    return (

        <View
            style={ styles.Container  }
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
const styles=StyleSheet.create(
    {
        Container:
        {
            flex: 1
        },
        imageContainer:
        {
            height: 450,
            width: '100%',
           
           
            borderRadius: 15,
            backgroundColor: "#fff",
        },
    }
)
export default ImageSwiper