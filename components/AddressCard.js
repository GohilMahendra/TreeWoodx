

import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View, Text } from "react-native";

import { fonts } from "../constants/fonts";



const AddressCard = ({address}) => {

    console.log(address)
    return (

        <View

            style=
            {
               {

                height:250,
                backgroundColor:'#fff',
                elevation:25,
                borderRadius:20,
                margin:10,
                alignItems:"center",
                justifyContent:'center'
               }
            }
        >
            <Text
            style={
                {
                    fontFamily:fonts.Merienda_Regular,
                    fontSize:25
                }
            }
            >Address Details</Text>
              <Text>{address.AddressLine}</Text>
         
            <View
            style={{
                flexDirection:'row',
                justifyContent:'space-evenly'
            }}
            >
                <Text>Pincode :</Text>
                <Text>{address.pincode}</Text>
            </View>
            <Text
           
           >{address.address.locality}</Text>
           
         
            <Text
           
           >{address.address.place}</Text>

            <Text
           
           >{address.address.region}</Text>
            <Text
           
           >{address.address.country}</Text>

        </View>


    )
}

const styles = StyleSheet.create
    (
        {

         
        }
    )
export default AddressCard