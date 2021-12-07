import React, { useEffect,useState } from "react";
import { View,Dimensions ,Text,StyleSheet,ScrollView, Alert} from "react-native";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Color } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import firestore from "@react-native-firebase/firestore";
import { VarifySintext, VarifySyntex } from "../../functions/VarifySyntex";
const AddAdmin=()=>
{

  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [userName,setuserName]=useState("")


  const AddAdmin=()=>
  {


    try
    {



      const {varified,error}=VarifySyntex(userName,email,password)

      if(!varified)
      {
        Alert.alert("Fields Are not Apropiate",error)
        return
      }
      const AddAdm=firestore()
      .collection("admin")
      .add(
        {
          userName:userName,
          email:email
        }
      )
    }
    catch(err)
    {
      console.log(err)
    }

      
  }

    return(

      <View
      style={
        styles.Container
      }
      > 
     
      <View
      style={styles.inputContainer
      }
      >
         <Text
      style={styles.txtHeader}
      >ADD ADMIN</Text>
      
        <TextInput
        value={userName}
        placeholder="UserName"
        onChangeText={text=>setuserName(text)}
        style={styles
          .textInput}
        ></TextInput>
       
         <TextInput
           value={email}
           placeholder="Email"
           onChangeText={text=>setemail(text)}
        style={styles.textInput}
        ></TextInput>
      
         <TextInput
           value={password}
           placeholder="Password"
           onChangeText={text=>setpassword(text)}
        style={styles.textInput}
        ></TextInput>
     
        <TouchableOpacity
        onPress={
          ()=>AddAdmin()
        }
        style={styles.addBtn}
        >
          <Text style={styles.txtAdd}>ADD</Text>
        </TouchableOpacity>
      </View>

      </View>


    
    )
}

const styles=StyleSheet.create
(
  {
    Container:
    {
      flex:1,
      backgroundColor:Color.purpleLight,
      justifyContent:'center',
      
    },
    txtHeader:  
    {
      fontSize:25,
      margin:30,
      color:Color.purpleLight,
      fontFamily:fonts.Federo_Regular,
      alignItems:'center',
      alignSelf:'center'
    },
    inputContainer:
    {

      margin:10,
      backgroundColor:"#fff",
      alignItems:'center',
      justifyContent:"center",
      borderRadius:15,
      elevation:15


        
    },
    textInput:
    {
      
        borderRadius:15,
        margin:10,
        width:"90%",
        elevation:2,
        textAlign:'center',
        textAlignVertical:'center',
        height:50,
       
      

    },
    txtInfo:
    {

      fontSize:18,
     
    },

    addBtn:
    {
      flexDirection:"row",
      backgroundColor:Color.purpleLight,
      justifyContent:"center",
      alignItems:"center",
      width:150,
      elevation:10,
      margin:20,
      height:50,
      alignSelf:'center',
      borderRadius:15
    },
    txtAdd:
    {
      fontSize:18,
      fontFamily:fonts.Federo_Regular,
      color:"#fff"
    }
  }
)
export default AddAdmin