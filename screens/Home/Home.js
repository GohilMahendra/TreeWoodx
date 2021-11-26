import React, { useEffect } from "react";
import HomeTabNavigator from "../../navigation/HomeTabNavigator";

import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/core";

 const Home=()=>
 {


    const navigation=useNavigation()
    useEffect
    (
        ()=>
        {
            if(auth().currentUser.uid==null)
            {
                
                navigation.pop()
            }

        },
        []
    )
     return(
      
         
     <HomeTabNavigator>

     </HomeTabNavigator>

     )
 }

 export default Home