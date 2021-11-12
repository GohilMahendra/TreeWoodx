
import React,{useState} from "react";

import {
    View, Text, TextInput
} from "react-native";


import { fonts } from "../constants/fonts";
const PaymentCard = () => {


    const [creditCardNumber, setcreditCardNumber] = useState("")
    const [expDate, setexpDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [holderName, setholerName] = useState("")

    const VarifyCard = (creditCardNumber,cvv,date) => {

        var iSvarified = false

        if (creditCardNumber.length != 16 || cvv.length != 3 || date.length != 5) {
            iSvarified = false
        }

        return iSvarified
    }

    const changeCreditCardCvv = (text) => {
        if (cvv.length >= 3)
            return

        setCvv(text)

    }

    const changeCreditCardHolderName = (text) => {

        setholerName(text)

    }


    const changeCreditCardExpDate = (text) => {

        if (text.length > 5)
            return
        if (expDate.length >= 2) {
            text = text + " "
        }
        setexpDate(text)
    }


    const changeCreditCardNumber = (text) => {
        if (text.replaceAll(" ", "").length > 165)
            return
        var str = text.replaceAll(" ", "")
        console.log(str.length)
        if (str.length % 4 == 0 && str.length < 16 && str.length != 0) {
            text = text + " "
        }
        setcreditCardNumber(text)
    }



    return (

        <View

            style={{
                backgroundColor: '#fff',
                borderRadius: 20,
                elevation: 25,
                marginTop: 25,
                opacity: 0.8
            }}
        >
            <Text
                style={{
                    alignSelf: 'center',
                    fontSize: 25,
                    fontFamily: fonts.Merienda_Regular
                }}
            >Payment details</Text>
            <TextInput
                placeholder="0000 0000 0000 0000"

                maxLength={19}
                value={creditCardNumber}
                keyboardType={
                    "numeric"
                }
                onChangeText={text => changeCreditCardNumber(text)}
                style={
                    {

                        backgroundColor: '#e5e5e5',
                        margin: 20,
                        fontSize: 20,
                        textAlign: 'center'
                    }
                }
            >

            </TextInput>
            <View
                style={
                    {
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        margin: 20
                    }
                }
            >
                <TextInput
                    onChangeText={text => changeCreditCardExpDate(text)}
                    placeholder="Exp Date"
                    maxLength={5}
                    keyboardType="name-phone-pad"
                    style={
                        {

                            backgroundColor: '#e5e5e5',
                            borderRadius: 20

                        }
                    }
                >
                </TextInput>
                <TextInput
                    value={cvv}
                    onChangeText={text => changeCreditCardCvv(text)}
                    placeholder="cvv"
                    keyboardType="number-pad"
                    style={
                        {
                            backgroundColor: '#e5e5e5',
                            width: 70,
                            fontSize: 25,
                            textAlign: 'center',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }
                >
                </TextInput>
            </View>
            <TextInput
                placeholder="John DOE"
                value={holderName}
                onChangeText={text => changeCreditCardHolderName(text)}
                style={
                    {
                        backgroundColor: '#e5e5e5',
                        margin: 20,
                        fontSize: 20,
                        textAlign: 'center'
                    }
                }
            >
            </TextInput>
        </View>
    )

}

export default PaymentCard