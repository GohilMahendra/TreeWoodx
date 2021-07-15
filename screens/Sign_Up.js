import React, { useState } from "react";
import { View,Text,Alert, TextInput, Button, Dimensions, Image, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";

import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database"
import firestore from "@react-native-firebase/firestore";
import { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import { NavigationContainer } from "@react-navigation/native";

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
        await auth().createUserWithEmailAndPassword(email,password).then((result) =>
        {firestore().collection('users').doc(auth().currentUser.uid).set
        (
          {
            name:uname,
            email:uemail
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

    const [loadin,setloading]=useState(false)
  
    return(

      <View style={{flex:1,backgroundColor:'silver'}}>
      <Image
      style={{position:'absolute',resizeMode:'cover',height:'100%',width:'100%'}}
      source={require('../assets/modern.jpg')}
      >

      </Image>
      <View style={{position:'absolute',top:height/5,alignSelf:'center'}}>
        <Text style={{fontWeight:'bold',fontSize:30,color:'#fff',textShadowOffset:{height:5,width:5},textShadowRadius:20
      ,textShadowColor:'silver',shadowOpacity:1}}>REGISTER</Text>
        <Text  style={{fontWeight:'bold',fontSize:20,color:'#fff',textShadowOffset:{height:5,width:5},textShadowRadius:20
      ,textShadowColor:'silver',shadowOpacity:1}}>TO THE LARGEST MODERN FURNITURE PROVIDER</Text>
      </View>
  {loadin &&    <ActivityIndicator
      style={{backgroundColor:'#fff',borderRadius:30,position:'absolute',left:width/2,top:height/3}}
      size={'large'}
      color={'silver'}
      ></ActivityIndicator>}
    <View style={{top:height/2-50,backgroundColor:'transparent',borderRadius:30}}>
      

      
      <TextInput
        placeholder="Enter Name HERE..."
        onChangeText={setuname}
        style={{margin:20,backgroundColor:"#F5F5F5",borderRadius:20,borderWidth:1}}
       />
      
        <TextInput
        placeholder="Enter Email HERE..."
        onChangeText={setuemail}
        style={{margin:20,color:"#fff",backgroundColor:"#F5F5F5",borderRadius:20,borderWidth:1}}
       />
       
        <TextInput
        placeholder="Enter Password HERE..."
       
        textContentType={"password"}
        style={{margin:20,color:"#fff",backgroundColor:"#F5F5F5",borderRadius:20,borderWidth:1}}
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
        style={{margin:20,height:50,bottom:10,width:200,alignSelf:'center',justifyContent:'center',
        alignItems:'center',backgroundColor:'skyblue',borderTopLeftRadius:20,borderBottomRightRadius:20}}
     
       
      >
            <Text>SIGN Up</Text>

        </TouchableOpacity>
        </View>
    </View>)
}
export default Sign_Up