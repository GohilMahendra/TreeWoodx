import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput,
  Button, Image, Dimensions, ActivityIndicator, ActivityIndicatorBase, ScrollView, StyleSheet
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import auth from "@react-native-firebase/auth";

import firestore from "@react-native-firebase/firestore";

const Login = ({ navigation }) => {
  const { height, width } = Dimensions.get('screen')

  const [loading, setloading] = useState(false)
  const [uname, setuname] = useState("")

  const validateCred = (uname, password) => {

    if (uname == "" || password == "")
      return false

    if (password.length < 8)
      return false

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(uname).toLowerCase());

  }

  const isAdmin = async (uid) => {
    const exists = await firestore()
      .collection('admin')
      .doc(uid)
      .get()

    return exists.exists

  }

  useEffect
    (
      () => {

        const subcription = auth().onAuthStateChanged

          ((user) => {
            if (user) {


      //        if(!isAdmin(auth().currentUser.uid))
              navigation.navigate("Home")
      
            }
          })

        return () => subcription()
      }, []

    )

  const onSignin = async (email, password) => {
    try {

      if (!validateCred(email, password)) {
        alert('Invalid creadentials')
        return
      }


    
      setloading(true)
      auth().signInWithEmailAndPassword(email, password)
        .then(
          user => {
            if (user) {
              if (!isAdmin(auth().currentUser.uid))
                navigation.navigate('Home')
              else
                navigation.navigate('Admin')
            }
          }
        )

        setloading(false)
    }
    catch (err) {
      setloading(false)
      console.log(err)
    }

  }
 
  const ResetPasswordWithEmail = () => {
    if (uname == "") {
      alert("enter email to send reset link")
    }
    else {

      auth().sendPasswordResetEmail(uname).then(function (user) {

        alert('link is in your email SIR')
      }).catch(function (err) {

        alert('wrong email please check correct please enter email and then click on it we will send rest link on that email')
      })

    }
  }
  const [upassword, setupassword] = useState("")
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
          onChangeText={setupassword}
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

        {loading && <ActivityIndicator

          style={{ position: 'absolute', top: height / 2, alignSelf: 'center', backgroundColor: 'white', borderRadius: 30, justifyContent: "center" }}
          size={"large"}
          color="green"
        />
        }

        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={() => onSignin(uname, upassword)}
        >
          <Text style={styles.txtSignIN}>SIGN IN
          </Text>
        </TouchableOpacity>

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