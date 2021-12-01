

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
                                    color: colorTheme.textTitle,
                                    fontSize: 20,
                                    maxWidth:'100%',
                                    fontFamily:fonts.Federo_Regular,
                                    textShadowColor:'black',
                                    textShadowRadius:15

                                }}
                            >
                                {data.pname}
                            </Text>
                            <Text
                                style={
                                    {
                                        color: colorTheme.textbrand,
                                        fontSize: 18,
                                        textShadowColor:colorTheme.background_off,
                                        textShadowRadius:15,

                                        fontFamily: fonts.Quicksand_Medium
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
                                            color: colorTheme.textPrice,
                                            fontSize: 18,
                                            padding: 10,
                                            textShadowRadius:1,
                                            textShadowColor:colorTheme.textTitle,
                                            fontFamily:fonts.Federo_Regular,
                                            
                                            textDecorationLine:'line-through'
                                        }
                                    }
                                >
                                   RS {data.pprice}
                                </Text>
                                <Text
                                style={
                                    {
                                        color: colorTheme.textPrice,
                                        fontSize: 20,
                                        padding: 10,
                                        fontFamily:fonts.Federo_Regular
                                    }
                                }
                                >
                                   RS {data.priceafterdisc}
                                </Text>

                            </View>
                            <TouchableOpacity

                                style={
                                    {
                                       backgroundColor:colorTheme.background_off,
                                        borderRadius: 10,

                                        padding: 10,


                                    }
                                }
                            >
                                <Text
                                    style={
                                        {
                                            fontFamily: fonts.Federo_Regular
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
                alignItems:'center'
            }
            ,
        
            pricingContainer:
            
            {
                flexDirection: 'row',

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