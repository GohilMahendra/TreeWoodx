import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import auth from "@react-native-firebase/auth";
import { fonts } from "../../constants/fonts";

import LinearGradient from "react-native-linear-gradient";
import { Color } from "../../constants/colors";
const AdminProfile = ({ navigation }) => {

    const LogoutUser = () => {

        auth().signOut()
        navigation.navigate('Login')

    }
    return (
        <View style={styles.container}>

            <View
                style={styles.gradeintContainer}
            >
                <LinearGradient
                    style={{ flex: 1}}
                    colors={[Color.electicBlue, Color.cream]}
                ></LinearGradient>

            </View>
            <View
                style={styles.LogoContainer}
            >
                <LinearGradient
                    style={styles.logoGradient}
                    colors={[Color.blueModern, Color.corporateBlue]}
                >
                    <Text
                        style={styles.txtUserName}
                    >{auth().currentUser.displayName.split(' ', 1)}</Text>
                </LinearGradient>
            </View>

            <View>
                <TouchableOpacity
        onPress={()=>navigation.navigate("AddAdmin")}
                    style={styles.btnOptions}
                >
                    <Text>ADD ADMIN</Text>

                </TouchableOpacity>
                <TouchableOpacity

                    style={[styles.btnOptions,{backgroundColor:"red"}]}
                >
                    <Text style={{color:"#fff"}}>SIGN OUT</Text>

                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create
    (
        {
            container:
            {
                flex: 1,
                backgroundColor: '#fff'

            },
            btnOptions:
            {
                elevation: 10,
                backgroundColor: '#fff',
                height: 50,
                margin: 20,
                justifyContent: "center",
                alignItems: 'center',
                borderRadius: 15
            },
            txtUserName:
            
            {
                fontSize: 18,
                color: "#fff",
                fontFamily: fonts.Federo_Regular
            },     
            gradeintContainer:           
            {
                height: "40%",
            },
            logoGradient:
            
            {
                borderRadius: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                width: 100
            },
        
            LogoContainer: 
            {

                elevation: 5,
                borderRadius: 100,
                backgroundColor: "#fff",
                alignSelf: 'center' ,
                 transform: [
                    {
                        translateY: -50
                    }
                ]
            }
        

        }
    )

export default AdminProfile