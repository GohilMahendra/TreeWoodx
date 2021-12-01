import React from "react";

import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Admin_panel from "../screens/Admin/Admin_panel";
import Admin_addSales from "../screens/Admin/AdminProfile";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Admin_editProd from "../screens/Admin/Admin_editProd";
import Admin_addOffer from "../screens/Admin/FeaturedScreen";
import FeaturedScreen from "../screens/Admin/FeaturedScreen";
import { View } from "react-native";
import { Color } from "../constants/colors";
import AdminProfile from "../screens/Admin/AdminProfile";
const bottomTab = createBottomTabNavigator();
const AdminTabNavigator = ({ navigation }) => {
  return (
    <bottomTab.Navigator


      tabBarOptions={
        {
          showLabel: false,
          keyboardHidesTabBar: true,
          style: {
            backgroundColor: 'black'
          }

        }
      }
      initialRouteName="Admin_editProd"
    >

      <bottomTab.Screen
        name={"Admin_editProd"}
        options={
          {

            tabBarLabel: 'PANEL',

            tabBarIcon: ({ size, focused, color }) =>

              <FontAwesome5 size={size} color={color} name="edit">

              </FontAwesome5>

          }

        }
        component={Admin_editProd}
      >



      </bottomTab.Screen>
      <bottomTab.Screen
        name={"Admin_panel"}
        options={
          {

            tabBarLabel: 'PANEL',

            tabBarIcon: ({ size, focused, color }) =>


              <FontAwesome5 size={size} color={color} name="chart-line">

              </FontAwesome5>

          }

        }
        component={Admin_panel}
      >
      </bottomTab.Screen>
      <bottomTab.Screen
        name={"AdminProfile"}
        component={AdminProfile}
        options={
          {

            tabBarLabel: 'Profile',

            tabBarIcon: ({ size, focused, color }) =>

              <FontAwesome5 size={size} color={color} name="user-edit">

              </FontAwesome5>

          }

        }
      >

      </bottomTab.Screen>

    </bottomTab.Navigator>
  )
}

export default AdminTabNavigator