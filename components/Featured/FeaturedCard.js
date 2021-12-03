

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    View,
    Text
} from "react-native";
import { Image, StyleSheet } from "react-native";
import { fonts } from "../../constants/fonts";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";


const FeaturedCard = (props) => {


    const { data, colorTheme } = props


    console.log(colorTheme)

    return (


        <View
            style={styles.Container}

        >
            <LinearGradient
                colors={[colorTheme.gradient_color_1, colorTheme.gradient_color_2]}
                style={styles.gradinetContainer}
            >

                <View
                    style={styles.divideContainer}
                >

                    <View
                        style={styles.detailsContainer}
                    >
                        <View
                            style={styles.blurContainer}
                        >

                        </View>
                        <View
                            style={styles.blurFreeView}
                        >
                            <Text
                                style={{
                                    color:"#fff",
                                    fontSize: 20,
                                    maxWidth: '100%',
                                    fontFamily: fonts.Federo_Regular,
                                    
                                    
                                }}
                            >
                                {data.pname}
                            </Text>
                            <Text
                                style={
                                    {
                                        color: colorTheme.secondary_color,
                                        fontSize: 18, 
                                        fontFamily: colorTheme.fontFamily
                                    }
                                }
                            >
                                {data.pbrand}
                            </Text>
                            <View
                                style={styles.pricingContainer}
                            >
                                <Text
                                    style={
                                        {
                                            color: "#ffff",
                                            fontSize: 18,
                                            padding: 10,
                                            textShadowRadius: 1,
                                            textShadowColor: colorTheme.gradient_color_2,
                                            fontFamily: colorTheme.fontFamily,

                                            textDecorationLine: 'line-through'
                                        }
                                    }
                                >
                                    RS{data.pprice}
                                </Text>
                                <Text
                                    style={
                                        {
                                            color: "#fff",
                                            fontSize: 20,
                                            padding: 10,
                                            fontFamily: colorTheme.fontFamily
                                        }
                                    }
                                >
                                    RS{data.priceafterdisc}
                                </Text>

                            </View>
                            <TouchableOpacity
                                style={
                                    {
                                        backgroundColor: colorTheme.secondary_color,
                                        borderRadius: 10,
                                        padding: 10,
                                    }
                                }
                            >
                                <Text
                                    style={
                                        {
                                            fontFamily: colorTheme.fontFamily,
                                            paddingHorizontal:20
                                        }
                                    }
                                >{data.pdisc} % OFF</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Image
                        source={
                            {
                                uri: data.pimage
                            }
                        }
                        resizeMode="cover"
                        style={styles.imgContainer}
                    ></Image>
                </View>


            </LinearGradient>
        </View>




    )
}
const styles = StyleSheet.create
    (
        {
            Container:

            {
                height: 200,
                backgroundColor: '#fff',
                margin: 15,

                borderRadius: 15,
                elevation: 15
            }
            ,
            divideContainer:

            {
                flexDirection: "row",
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between'
            }
            ,
            gradinetContainer:

            {
                flex: 1,
                borderRadius: 15
            },


            blurContainer:
            {
                width: '100%',
                height: "100%",
                borderRadius: 15,
                backgroundColor: "#fff",
                opacity: 0.5


            },
            blurFreeView:

            {
                position: "absolute",
                backgroundColor: "transparent",
                flex: 1,
                alignItems: 'center'
            }
            ,

            pricingContainer:

            {
                flexDirection: 'row',
                maxWidth:"100%",

                justifyContent: "space-evenly"
            },
            detailsContainer:

            {
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',

            },
            imgContainer:

            {
                height: '80%',
                width: "40%",
                opacity: 0.7,
                margin: 10,
                alignSelf: "center",
                padding: 20,
                borderRadius: 15,

            }


        }
    )
export default FeaturedCard