import React, { useEffect, useState } from "react";
import { View,Text, TextInput, Button, Image, Dimensions, ActivityIndicator,ActivityIndicatorBase, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { set, useAnimatedGestureHandler, Value } from "react-native-reanimated";

import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";



const Login=({navigation})=>
{




  
 
  const {height,width}=Dimensions.get('screen')
  const validateCred=(uname,password)=>
  {
    
    if(uname=="" || password=="")
    return false

    if(password.length<8)
    return false
   
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(uname).toLowerCase());
   
  }

  

  
  useEffect
  (
    ()=>{
      
      const subcription=auth().onAuthStateChanged

      ((user)=>
      {
        if(user)
        {
          
    
          navigation.navigate("Home")
        }
      })

      return subcription
    },[]

  )
    const onSignin=async(email,password)=>
    {

      setloading(true)
     

      if(!validateCred(email,password))
      {
        alert('Invalid creadentials')
        setloading(false)
        return
      }
    
      await auth().signInWithEmailAndPassword(email,password).then((result)=>
      {
        setloading(false)
        console.log(result)
        navigation.navigate("Home")
      }
      ).catch(err=>
        {
          setloading(false)
          alert("WRONG PASSWORD/EMAIL")
          console.log('error in login')
        })

    }
    const [loading,setloading]=useState(false)
    const [uname,setuname]=useState("")
    const ResetPasswordWithEmail=()=>
    {
      if(uname=="")
      {
        alert("enter email to send reset link")
      }
      else
      {

        auth().sendPasswordResetEmail(uname).then(function(user)
        {
          alert('link is in your email')
        }).catch(function(err)
        {
          
          alert('wrong email please check correct please enter email and then click on it we will send rest link on that email')
        })
    
      }
    }
    const [upassword,setupassword]=useState("")
    return(
    <View>
      


  
     
     
      <Image
      
      style={{position:'absolute',resizeMode:'stretch',height:height,width:width}}
      source={require('../assets/login.jpg')}
      />
      {/* <View style={{backgroundColor:'orange',height:200,width:250,position:'absolute',top:50,left:50}}>

      </View>
      <View style={{backgroundColor:'red',height:height/3,width:width/2,position:'absolute',top:100,right:100}}>

</View>
<View style={{backgroundColor:'#d3003f',height:height/3,width:width/2-50,
position:'absolute',top:70,right:50}}>

</View> */}


  <View style={{position:'absolute',top:height/20,shadowColor:'black',shadowOffset:{height:5,width:5},
  alignSelf:'flex-start',shadowOpacity:1,elevation:5,margin:30}}>
  <Text style={{fontSize:25,color:'#fff',shadowOpacity:1,
  textShadowColor:'silver',textShadowRadius:20,fontWeight:'bold',
  textShadowOffset:{height:5,width:5}}}>hey HI !!</Text>
  <Text style={{fontSize:25,color:'#fff',shadowOpacity:1,
  textShadowColor:'silver',textShadowRadius:20,
  textShadowOffset:{height:5,width:5}}}>want to explore catalog?</Text>
  <Text style={{fontSize:30,color:'#fff',shadowOpacity:1,
  textShadowColor:'silver',textShadowRadius:20,
  textShadowOffset:{height:5,width:2}}}>LOGIN HERE!!</Text>
  </View>
  
      <View style={{top:height/5,margin:20,backgroundColor:'#fff',borderRadius:40}}>
        <TextInput
        placeholder="Enter Email HERE..."
        onChangeText={setuname}

        onSubmitEditing={()=>console.log("submit called")}
        
        style={{margin:20,borderRadius:20,backgroundColor:'#f2f3f4'}}
       />
       
        <TextInput
        placeholder="Enter Password HERE..."
      
        style={{margin:20,borderRadius:20,backgroundColor:'#f2f3f4'}}
        onChangeText={setupassword}
      >

        </TextInput>
      <View style={{margin:20,alignSelf:'center',flexDirection:'row'}}
      ><Text>DON'T HAVE A ACCOUNT ?</Text>
      <TouchableOpacity
      onPress={()=>navigation.navigate("Sign_Up")}
      >
        <Text style={{color:'skyblue'}}>REGISTER HERE!!</Text>
      </TouchableOpacity>
   

      </View>
      <TouchableOpacity
      onPress={()=>ResetPasswordWithEmail()}
      >
        <Text style={{alignItems:'center',justifyContent:'center',textAlign:'center'
        ,fontSize:15,color:'skyblue'}}>Forgot Password??</Text>
      </TouchableOpacity>
   
      {loading &&  <ActivityIndicator
      
      style={{position:'absolute',top:height/2,alignSelf:'center',backgroundColor:'white',borderRadius:30,justifyContent:"center"}}
      size={"large"}
      color="green"
    

     />
    }
        <TouchableOpacity
        style={{margin:20,height:50,bottom:10,width:200,alignSelf:'center',justifyContent:'center',
        alignItems:'center',backgroundColor:'#e76f51',borderTopLeftRadius:20,borderBottomRightRadius:20}}
     
        onPress={()=>onSignin(uname,upassword)}
       
      >

            
            <Text style={{color:"white",fontSize:18}}>SIGN IN
            
            
            
            </Text>

        </TouchableOpacity>
    </View>
    </View>
    )
}
export default Login