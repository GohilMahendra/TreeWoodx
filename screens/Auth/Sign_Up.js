import React, { useState } from "react";
import { View, Text, Alert, Button, TextInput, Dimensions, Image, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import auth from "@react-native-firebase/auth";
import { ImageBackground } from "react-native";
import { fonts } from "../../constants/fonts";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/Actions/AuthActions";
import ErrorCard from "../../components/ErrorCard";

const Sign_Up = ({ navigation }) => {


  const registerLoading = useSelector(state => state.Auth.registerLoading)
  const registerError = useSelector(state => state.Auth.registerError)


  const [uname, setuname] = useState("")
  const [uemail, setuemail] = useState("")
  const [upassword, setupassword] = useState("")

  const dispatch = useDispatch()

  const onsignup = async (name, email, password) => {

    dispatch(signUp(name, email, password))

    if(auth().currentUser!=null && auth().currentUser!=undefined)
    navigation.navigate("Login")

  }

 


  return (

    <View style={{ flex: 1, backgroundColor: 'silver' }}>

      <ImageBackground
        source={require('../../assets/modern.jpg')

        }
        style={
          {
            flex: 1,
            justifyContent: 'center'
          }
        }
      >
        <View
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.detailsConatainer}>

         
          <Text
            style={
              styles.signUPText
            }
          >SIGN UP</Text>


          <TextInput
            placeholderTextColor="black"
            placeholder="Enter Name HERE..."
            onChangeText={setuname}
            style={styles.textinputstyle}
          />

          <TextInput
            placeholderTextColor="black"
            placeholder="Enter Email HERE..."
            textContentType="emailAddress"
            onChangeText={setuemail}
            style={styles.textinputstyle}
          />

          <TextInput
            placeholder="Enter Password HERE..."
            placeholderTextColor="black"
            textContentType={"password"}
            style={styles.textinputstyle}
            onChangeText={setupassword}
          >
          </TextInput>

          <View style={styles.rowContainer}
          >
            <Text
              style={
                {
                  color: '#fff'
                }
              }
            >Already HAVE A ACCOUNT ?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{ color: 'skyblue' }}>LOGIN HERE!!</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity

            onPress={() => onsignup(uname, uemail, upassword)}
            style={styles.signUPbtn}


          >
            {registerLoading ?
              <ActivityIndicator
                style={styles.activityIndicator}
                size={'large'}
                color={'black'}
              ></ActivityIndicator>
              :

              <Text>SIGN Up</Text>
            }
          </TouchableOpacity>

          {
            registerError != null
            &&

            <ErrorCard
              error={"Error in register Please Try Again !!"}
            ></ErrorCard>
          }
        </View>

      </ImageBackground>
    </View>

  )
}
export default Sign_Up

const styles = StyleSheet.create

  (

    {
      textinputstyle:
      {
        margin: 20,
        opacity: 0.8,
        borderColor: "silver",
        fontFamily: fonts.Merienda_Regular,
        alignItems: 'center',
        textAlign: "center",
        backgroundColor: "#fff",
        color: "black",
        borderRadius: 20,
        borderWidth: 1
      }
      ,
      signUPbtn:
      {
        margin: 20,
        height: 50,
        bottom: 10,
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20
      },
      detailsConatainer:
      {
        borderTopRightRadius: 45,
        elevation: 10,

        borderBottomLeftRadius: 45,
        backgroundColor: 'transparent',
        margin: 10
      },
      activityIndicator:
      {
        color: 'black',

        borderRadius: 30,

      },
      rowContainer:
      {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
      },
      signUPText:
      {
        alignSelf: "center",
        color: "#fff",
        fontSize: 25,
        marginTop: 15,

        fontFamily: fonts.Orbitron_Black

      },
      signUPLogo:
      {
        alignSelf: "center",
        color: "#fff",
        position: "absolute",
        marginTop: 15,
        top: 0,
        transform: [{ translateY: -70 }],
        fontFamily: fonts.Federo_Regular

      },
    }
  )