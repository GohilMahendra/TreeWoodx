
import React from "react";
import { Image,StyleSheet } from "react-native";

import { View,Text } from "react-native";

import  FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";



const EmptyCartScreen=()=>
{


    return(
        <View
        style={
          styles.Container
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

const styles=StyleSheet.create
(
    {
        Container:
        {
                
            justifyContent:"center",
            alignItems:"center",
            flex:1
        }
    }
)
export default EmptyCartScreen