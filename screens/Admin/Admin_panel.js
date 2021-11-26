import React, { useEffect,useState } from "react";
import { View,Dimensions ,Text,StyleSheet,ScrollView} from "react-native";
import {PieChart,BarChart,LineChart ,ProgressChart } from "react-native-chart-kit";


import { fonts } from "../constants/fonts";
import firestore from "@react-native-firebase/firestore";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { CommonActions } from "@react-navigation/routers";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { VISITOR_KEYS } from "@babel/types";

const {height,width}=Dimensions.get('screen')
const Admin_panel=()=>
{
    return(


      <View
      style={
        {
          backgroundColor:"#1a1f71",
          flex:1
        }
      }
      >



        <View
        style={
          {
            position:"absolute",
            width:'100%',
            backgroundColor:'#fff',
            borderRadius:25,
            top:height/3,
            
          }
        }
        >
        <Text
        style={
          {
            margin:20,
            alignSelf:"center"
          }
        }
        >ADD NEW ADMIN</Text>
        <TextInput
        placeholder="user Name"
        style={styles.textInput}
        >

        </TextInput>
        <TextInput
        placeholder="email"
        style={styles.textInput}
        >

        </TextInput>
        <TextInput
        placeholder="password"
        style={styles.textInput}
        >

        </TextInput>
        <TouchableOpacity
        style={
         styles.addBtn
        }
        >
          <FontAwesome5Icon
          name="plus"
          size={25}
          color="#FFF"
          >

          </FontAwesome5Icon>
          <Text
          style={{
            fontSize:25,
            color:'#fff'
          }}
          >ADD</Text>
        </TouchableOpacity>
        </View>

      </View>
    )
}

const styles=StyleSheet.create
(
  {
    textInput:
    {
      
        borderWidth:1,
        borderRadius:20,
        margin:10,
        textAlign:'center',
        textAlignVertical:'center',
        height:50
      

    },
    addBtn:
    {
      flexDirection:"row",
      backgroundColor:"#00356B",
      justifyContent:"center",
      alignItems:"center",
      width:100,
      alignSelf:'center',
      borderRadius:50
    }

  }
)
export default Admin_panel