
import React, { useDebugValue, useEffect } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { 
    View,
    Text,
    TouchableOpacity
 } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import OrderCard from '../../components/Orders/OrderCard';
import { fonts } from '../../constants/fonts';
import { changeStatus, getMoreOrders, getOrders } from '../../redux/Actions/OrderActions';
const OrderState=()=>
{

    const orders=useSelector(state=>state.Orders.Orders)
    const orderLoading=useSelector(state=>state.Orders.orderLoading)

    const dispatch=useDispatch()

    const [orderID,setOrderID]=useState("")
    const fetchMoreOrders=()=>
    {
        dispatch(getMoreOrders("All"))
    }

    const getOrderDetails=()=>
    {
        dispatch(getOrders("All"))
    }
    useEffect
    (
        ()=>
        {
           getOrderDetails()
        },
        []
    )
 
   
    const changeOrderStatus=(status,id)=>
    {
        dispatch(changeStatus(status,id))
    }

    const renderItem=({item,index})=>
    {
        return(
            <View>
            <OrderCard
            data={item}
            >

            </OrderCard>
            <TouchableOpacity
            onPress={()=>changeOrderStatus(item.status,item.key)}
            style={styles.btnChange}
            >
                <Text style={styles.txtstatus}>Change Status</Text>
            </TouchableOpacity>
            </View>
        )

    }
  

    return(
        <View
        style={
        {
            flex:1
        }
        }
        >
            <View
            style={{
                margin:10,
                backgroundColor:"silver",
                borderRadius:10,
                height:50
            }}
            ></View>
            <FlatList
            data={orders}
            refreshControl={
                <RefreshControl
                refreshing={orderLoading}
                onRefresh={()=>getOrderDetails()}
                ></RefreshControl>
            }
            onEndReached={
                ()=>fetchMoreOrders()
            }
            renderItem={renderItem}
            keyExtractor={item=>item.key}

            
            ></FlatList>
        </View>
    )

}

const styles=StyleSheet.create
(
    {
        btnChange:  
        {
            height:50,
            backgroundColor:"green",
            elevation:5,
            alignSelf:'flex-end',
            width:'50%',
            margin:10,
            justifyContent:'center',
            alignItems:"center",
            borderRadius:15,
            
        },
        txtstatus:
        {
            fontSize:18,
            fontFamily:fonts.Genos_Regular,
            color:'#fff'
        },
    
    }
)
export default OrderState