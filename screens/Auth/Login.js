import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput,
  Button, Image, Dimensions, ActivityIndicator, ActivityIndicatorBase, ScrollView, StyleSheet, Alert
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import ErrorCard from "../../components/ErrorCard";
import { loginUser, resetPassword } from "../../redux/Actions/AuthActions";

const Login = ({ navigation }) => {
 
  const [uname, setuname] = useState("")
  const [upassword, setupassword] = useState("")

  const loginLoading = useSelector(state => state.Auth.loginLoading)
  const loginError = useSelector(state => state.Auth.loginError)

  const changePasswordLoading = useSelector(state => state.Auth.changePasswordLoading)
  const changePasswordError = useSelector(state => state.Auth.changePasswordError)

  const isadmin = useSelector(state => state.Auth.isadmin)

  console.log(isadmin)
  const dispatch = useDispatch()

  useEffect
    (
      () => {

        const subcription = auth().onAuthStateChanged

          ((user) => {
            if (user) {


              if (!isadmin)
                navigation.navigate("Home")
              else
                navigation.navigate("Admin")

            }
          })

        return () => subcription()
      }, []

    )

  const onSignin = async (email, password) => {

   
    dispatch(loginUser(email, password))

  }

  const ResetPasswordWithEmail = () => {

 
    if(uname=="")
    {
      Alert.alert("FIll email for link","Please fill email details for reset password")
      return
    }

    dispatch(resetPassword(uname))



  }

  return (
    <View
      style={styles.Container
      }
    >

      <Image
        style={styles.imgStyle}
        source={require('../../assets/login.jpg')}
      />

      <View style={styles.detilsContainer}>
        <Text style={styles.txtWelcomeText}>hey HI !!</Text>
        <Text style={styles.txtWelcomeText}>want to explore catalog?</Text>
        <Text style={styles.txtWelcomeText}>LOGIN HERE!!</Text>
      </View>

      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Enter Email HERE..."
          onChangeText={setuname}
          style={styles.txtInput}
        />

        <TextInput
          placeholder="Enter Password HERE..."
          style={styles.txtInput}
          onChangeText={(text) => setupassword(text)}
        >
        </TextInput>

        <View style={styles.accountContainer}
        >
          <Text>DON'T HAVE A ACCOUNT ?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Sign_Up")}
          >

            <Text style={styles.txtLinkbtn}>REGISTER HERE!!</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          onPress={() => ResetPasswordWithEmail()}
        >
          <Text style={styles.txtLinkbtn}>Forgot Password??</Text>

        </TouchableOpacity>

       

        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={() => onSignin(uname, upassword)}
        >
          {
            loginLoading||changePasswordLoading
            ?
            <ActivityIndicator
            size={25}
            color="#fff"
            />
            :
            <Text style={styles.txtSignIN}>SIGN IN
            </Text>
          }
        </TouchableOpacity>

        {(loginError != null || changePasswordError != null) && <ErrorCard
          error={(loginError != null) ? "there is proble with email and password login" : "Not valid email id For change password || network ERRORs"}
        ></ErrorCard>}

      </View>

    </View>
  )
}

const styles = StyleSheet.create
  (
    {
      Container:
      {
        flex: 1,
        justifyContent: 'center'

      },
      imgStyle:
      {
        position: 'absolute',
        resizeMode: 'stretch',
        flex: 1
      },
      detilsContainer:
      {
        position: 'absolute',
        top: 15,

        shadowColor: 'black',
        shadowOffset: { height: 5, width: 5 },
        alignSelf: 'flex-start',
        shadowOpacity: 1,
        elevation: 5,
        margin: 30
      },
      txtWelcomeText:
      {
        fontSize: 25,
        color: '#fff',
        shadowOpacity: 1,
        textShadowColor: 'silver',
        textShadowRadius: 20,
        fontWeight: 'bold',
        textShadowOffset: { height: 5, width: 5 }
      },
      inputContainer:
      {
        top: '20%',
        position: "absolute",
        width: '90%',
        paddingVertical: 25,
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 40
      },
      txtLinkbtn:
      {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 15,
        color: 'skyblue'
      },
      accountContainer:
      {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
      },
      txtInput:
      {
        margin: 20,
        borderRadius: 20,
        backgroundColor: '#f2f3f4'
      },
      btnSignIn:
      {
        margin: 20,
        height: 50,
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e76f51',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20
      },
      txtSignIN:
      {
        color: "white",
        fontSize: 18
      }



    }
  )
export default Login