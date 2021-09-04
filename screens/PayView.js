import axios from "axios";
import React, { useEffect, useState } from "react";
import {View,Text,ActivityIndicator, TextInput, Dimensions, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
import {  WebView} from "react-native-webview";
const PayView=()=>
{


  const [token,settoken]=useState(null)
  const [approvalUrl,setapprovalUrl]=useState(null)
  const [paymentId,setpaymetId]=useState(null)
  const dataDetail = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "transactions": [{
        "amount": {
            "total": "12900",
            "currency": "INR",
           
        }

    }],
    "redirect_urls": {
        "return_url": "https://example.com",
        "cancel_url": "https://example.com"
    }
}
  useEffect
  (
    ()=>
   
    {
      axios.post('https://api.sandbox.paypal.com/v1/oauth2/token?grant_type=client_credentials', { 
      grant_type : "client_credentials"},
            {
                headers: {
                 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic QVpJY2ZDb0xKeDdJcDN4NjQtT054TVFjeTB2Y3liNFFBeXhFdnNtVGJKQjMwTk5YOU5YcmEtOGs2UzAzUkgtaTNTNWlmbW5RbFpHdV9uTEQ6RUV3LThkQ2NQbnBJb3p0bGRJXzlsMFJBbWJHLTh1RlF3V3paaUFGY1FBNXhIVnFJZldjRkNMUFdrMjc1NFFmU0dFdTF1RXR6WkVCczhpSkY=`     
                  },
               
              
                
            }
        )
            .then(response => {
                console.log(response
                    +
                    "__AUTH RESPONSE")
                settoken(response.data.access_token)

                axios.post('https://api.sandbox.paypal.com/v1/payments/payment?', dataDetail,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                    .then(response => {

                        console.log(response+"__BEARER TOKEN RESPONSE")
                        const { id, links } = response.data
                        const Url = links.find(data => data.rel == "approval_url")

                       
                            setpaymetId(id)
                            setapprovalUrl(Url.href)

                            console.log(approvalUrl)
                       
                    }).catch(err => {
                        console.log(err)
                    }) 
               
              
              }).catch((err)=>console.log( err.response))
    }
 ,[] )
     
const onNavigationStateChange = (webViewState) => {

    if (webViewState.url.includes('https://example.com/')) {

     setapprovalUrl(null)

        const { PayerID, paymentId } = webViewState.url

        axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: PayerID },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(response => {
                console.log(response+"__PAYMENT STATUS RESPONSE")

            }).catch(err => {
                console.log({ ...err })
            })

    }
}

    return(
      
            <View style={{ flex: 1 }}>
                {
                    approvalUrl ? <WebView
                        style={{ flex:1}}
                        source={{ uri: approvalUrl }}
                    onNavigationStateChange={onNavigationStateChange}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={false}
                        style={{ marginTop: 20 }}
                    /> : <ActivityIndicator
                    size={"large"}

                    style={
                        {
                            position:'absolute'
                        }
                    }
                    
                    />
                }
            </View>
    
    )
}

export default PayView