/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import { View,Text } from "react-native";
 import { Provider } from 'react-redux';
 import store from './redux/store/store';
import RootStackNavigator from './navigation/RootStackNavigater';


const App=()=>
{


  return(

 
    <Provider store={store}>

      <RootStackNavigator>
      </RootStackNavigator>

    </Provider>
  
  )
  
}
export default App;
