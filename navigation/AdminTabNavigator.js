import React from "react";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Admin_editProd from "../screens/Admin/Admin_editProd";
import AdminProfile from "../screens/Admin/AdminProfile";
import OrderState from "../screens/Admin/OrderState";
import AdminPofileStackNavigator from "./AdminPofileStackNavigator";

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
        name={"OrderState"}
        options={
          {

            tabBarIcon: ({ size, focused, color }) =>
              <FontAwesome5 size={size} color={color} name="chart-line">
              </FontAwesome5>
          }

        }
        component={OrderState}
      >
      </bottomTab.Screen>

      <bottomTab.Screen
        name={"AdminPofileStackNavigator"}
        component={AdminPofileStackNavigator}
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