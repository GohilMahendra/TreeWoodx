import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AdminTabNavigator from "../../navigation/AdminTabNavigator";
import auth from "@react-native-firebase/auth";
const Admin=({navigation})=>
{

  useEffect(
    ()=>
    {

      if(auth().currentUser==null)
      {
        navigation.pop()
      }
    },
    []
  )
    return(
        
      <AdminTabNavigator></AdminTabNavigator>
    )
}

export default Admin