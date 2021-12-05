
import { jsxAttribute } from '@babel/types';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
    View,
    Text
} from 'react-native';
import { fonts } from '../../constants/fonts';
import OrderStatusCard from './OrderStatusCard';
const OrderCard = (props) => {

    const { data } = props

    const contactDetails = data.address.contactDetails
    const addressDetails = data.address.addressDetails
    return (
        <View
            style={styles.Container}
        >

            <Text
                style={styles.txtHeader}
            >{data.key}</Text>
            <Text
                style={styles.txtHeader}
            >
                {data.date}
            </Text>

            <View
                style={styles.addressInfoConatiner}
            >
                <View
                    style={styles.addressDetailsContainer}
                >
                    <Text
                        style={styles.txtHeader}
                    >Delivered to</Text>
                    <Text style={styles.txtDetails}>{addressDetails.addressArea + "," + addressDetails.landMark + "," + addressDetails.city + "," + addressDetails.district}</Text>
                    <Text style={styles.txtDetails}>{addressDetails.state + "," + addressDetails.postalCode}</Text>
                </View>

                <View
                    style={styles.addressContainer}
                >
                    <Text
                        style={styles.txtHeader}
                    >Contect</Text>
                    <Text style={styles.txtDetails}>{contactDetails.fullName}</Text>
                    <Text style={styles.txtDetails}>{contactDetails.mobileno}</Text>
                </View>

            </View>

            <View
                style={styles.productInfoContainer}
            >
                <Text style={styles.txtNumber}>
                    {data.products.length} Items
                </Text>
                <Text style={styles.txtNumber}>
                    RS {data.totalPrice}
                </Text>
            </View>

            <OrderStatusCard
                status={data.status}
            ></OrderStatusCard>
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
                alignItems: 'center',
                margin: 10,
                borderRadius: 10
            },
            txtDetails:
            {
                fontFamily: fonts.Federo_Regular
            },
            addressContainer:
            {

                flexWrap: 'wrap',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center'
            },
            addressDetailsContainer:
            {
                // borderTopWidth: 1,
                flexWrap: 'wrap',
                width: "50%",

                alignItems: 'center'
            },
            addressInfoConatiner:
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: "center"
            },
            txtHeader:
            {
                marginHorizontal: 20,
                color: "black",
                fontFamily: fonts.SpaceMono_Regular

            },
            productInfoContainer:
            {
                flexDirection: 'row',
                margin: 10,
                justifyContent: "space-evenly"
            },
            txtNumber:
            {
                fontSize: 18,
                color: "black",
                marginHorizontal: 20,

                fontFamily: fonts.Quicksand_Medium,

            }



        }
    )
export default OrderCard