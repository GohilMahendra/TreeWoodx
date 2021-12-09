import React from "react";

import { View, Text, StyleSheet } from "react-native";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const AddStar = ({ star }) => {


  return (
    <View style={styles.Container}>

      <FontAwesome5Icon
        name={'star'}
        size={20}
        color={"#fff"}
        solid={true}
      >
      </FontAwesome5Icon>

      <Text
        style={styles.txtNumber}
      >
        {star}
      </Text>
      
    </View>


  )
}

const styles = StyleSheet.create
  (
    {
      Container:
      {
        flexDirection: 'row',
        width: 70,
        justifyContent: "space-evenly",
        margin: 15,
        alignItems:"center",
        padding:5,
        borderRadius: 10,
        backgroundColor: "green",
      },
      txtNumber:
      {
        fontSize: 20,
        color: '#fff',
        textAlign: "center",
        textAlignVertical: "center",
      }
    
    }
  )

export default AddStar
