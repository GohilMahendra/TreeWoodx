import React, { useEffect,useState } from "react";
import { View,Dimensions ,Text,StyleSheet,ScrollView} from "react-native";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Color } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
const Admin_panel=()=>
{

  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [userName,setuserName]=useState("")
    return(

      <View
      style={
        styles.Container
      }
      > 
      <Text
      style={
        {
          fontSize:25,
          fontFamily:fonts.Federo_Regular,
          alignItems:'center',
          alignSelf:'center'
        }
      }
      >ADD ADMIN</Text>
      <View
      style={styles.inputContainer
      }
      >
        <Text
        style={
          styles.txtInfo
        }
        >
          USERNAME
        </Text>
        <TextInput
        value={userName}
        onChangeText={text=>setuserName(text)}
        style={styles
          .textInput}
        ></TextInput>
            <Text
        style={
          styles.txtInfo
        }
        >
          EMAIL
        </Text>
         <TextInput
           value={email}
           onChangeText={text=>setemail(text)}
        style={styles.textInput}
        ></TextInput>
         <Text
        style={
          styles.txtInfo
        }
        >
            PASSWORD
        </Text>
         <TextInput
           value={password}
           onChangeText={text=>setpassword(text)}
        style={styles.textInput}
        ></TextInput>
     
        <TouchableOpacity
        style={styles.addBtn}
        >
          <Text>ADD</Text>
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
      backgroundColor:"#fff",
      justifyContent:'center'
    },
    inputContainer:
    {

      margin:20,
      backgroundColor:"#fff",
      alignItems:'center',
      justifyContent:"center",
      borderRadius:15,
      elevation:15


        
    },
    textInput:
    {
      
        borderWidth:1,
        borderRadius:20,
        margin:10,
        textAlign:'center',
        textAlignVertical:'center',
        height:50,
        width:'100%'
      

    },
    txtInfo:
    {

      fontSize:18,
     
    },

    addBtn:
    {
      flexDirection:"row",
      backgroundColor:Color.lightBlue,
      justifyContent:"center",
      alignItems:"center",
      width:150,
      height:50,
      alignSelf:'center',
      borderRadius:50
    }

  }
)
export default Admin_panel