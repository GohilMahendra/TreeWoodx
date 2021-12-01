import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import { fonts } from "../../constants/fonts";
import { useDispatch } from "react-redux";
const AdminProfile = ({ navigation }) => {



    const LogoutUser=()=>
    {

        auth().signOut()
        navigation.navigate('Login')
     
    }
    return (
        <View style={styles.container}>

        <TouchableOpacity
        onPress={()=>LogoutUser()}
        >
            <Text>LOGOUT</Text>
        </TouchableOpacity>
   
        </View>
    )
}

const styles = StyleSheet.create
    (
        {
            container:
            {
                flex: 1,
                backgroundColor: '#6495ED'

            },
            LogoContainer:
            {
                backgroundColor: "#13274F",
                margin: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                height: 100,
                width: 100,
                borderRadius: 100
            }

        }
    )

export default AdminProfile