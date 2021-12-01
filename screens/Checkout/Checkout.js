import { useNavigation, useRoute,useState } from "@react-navigation/core";
import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { View, Text, PermissionsAndroid, TextInput, Alert } from "react-native";

import { Dimensions } from "react-native";

const Checkout = () => {



  const navigation=useNavigation()

  const { height, width } = Dimensions.get('screen')
  const [addressline, setaddressline] = useState("")
  const [address, setaddress] = useState(null)

  return (


    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', position: 'relative' }}>




    </View>
  )
}

export default Checkout