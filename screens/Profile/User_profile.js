
import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
    ;
import { ModelView } from "react-native-3d-model-view";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import { fonts } from "../../constants/fonts";
import { Line } from "react-native-svg";
import { Color } from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/Actions/AuthActions";

const { height, width } = Dimensions.get('screen')
const User_profile = ({ navigation }) => {

    const dispatch=useDispatch()

    const logoutError=useSelector(state=>state.Auth.logoutError)
    const logoutLoading=useSelector(state=>state.Auth.logoutLoading)

    const logout = () => {
    
        dispatch(signOut())  
        navigation.navigate("Login")  

    }

    return (
        <View style={{ flex: 1 }}>
            <View
                style={styles.subContainer}
            >
                <LinearGradient
                    colors={
                        [
                            Color.lightBlue, Color.peach, Color.purpleLight
                        ]
                    }
                    style={{flex:1}}
                >

                </LinearGradient>

            </View>
            <View>
                <View
                    style={styles.roundContainer}
                >
                    <Text
                        style={
                            {
                                fontSize: 30,
                                fontFamily: fonts.Federo_Regular
                            }
                        }
                    >{auth().currentUser!=null?auth().currentUser.displayName.substr(0, 2):""}</Text>
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

                    <TouchableOpacity
                        onPress={
                            () => logout()
                        }
                    >
                        <View
                            style={[styles.userOptionsContainer
                                , {
                                backgroundColor: "red"
                            }
                            ]}
                        >
                            <Text
                                style={styles.userOptionsText}
                            >Logout</Text>

                        </View>
                    </TouchableOpacity>
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
            },
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
            },

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
            },
            subContainer:
            {
                backgroundColor: "#fff",
                height: '30%',

            },
            roundContainer:
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
    )
export default User_profile