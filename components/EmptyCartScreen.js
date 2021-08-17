
import React from "react";
import { Image } from "react-native";

import { View,Text } from "react-native";

import  FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";



const EmptyCartScreen=()=>
{


    return(
        <View
        style={
            {
                
                justifyContent:"center",
                alignItems:"center"
            }
        }
        >
            
            <Image
            source={require('../assets/emptyCart.jpg')}
            
            resizeMode={"cover"}
            >

            </Image>
          
        </View>

    )
}
export default EmptyCartScreen