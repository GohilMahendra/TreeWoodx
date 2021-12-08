import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";

import { fonts } from "../../constants/fonts";
import { Color } from "../../constants/colors";
import auth from "@react-native-firebase/auth";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { is, tryStatement } from "@babel/types";
const Checkout = () => {



  const navigation = useNavigation()


  const [contactDetails, setContectDetails] = useState(
    {
      mobileno: '9966455225',
      fullName: auth().currentUser.displayName,
      emailID: auth().currentUser.email,

    }
  )

  const [addressDetails, setAddressDetails] = useState
    (
      {
        postalCode: "123456",
        addressArea: "flat no 505",
        landMark: "shantivan socity",
        city: "deharadun",
        district: "dehardun",
        state: "himachal pradesh",
      }
    )

  const IsAnyFiledNull = () => {

    let isNull = false
    isNull =
      contactDetails.emailID === "" || contactDetails.fullName === "" || contactDetails.fullName === ""
      || addressDetails.postalCode == "" || addressDetails.state == "" || addressDetails.city == "" ||
      addressDetails.landMark == "" || addressDetails.addressArea == ""
    return isNull
  }
  const SubmitDetails = () => {

    if (IsAnyFiledNull()) {
      Alert.alert("Please Fill All FIELDS are Mendatory")
      return

    }


    navigation.navigate(
      "OrderDetails",
      {
        address: {
          addressDetails: addressDetails,
          contactDetails: contactDetails
        }
      }
    )


  }

  return (


    <View style={styles.Container}>

      <ScrollView>
        <View
          style={styles.detailsContainer}
        >
          <Text
            style={styles.txtLabel}
          >ENTER CONTECT DETAILS</Text>

          <TextInput
            onChangeText={text => setContectDetails({ ...contactDetails, fullName: text })}
            value={contactDetails.fullName}
            placeholder="Enter Full Name"
            style={styles.txtInput}
          ></TextInput>

          <TextInput

            onChangeText={text => setContectDetails({ ...contactDetails, emailID: text })}

            value={contactDetails.emailID}
            placeholder="Enter EmailID"
            style={styles.txtInput}
          ></TextInput>

          <TextInput

            onChangeText={text => setContectDetails({ ...contactDetails, mobileno: text })}

            value={contactDetails.mobileno}
            maxLength={15}
            placeholder="Enter Mobile No"
            keyboardType="numeric"
            style={styles.txtInput}
          ></TextInput>

          <Text
            style={
              styles.txtLabel
            }
          >
            Enter Address Details
          </Text>
          
          <TextInput
            onChangeText={text => setAddressDetails({ ...addressDetails, addressArea: text })}
            value={addressDetails.addressArea}
            style={styles.txtInputArea}
            placeholder="Enter Area/street ex. flat no 505"
          ></TextInput>

          <TextInput
            onChangeText={text => setAddressDetails({ ...addressDetails, landMark: text })}
            value={addressDetails.landMark}
            style={styles.txtInput}
            placeholder="Enter Near By Locality ex. near bus stand"
          ></TextInput>

          <TextInput
            onChangeText={text => setAddressDetails({ ...addressDetails, city: text })}
            value={addressDetails.city}
            style={styles.txtInput}
            placeholder="Enter City"
          ></TextInput>

          <TextInput
            onChangeText={text => setAddressDetails({ ...addressDetails, district: text })}
            value={addressDetails.district}
            style={styles.txtInput}
            placeholder="Enter District "
          ></TextInput>

          <TextInput
            onChangeText={text => setAddressDetails({ ...addressDetails, state: text })}
            value={addressDetails.state}
            style={styles.txtInput}
            placeholder="Enter state/provinence"
          ></TextInput>

          <TextInput
            onChangeText={text => setAddressDetails({ ...addressDetails, postalCode: text })}
            value={addressDetails.postalCode}
            style={styles.txtInput}
            placeholder="Enter Zipcode"
          ></TextInput>

          <TouchableOpacity
            onPress={() => SubmitDetails()}
            style={styles.btnSubmit}
          >
            <Text
              style={
                {
                  fontSize: 20,
                  fontFamily: fonts.Federo_Regular,
                  color: '#fff'

                }
              }
            >PROCCED TO PAYMENT</Text>
          </TouchableOpacity>

        </View>


      </ScrollView>

    </View>
  )
}


const styles = StyleSheet.create(
  {
    Container:
    {
      flex: 1,
      backgroundColor: 'white',

      position: 'relative'
    },
    detailsContainer:
    {
      marginTop: 50,
    },
  
    txtInput:
    {
      height: 50,
      borderWidth:0.2,
     // elevation:0.2,
   

      paddingHorizontal: 10,
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 5
    },
    btnSubmit:   
    {
      height: 50,
      margin: 20,
      backgroundColor: Color.purpleLight,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      elevation: 15
    }
  ,
    txtInputArea:
    {
      height: 100,
   //  elevation:5,
      paddingHorizontal: 10,
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 10,
      borderWidth:0.2

    },
    txtLabel:

    {
      fontSize: 20,
      alignSelf: 'center',

      fontWeight: '600'
    }


  }
)
export default Checkout