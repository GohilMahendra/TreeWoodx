import React, { useEffect } from 'react';
import { 
    View,
    Text,
    FlatList,
    TextInput
 } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import OrderCard from '../../components/Orders/OrderCard';
import { getOrders } from '../../redux/Actions/OrderActions';


const UserOrders=()=>
{

    const Orders=useSelector(state=>state.Orders.Orders)

    const dispatch=useDispatch()

    useEffect(()=>
    {
       dispatch(getOrders())
    },[])


    const itemBuilder=({item,index})=>
    {
        return(
            <TouchableOpacity
            
            >
                <OrderCard
                data={item}
                >

                </OrderCard>
            </TouchableOpacity>
        )
    }
    return(
        <View
        style={{
            flex:1,
            backgroundColor:"#fff"
        }}
        >
            <View
            style={{
                height:50,
                backgroundColor:'silver',
                margin:10,
                flexDirection:'row',
                alignItems:'center',
                borderRadius:15,
                justifyContent:"space-around"
            }}
            >
            <TextInput
            style={{

                width:'80%',
                color:"#fff"
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
                flex:1
            }}
            keyExtractor={item=>item.key}
            renderItem={itemBuilder}
            
            ></FlatList>
        </View>
    )

}
export default UserOrders