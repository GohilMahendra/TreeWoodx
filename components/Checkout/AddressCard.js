

import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { fonts } from "../../constants/fonts";

const AddressCard = ({ address }) => {

    const contactDetails = address.contactDetails
    const addressDetails = address.addressDetails
    return (
        <View
            style={styles.Container}
        >
            <Text
            style={styles.mainHeader}
            >ADDERESS</Text>
            <View
                style={styles.contactDetailsContainer}
            >
                <Text
                    style={styles.txtHeader}
                >Contect Details</Text>
                <Text style={styles.txtInfo}>{contactDetails.fullName}</Text>
                <Text style={styles.txtInfo}>{contactDetails.emailID}</Text>
                <Text style={styles.txtInfo}>{contactDetails.mobileno}</Text>


            </View>
            <View
                style={styles.addressDetailsContainer}
            >
                 <Text
                    style={styles.txtHeader}
                >Adderess Details</Text>
                <Text style={styles.txtInfo}>{addressDetails.addressArea}</Text>
                <Text style={styles.txtInfo}>{addressDetails.landMark}</Text>
                <View
                style={styles.rowContainer}
                >
                 <Text style={styles.txtInfo}>City :</Text>
                <Text style={styles.txtInfo}>{addressDetails.city}</Text>
                </View>
                <View
                style={styles.rowContainer}
                >
                 <Text style={styles.txtInfo}>State :</Text>
                <Text style={styles.txtInfo}>{addressDetails.state}</Text>
                </View>
                <View
                style={styles.rowContainer}
                >
                 <Text style={styles.txtInfo}>Postal Code :</Text>
                <Text style={styles.txtInfo}>{addressDetails.postalCode}</Text>
                </View>
                <Text style={styles.txtInfo}>{addressDetails.address}</Text>

            </View>
        </View>


    )
}

const styles = StyleSheet.create
    (
        {
            Container:
            {
                backgroundColor: "#fff",
                elevation: 5,
                alignItems:'center',
                margin:10,
                borderRadius:15
            },
            contactDetailsContainer:
            {
                alignItems: 'center',
                margin:10

            },
            txtHeader:
            {
                fontSize: 20,
                color:"black",
                fontFamily: fonts.Federo_Regular
            },
            mainHeader:
            {
              
                fontFamily: fonts.Federo_Regular,
                fontSize:25
            },
            txtInfo:
            {
                fontFamily: fonts.Genos_Regular,

                fontSize: 20,
                color:'black'
            },
            addressDetailsContainer:
            {
               alignItems:'center',
               margin:10
            },
            rowContainer:    
            {
                flexDirection:'row',
                margin:5,
                justifyContent:'space-evenly'
            }
        


        }
    )
export default AddressCard