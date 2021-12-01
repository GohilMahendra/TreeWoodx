
import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
    ;
import { ModelView } from "react-native-3d-model-view";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import { useEffect } from "react/cjs/react.development";
import { fonts } from "../../constants/fonts";
import { Line } from "react-native-svg";
import { Color } from "../../constants/colors";

const { height, width } = Dimensions.get('screen')
const User_profile = ({ navigation }) => {

    const logout = () => {
        auth().signOut()

        navigation.navigate("Login")

    }

    // useEffect
    //     (
    //         () => 
    //             {
    //             if (auth().currentUser == undefined) {
    //                 navigation.pop(2)
    //             }
    //         },
    //         []
    //     )


    return (
        <View style={{ flex: 1 }}>
            <View
                style={
                    {
                        backgroundColor: "#fff",
                        height: '30%',

                    }
                }
            >
                <LinearGradient
                    colors={
                        [
                            Color.lightBlue, Color.peach, Color.purpleLight
                        ]
                    }
                    style={
                        {
                            flex: 1
                        }
                    }
                >

                </LinearGradient>

            </View>
            <View>
                <View
                    style={
                        {
                            borderRadius: 100,
                            height: 100,
                            alignSelf: "center",
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            width: 100,
                            transform: [
                                {
                                    translateY: -50
                                }
                            ],
                            elevation: 25,
                            shadowColor: "pink",
                            shadowOffset: {
                                height: 15,
                                width: 15
                            },
                            shadowRadius: 25
                        }
                    }
                >
                    <Text
                        style={
                            {
                                fontSize: 30,
                                fontFamily: fonts.Federo_Regular
                            }
                        }
                    >{auth().currentUser.displayName.substr(0, 2)}</Text>
                </View>
                <View
                    style={styles.optionsContainer}
                >
                    <TouchableOpacity>
                        <View
                            style={styles.userOptionsContainer}
                        >
                            <Text
                                style={styles.userOptionsText}
                            >MY ORDERS</Text>

                        </View>
                    </TouchableOpacity>
                    <View
                        style={styles.userOptionsContainer}
                    >
                        <Text
                            style={styles.userOptionsText}
                        >Edit Profile</Text>

                    </View>

                </View>


            </View>


        </View>
    )
}

const styles = StyleSheet.create
    (
        {


            optionsContainer:
            {
                margin: 20,
            }     ,
            userOptionsContainer:
            {
                height: 50,
                backgroundColor: '#fff',
                padding: 10,
                justifyContent: 'center',
                marginVertical: 10,
                borderRadius: 15,
                elevation: 15
            }
            ,
            userOptionsText:
            
            {
                color: Color.corporateBlue,
                fontSize: 15,
                fontFamily: fonts.Federo_Regular
            }  ,

            profileContainer:
            {
                alignSelf: 'center',
                justifyContent: "center",
                alignItems: 'center',
                top: height / 3 - 50,
                position: "absolute",
                height: 100,
                backgroundColor: 'white',
                width: 100,
                borderRadius: 100
            }
        }
    )
export default User_profile