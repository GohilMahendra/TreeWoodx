
import { useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Color } from '../../constants/colors';
import { fonts } from "../../constants/fonts";


const Payment = () => {


    const categories = ["VISA", "MASTERCARD", "RUPAY"]
    const [creditCardNumber, setcreditCardNumber] = useState("")
    const [expDate, setexpDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [holderName, setholerName] = useState("")
    const [categoty, setcategoty] = useState(categories[0])

    const route=useRoute()
    console.log(route.params)
    const VarifyCard = (creditCardNumber, cvv, date) => {

        var iSvarified = true

        if(creditCardNumber.isNan()===true || cvv.isNan()===true)
        {
            iSvarified=false
        }

        if (creditCardNumber.length != 16 || cvv.length != 3 || date.length != 5) {
            iSvarified = false
        }

        return iSvarified
    }

    const changeCreditCardCvv = (text) => {
        if (text.length > 3)
            return

        setCvv(text)

    }

    const changeCreditCardHolderName = (text) => {

        setholerName(text)

    }


    const changeCreditCardExpDate = (text) => {

        if (text.length > 5)
            return
        if (text.length == 2 && expDate.includes('/') == false) {
            text += '/'
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
            style={styles.Contianer}
        >

            <View

            >
                <View
                    style={styles.rowViewContainer}
                >
                    {
                        categories.map(
                            item => {
                                return (
                                    <TouchableOpacity
                                        key={item}
                                        onPress={() => setcategoty(item)}
                                        style={
                                            [
                                                styles.cardOptionsConatiner,
                                            {

                                                backgroundColor: (categoty === item) ? "blue" : '#fff'
                                            }
                                        ]
                                        }
                                    >
                                        <Text
                                            style={
                                                {
                                                    fontSize: 15,
                                                    fontFamily: fonts.Federo_Regular,
                                                    color: (categoty === item) ? '#fff' : 'black'
                                                }
                                            }
                                        >{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        )
                    }

                </View>

                <View
                    style={
                        {
                            marginVertical: 20
                        }
                    }
                >
                    <Text
                        style={styles.txtLabel}
                    >
                        CardHolder Name
                    </Text>

                    <TextInput
                        placeholder="John DOE"
                        value={holderName}
                        onChangeText={text => changeCreditCardHolderName(text)}
                        style={styles.txtCardname}
                    >
                    </TextInput>
                </View>
                <Text

                    style={styles.txtLabel}>
                    CARD NUMBER
                </Text>
                <TextInput
                    placeholder="0000 0000 0000 0000"

                    maxLength={19}
                    value={creditCardNumber}
                    keyboardType={
                        "numeric"
                    }
                    onChangeText={text => changeCreditCardNumber(text)}
                    style={styles.txtCardnum}
                >

                </TextInput>
                <View
                    style={styles.rowOptionsConatiner}
                >

                    <TextInput
                        onChangeText={text => changeCreditCardExpDate(text)}
                        value={expDate}
                        placeholder="Exp Date"
                        maxLength={5}
                        keyboardType="number-pad"
                        style={styles.textInputEXpDate}
                    >
                    </TextInput>

                    <TextInput
                        value={cvv}
                        onChangeText={text => changeCreditCardCvv(text)}
                        placeholder="cvv"
                        keyboardType="number-pad"
                        style={styles.textInputCvv}
                    >
                    </TextInput>
                </View>

                <TouchableOpacity
                    style={styles.btnSubmit}
                >
                    <Text
                        style={styles.txtsubmitText}
                    >PROCEED</Text>
                </TouchableOpacity>

            </View>
        </View>
    )

}

export default Payment


const styles = StyleSheet.create
    (
        {
            Contianer:
            {
                flex: 1,
                justifyContent: 'center'

            },
            rowViewContainer:
            {
                flexDirection: 'row'
            },
            txtsubmitText:
            {
                fontSize: 20,
                color: "#fff",
                fontFamily: fonts.Federo_Regular
            },
            btnSubmit:
            {
                height: 70,

                width: "80%",
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                elevation: 15,

                backgroundColor: "blue"

            },
            txtCardname:

            {
                backgroundColor: '#e5e5e5',
                marginHorizontal: 20,
                fontSize: 20,
                textAlign: 'center'
            },
            txtLabel:

            {
                marginHorizontal: 20,
                fontSize: 15,
              

            }
            ,
            cardOptionsConatiner:
            {
                height: 50,
                paddingHorizontal: 15,

                margin: 20,
                borderRadius: 20,
                elevation: 15,
                justifyContent: "center",
                alignItems: "center",
            },
            txtCardnum:

            {

                backgroundColor: '#e5e5e5',
                marginHorizontal: 20,
                fontSize: 20,
                borderRadius: 15,
                height: 100,
                textAlign: 'center'
            }
            ,
            rowOptionsConatiner:

            {
                flexDirection: "row",
                justifyContent: 'space-evenly',
                margin: 20,

            },


            textInputCvv:
            {
                backgroundColor: '#e5e5e5',
                width: 100,
                fontSize: 20,
                textAlign: 'center',
                borderRadius: 20,
                elevation:10,
                justifyContent: 'center',
                alignItems: 'center'
            },
            textInputEXpDate:

            {
                elevation:10,
                backgroundColor: '#e5e5e5',
                borderRadius: 15,
                width: 100,
                textAlign: 'center'

            }
        }
    )