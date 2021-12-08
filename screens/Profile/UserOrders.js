import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import OrderCard from '../../components/Orders/OrderCard';
import { getOrders } from '../../redux/Actions/OrderActions';


const UserOrders = () => {

    const Orders = useSelector(state => state.Orders.Orders)

    const dispatch = useDispatch()

    const [orderID,setOrderID]=useState("")
    useEffect(() => {
        dispatch(getOrders(null,orderID))
    }, [orderID])


    const itemBuilder = ({ item, index }) => {
        return (
            <TouchableOpacity

            >
                <OrderCard
                    data={item}
                >

                </OrderCard>
            </TouchableOpacity>
        )
    }
    return (
        <View
            style={styles.Container}
        >
            <View
                style={styles.searchRowContainer}
            >
                <TextInput
                value={orderID}
                onChangeText={text=>setOrderID(text)}
                    style={{

                        width: '80%',
                        color: "#fff"
                    }}
                    placeholder="Paste OrderID Here"
                    placeholderTextColor="#fff"
                >

                </TextInput>
                <FontAwesome5Icon
                    name="search"
                    size={25}
                    color="#fff"
                ></FontAwesome5Icon>
            </View>
            <FlatList
                data={Orders}
                style={{
                    flex: 1
                }}
                keyExtractor={item => item.key}
                renderItem={itemBuilder}

            ></FlatList>
        </View>
    )

}
const styles = StyleSheet.create(
    {
        Container:
        {
            flex: 1,
            backgroundColor: "#fff"
        },
        searchRowContainer:
        {
            height: 50,
            backgroundColor: 'silver',
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 15,
            justifyContent: "space-around"
        }
    }
)
export default UserOrders