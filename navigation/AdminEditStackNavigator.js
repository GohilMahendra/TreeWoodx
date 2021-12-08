
import React, { useEffect } from "react";
import Admin_ProductScreen from "../screens/Admin/Admin_ProductScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Admin_product from "../screens/Admin/Admin_product";
import FeaturedList from "../screens/Admin/FeaturedList";
import FeaturedEditer from "../screens/Admin/FeaturedEditer";
import AdminSearch from "../screens/Admin/AdminSearch";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

const AdminEditStackNavigator = () => {

    const editNaviagter = createStackNavigator()

    const navigation=useNavigation()
    return (

        <editNaviagter.Navigator>

            <editNaviagter.Screen
                options={
                    {
                        headerTransparent:false,
                        headerTitle:"Product List",
                        headerTitleAlign:'center',
                        headerRight:()=>(
                            <TouchableOpacity
                            onPress={()=>navigation.navigate("AdminSearch")}
                            >
                            <FontAwesome5Icon
                            name="search"
                            size={20}
                            style={{
                                marginHorizontal:20
                            }}
                            
                            ></FontAwesome5Icon>
                            </TouchableOpacity>
                        )
                    }
                }
                name="Admin_ProductScreen"
                component={Admin_ProductScreen}

            
            >
            </editNaviagter.Screen>

            
            <editNaviagter.Screen
                options={
                    {
                        headerShown: false
                    }
                }
                name="AdminSearch"
                component={AdminSearch}
            >
            </editNaviagter.Screen>

            <editNaviagter.Screen
                name="Admin_product"
                options={
                    {
                        headerTitle:"",
                        headerTransparent:true
                    }
                }
                component={Admin_product}
            >
            </editNaviagter.Screen>

            <editNaviagter.Screen
                name="FeaturedList"
                component={FeaturedList}
            ></editNaviagter.Screen>

            <editNaviagter.Screen
                name="FeaturedEditer"
                component={FeaturedEditer}
            ></editNaviagter.Screen>


        </editNaviagter.Navigator>
    )
}

export default AdminEditStackNavigator