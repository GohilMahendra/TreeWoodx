import axios from "axios";
import React,{Component} from "react";
import { WebView } from "react-native-webview";
import { Text,View,ActivityIndicator } from "react-native";
export default class Paypal extends Component {

   
   
    state = {
        accessToken: null,
        approvalUrl: null,
        paymentId: null
    }

    componentDidMount() {
        let currency = '100 USD'
        currency.replace(" USD", "r")

        const dataDetail = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": "5",
                    "currency": "THB",
                   
                }

            }],
            "redirect_urls": {
                "return_url": "https://example.com",
                "cancel_url": "https://example.com"
            }
        }

         axios.post('https://api.sandbox.paypal.com/v1/oauth2/token?grant_type=client_credentials', { grant_type: 'client_credentials' },
            {
                headers: {
                 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic QVpJY2ZDb0xKeDdJcDN4NjQtT054TVFjeTB2Y3liNFFBeXhFdnNtVGJKQjMwTk5YOU5YcmEtOGs2UzAzUkgtaTNTNWlmbW5RbFpHdV9uTEQ6RUV3LThkQ2NQbnBJb3p0bGRJXzlsMFJBbWJHLTh1RlF3V3paaUFGY1FBNXhIVnFJZldjRkNMUFdrMjc1NFFmU0dFdTF1RXR6WkVCczhpSkY="`
                },
                
            }
        )
            .then(response => {
                console.log('rs')

                
                console.log(state.accessToken)
                this.setState({
                   
                accessToken: response.data.access_token
                }).catch((err)=>console.log('err'+err))

                console.log(state.accessToken+'acc')
                axios.post('https://api.sandbox.paypal.com/v1/payments/payment', dataDetail,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.state.accessToken}`
                        }
                    }
                )
                    .then(response => {

                        console.log(response+'res')
                        const { id, links } = response.data
                        const approvalUrl = links.find(data => data.rel == "approval_url")

                        this.setState({
                            paymentId: id,
                            approvalUrl: approvalUrl.href
                        })
                    }).catch(err => {
                        console.log({ ...err+'err' })
                    })
            }).catch(err => {
                console.log({ ...err })
            })

    }

    _onNavigationStateChange = (webViewState) => {

        if (webViewState.url.includes('https://example.com/')) {

            this.setState({
                approvalUrl: null
            })

            const { PayerID, paymentId } = webViewState.url

            axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: PayerID },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.accessToken}`
                    }
                }
            )
                .then(response => {
                    console.log(response)

                }).catch(err => {
                    console.log({ ...err })
                })

        }
    }

    render() {

        const { approvalUrl } = this.state
        return (
            <View style={{ flex: 1 }}>
              
    
                {
                    approvalUrl ? <WebView
                        style={{
                            flex:1
                        }}
                        source={{ uri: approvalUrl }}
                        onNavigationStateChange={this._onNavigationStateChange}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={false}
                        style={{ marginTop: 20 }}
                    /> : <ActivityIndicator
                    
                    size={"large"}
                    style={
                        {
                            position:'absolute',
                            left:'50%',
                            top:'50%'
                        }
                    }
                    />
                }
            </View>
        )
    }
}