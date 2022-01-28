
import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import { fonts } from "../../constants/fonts";
import { Color } from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/Actions/AuthActions";
import { useNavigation } from "@react-navigation/core";

const { height, width } = Dimensions.get('screen')
const User_profile = () => {


    const navigation = useNavigation()
    const dispatch = useDispatch()

    const logoutError = useSelector(state => state.Auth.logoutError)
    const logoutLoading = useSelector(state => state.Auth.logoutLoading)


    const logout = async () => {

        dispatch(signOut())

        navigation.reset({
            index: 0,
            routes: [
                {
                    name: "Login"
                }
            ]
        })



    }

    return (
        <View style={{ flex: 1 }}>
            <View
                style={styles.subContainer}
            >
                <LinearGradient
                    colors={
                        [
                            Color.navy, Color.baige
                        ]
                    }
                    style={{ flex: 1 }}
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
                    >{auth().currentUser != null ? auth().currentUser.displayName: ""}</Text>
                </View>
                <View
                    style={styles.detailsContainer}
                >
                    <Text
                        style={styles.txtDetails}
                    >{auth().currentUser != null ? auth().currentUser.displayName : ""}</Text>
                    <Text style={styles.txtDetails}>{auth().currentUser != null ? auth().currentUser.email : ""}</Text>
                </View>
                <View
                    style={styles.optionsContainer}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("UserOrders")}
                    >
                        <View
                            style={styles.userOptionsContainer}
                        >
                            <Text
                                style={styles.userOptionsText}
                            >MY ORDERS</Text>

                        </View>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={
                            () => logout()
                        }
                    >
                        <View
                            style={[styles.userOptionsContainer
                                , {
                                backgroundColor: "red",
                                alignItems: 'center'
                            }
                            ]}
                        >
                            <Text
                                style={[styles.userOptionsText, { color: '#fff' }]}
                            >LOGOUT</Text>

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
                justifyContent: "space-around"
            },
            userOptionsContainer:
            {
                height: 50,
                backgroundColor: '#fff',
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                borderRadius: 15,
                elevation: 15
            },
            detailsContainer:
            {
                backgroundColor: '#fff',
                alignItems: 'center',
                padding: 20,
                margin: 10,
                borderRadius: 15
            },
            userOptionsText:

            {
                color: Color.corporateBlue,
                fontSize: 15,
                fontFamily: fonts.Federo_Regular
            },
            txtDetails:
            {
                fontFamily: fonts.Federo_Regular,
                fontSize: 20

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