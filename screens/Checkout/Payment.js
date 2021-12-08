
import { useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import  Modal  from 'react-native-modal';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ErrorCard from '../../components/ErrorCard';
import { Color } from '../../constants/colors';

import { fonts } from "../../constants/fonts";



import {
    makeOrder
} from "../../redux/Actions/OrderActions";
const Payment = () => {




    const cart = useSelector(state => state.Cart.Cart)
    const price = useSelector(state => state.Cart.totalPrice)

    const orderSuccess=useSelector(state=>state.Orders.orderSuccess)
    const orderFailedError=useSelector(state=>state.Orders.orderFailedError)
    const orderLoading=useSelector(state=>state.Orders.orderLoading)

    const categories = ["VISA", "MASTERCARD", "RUPAY"]
    const [creditCardNumber, setcreditCardNumber] = useState("1234567855555555")
    const [expDate, setexpDate] = useState("12/12")
    const [cvv, setCvv] = useState("123")
    const [holderName, setholerName] = useState("kingcobra")
    const [category, setcategory] = useState(categories[0])

    const dispatch = useDispatch()


    const route = useRoute()

    const VarifyCard = () => {

        var iSvarified = true

        if (isNaN(creditCardNumber) === true || isNaN(cvv) === true) {
            iSvarified = false
        }

        if (creditCardNumber.length != 16 || cvv.length != 3 || expDate.length != 5) {
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
        if (text.replaceAll(" ", "").length > 16)
            return
        var str = text.replaceAll(" ", "")
        console.log(str.length)
        if (str.length % 4 == 0 && str.length < 16 && str.length != 0) {
            text = text + " "
        }
        setcreditCardNumber(text)
    }

    const ProceedToPay = () => {

        if (!VarifyCard())
        {
            Alert.alert("Invalid Card Details","Please fill appropiate Card Details")
            return
        }
        const paymentDetails = {
            creditCardNumber: creditCardNumber,
            holderName: holderName,
            expDate: expDate,
            cardType: category,
        }
        dispatch(
            makeOrder(cart, price, route.params.address, paymentDetails)
        )

        if(orderSuccess)
        {
            
        }
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
                                        onPress={() => setcategory(item)}
                                        style={
                                            [
                                                styles.cardOptionsConatiner,
                                                {

                                                    backgroundColor: (category === item) ? Color.purpleLight : '#fff'
                                                }
                                            ]
                                        }
                                    >
                                        <Text
                                            style={
                                                {
                                                    fontSize: 15,
                                                    fontFamily: fonts.Federo_Regular,
                                                    color: (category === item) ? '#fff' : 'black'
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
                    onPress={
                        () => ProceedToPay()
                    }
                    style={styles.btnSubmit}
                >
                    <Text
                        style={styles.txtsubmitText}
                    >PROCEED</Text>
                </TouchableOpacity>

            </View>

        {
            orderFailedError
            &&
            <ErrorCard
            error={"Enable to Make Order please Try Again Later !!"}
            ></ErrorCard>
        }
            <Modal
            isVisible={orderLoading}
            >
                <View
                style={{
                    backgroundColor:"#fff",
                    elevation:20,
                    padding:20,
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
                >
                <ActivityIndicator
                size={30}
                color="black"
                ></ActivityIndicator>
                <Text
                style={
                    {
                        fontSize:20
                    }
                }
                >Proccesing Order....</Text>
                </View>
                
            </Modal>
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
                backgroundColor:'#fff',

            },
            rowViewContainer:
            {
                flexDirection: 'row',
                justifyContent:"space-between"
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
                elevation: 10,
                margin:20,
                backgroundColor:Color.purpleLight

            },
            txtCardname:
            {
                backgroundColor: '#e5e5e5',
                marginHorizontal: 20,
                fontSize: 20,
                elevation:5,
                borderRadius:10,
                textAlign: 'center'
            },
            txtLabel:

            {
                marginHorizontal: 20,
                fontSize: 15,
                margin:5

            }
            ,
            cardOptionsConatiner:
            {
                height: 50,
                paddingHorizontal: 15,
                marginHorizontal: 10,
                marginVertical:20,

                borderRadius: 20,
                elevation: 10,
                justifyContent: "center",
                alignItems: "center",
            },
            txtCardnum:
            {
                backgroundColor: '#e5e5e5',
                marginHorizontal: 20,
                fontSize: 20,
                elevation:2,
                borderRadius: 5,
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
                borderRadius: 5,
                elevation: 5,
                justifyContent: 'center',
                alignItems: 'center'
            },
            textInputEXpDate:

            {
                elevation: 10,
                backgroundColor: '#e5e5e5',
                borderRadius: 5,
                width: 100,
                textAlign: 'center'

            }
        }
    )