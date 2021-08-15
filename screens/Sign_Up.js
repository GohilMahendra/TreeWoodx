import React, { useState } from "react";
import { View,Text,Alert, Button,TextInput, Dimensions, Image, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";

import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database"
import firestore from "@react-native-firebase/firestore";
import { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";
import { ImageBackground } from "react-native";
import { fonts } from "../constants/fonts";
import { StyleSheet } from "react-native";

const Sign_Up=({navigation})=>
{

  const checkEmail=(email)=>
  {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
  }


  const createTwoButtonAlert = () =>
{  Alert.alert(
    "invalid email provided",
    "error in email varification",
    [
      
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );}

 
    const onsignup=async(name,email,password)=>
    {
       


        if(name==null||email==null||password==null||password.length<8)
        {
          console.log('error')
          return
        }
     
        // if(!reg.test(email))
        // {
        //     console.log('wrong email')
        // }
        if(!checkEmail(email))
       
        {
         
          createTwoButtonAlert()
          return
        }
        setloading(true)
        auth().createUserWithEmailAndPassword(email,password).then((result) =>
        {firestore().collection('users').doc(auth().currentUser.uid).set
        (
          {
            name:uname,
            email:uemail,
          }
        )

         auth().currentUser.updateProfile(
          {
          displayName:name
          }
        )

        setloading(false)
        navigation.navigate("Login")
   
    }).catch((err)=>
    {
       setloading(false)
        console.log("error")

    })

    }




    const {height,width}=Dimensions.get('window')
    


    const  [uname,setuname]=useState("")
    const [uemail,setuemail]=useState("")
    const [upassword,setupassword]=useState("")

    const [startText,setstartText]=useState(false)
    const [loadin,setloading]=useState(false)
  
    return(

      <View style={{flex:1,backgroundColor:'silver'}}
      
      >
      <ImageBackground
      blurRadius={25}
      style={{resizeMode:'cover',
      justifyContent:'flex-end',
      flex:1}}
      source={require('../assets/modern.jpg')}
      >

    
      
    <View 
     // behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{backgroundColor:'transparent',borderRadius:30}}>
      

      <Text
      style={
        {
          alignSelf:"center",
          color:"#fff",
          fontSize:25,
          fontFamily:fonts.Federo_Regular

        }
      }
      >SIGN UP</Text>

      
      <TextInput
      
     
     
      placeholderTextColor="#fff"  
      placeholder="Enter Name HERE..."
        onChangeText={setuname}
        style={styles.textinputstyle}
       />
      
        <TextInput
         placeholderTextColor="#fff"
       placeholder="Enter Email HERE..."
       textContentType="emailAddress"
        onChangeText={setuemail}
        style={styles.textinputstyle}
       />
       
        <TextInput
        placeholder="Enter Password HERE..."
       
        placeholderTextColor="#fff"
        textContentType={"password"}
        style={styles.textinputstyle}
        onChangeText={setupassword}
      >

        </TextInput>
      <View style={{margin:20,alignSelf:'center',flexDirection:'row'}}
      ><Text>Already HAVE A ACCOUNT ?</Text>
      <TouchableOpacity
      onPress={()=>navigation.navigate("Login")}
      >
        <Text style={{color:'skyblue'}}>LOGIN HERE!!</Text>
      </TouchableOpacity>
      </View>
        <TouchableOpacity

        onPress={()=>onsignup(uname,uemail,upassword)}
        style={styles.signUPbtn}
    
       
      >
            {loadin?
            <ActivityIndicator
            style={styles.activityIndicator}
            size={'large'}
            color={'black'}
            ></ActivityIndicator>
            :

            <Text>SIGN Up</Text>
            }
        </TouchableOpacity>
        </View>
        </ImageBackground>
    </View>
    
    )
}
export default Sign_Up

const styles=StyleSheet.create

(
  
  {
    textinputstyle:
    {
    margin:20,
    borderColor:"silver",
    fontFamily:fonts.Merienda_Regular,
    alignItems:'center',
    textAlign:"center",
    backgroundColor:"transparent",
    color:"#fff",
    borderRadius:20,
    borderWidth:1}
  ,
  signUPbtn:
  {
    margin:20,
    height:50,
    bottom:10,
    width:200,
    alignSelf:'center',
    justifyContent:'center',
        alignItems:'center',
        backgroundColor:'skyblue',
        borderTopLeftRadius:20,
        borderBottomRightRadius:20
  },
  activityIndicator:
  {
  color:'black',
  
  borderRadius:30,
 
  }
}
  )