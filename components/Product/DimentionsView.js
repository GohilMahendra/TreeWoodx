import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

const DimentionsView = ({ productHeight, productWidth, productLength }) => {

  return (
    <View style={styles.Cotainer}>

      <View style={styles.viewContainer}>
        <Text>Height</Text>
        <Text>{productHeight}</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text>width</Text>
        <Text>{productWidth}</Text>
      </View>

      <View style={styles.viewContainer}>
        <Text>length</Text>
        <Text>{productLength}</Text>
      </View>

    </View>


  )
}

const styles = StyleSheet.create
  (
    {
      Cotainer:
      {
        flexDirection: 'row',
        margin:15,
        justifyContent: "space-evenly",
      },
      viewContainer:
      {
        height: 100,
        borderRadius: 20, 
        width: 100,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowOffset: { width: 10, height: 6 },
        shadowOpacity: 1, 
        shadowColor: '#455fff',
        shadowRadius: 20,
         elevation: 15
      }

    }
  )
export default DimentionsView
