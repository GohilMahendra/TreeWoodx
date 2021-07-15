import { useRoute } from "@react-navigation/core";
import React, { useState } from "react";
import { View,Text, Dimensions} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Item } from "react-native-paper/lib/typescript/components/List/List";


const Admin_order=()=>
{

    const {height,width}=Dimensions.get('screen')


   

    const [data,setdata]=useState(
        [
            {
                orderID:'sku55155',
                price:50000,
                place:"",
                city:'',
                state:'',
                country:'',

            },
            {
                orderID:'sk855155',
                price:50500,
                place:"",
                city:'',
                state:'',
                country:'',

            }
        ]
    )

    const itemBuilder=({item,index})=>
    {
        return(
            <View style={{height:height/3}}>

                <Text>{item.orderID}</Text>
            </View>
        )
    }

    return(
        <View style={{flex:1}}>

        <FlatList
        
        
        data={data}
        renderItem={itemBuilder}

        keyExtractor={item=>item.orderID}
        
        >

        </FlatList>

            
        </View>
    )

}
export default Admin_order