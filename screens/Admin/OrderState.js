
import React, { useDebugValue, useEffect } from 'react';
import { RefreshControl, StyleSheet, TextInput } from 'react-native';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import OrderCard from '../../components/Orders/OrderCard';
import { fonts } from '../../constants/fonts';
import { changeStatus, getMoreOrders, getOrders } from '../../redux/Actions/OrderActions';
const OrderState = () => {

    const orders = useSelector(state => state.Orders.Orders)
    const orderLoading = useSelector(state => state.Orders.loadOrdersLoading)

    const dispatch = useDispatch()

    const [orderID, setOrderID] = useState("")
    const fetchMoreOrders = () => {
        dispatch(getMoreOrders("All"))
    }

    const getOrderDetails = () => {
        dispatch(getOrders("All", orderID))
    }
    useEffect
        (
            () => {
                getOrderDetails()
            },
            []
        )


    const changeOrderStatus = (status, id) => {
        dispatch(changeStatus(status, id))
    }

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <OrderCard
                    data={item}
                >

                </OrderCard>
                <TouchableOpacity
                    onPress={() => changeOrderStatus(item.status, item.key)}
                    style={styles.btnChange}
                >
                    <Text style={styles.txtstatus}>Change Status</Text>
                </TouchableOpacity>
            </View>
        )

    }


    return (
        <View
            style={styles.Container}
        >
            <View
                style={styles.inputContainer}
            >
                <TextInput
                placeholder="Paste Order ID HERE..."
                    placeholderTextColor="#fff"
                    style={styles.txtInput}
                    value={orderID}
                    onChangeText={text => setOrderID(text)}
                />

                <FontAwesome5Icon
                    name="search"
                    size={25}
                    color="#fff"
                ></FontAwesome5Icon>

            </View>

            <FlatList
                data={orders}
                refreshControl={
                    <RefreshControl
                        refreshing={orderLoading}
                        onRefresh={() => getOrderDetails()}
                    ></RefreshControl>
                }
                onEndReached={
                    () => fetchMoreOrders()
                }
                renderItem={renderItem}
                keyExtractor={item => item.key}


            ></FlatList>
        </View>
    )

}

const styles = StyleSheet.create
    (
        {
            btnChange:
            {
                height: 50,
                backgroundColor: "green",
                elevation: 5,
                alignSelf: 'flex-end',
                width: '50%',
                margin: 10,
                justifyContent: 'center',
                alignItems: "center",
                borderRadius: 15,

            },
            txtstatus:
            {
                fontSize: 18,
                fontFamily: fonts.Genos_Regular,
                color: '#fff'
            },
            Container:
            {
                flex: 1
            },
            inputContainer:
            {
                margin: 10,
                backgroundColor: "silver",
                borderRadius: 10,
                height: 50,
                flexDirection: 'row',

                justifyContent: 'center',
                alignItems: "center"
            },
            txtInput:
            {
                width: "80%"
            }



        }
    )
export default OrderState