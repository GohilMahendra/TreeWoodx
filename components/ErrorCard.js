import React from 'react';

import { 
    View,
    Text
 } from "react-native";


const ErrorCard=({error=""})=>
{

    return(

        <View
        style={{
            height:50,
            zIndex:5,
            backgroundColor:'red',
            justifyContent:'center',
            alignItems:'center',
            padding:10,
            borderRadius:15,
            margin:10
        }}
        >
            <Text style={{color:'#fff'}}>{error}</Text>
        </View>

    )
}

export default ErrorCard