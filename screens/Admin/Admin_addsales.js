import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import { fonts } from "../../constants/fonts";

const UserName = (auth().currentUser!=null) ?auth().currentUser.displayName:null
const Admin_addSales = ({ navigation }) => {


    const { height, width } = Dimensions.get('screen')
    const itemBuilder =
        ({ item, index }) => {

        }

    return (
        <View style={styles.container}>

            <View style={{
                flexDirection: 'row',
                alignItems: "center",
                height: height / 3,
                backgroundColor: '#7CB9E8'
            }}>
                <View
                    style={styles.LogoContainer}>
                    <Text style={{
                        fontSize: 25, alignSelf: 'center',
                        fontWeight: 'bold', color: '#fff'
                    }}>{UserName.substr(0, 2)}</Text>
                </View>
                <Text style={{ fontSize: 25, color: '#fff' }}>{auth().currentUser.displayName}</Text>

            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{
                    marginTop: height / 4,
                    alignSelf: "center",
                    justifyContent: "center", height: 50, width: 150,
                    backgroundColor: "#012169",
                    borderRadius: 20,
                    alignItems: 'center'
                }}>
                <Text style={{ fontSize: 25, color: '#fff' }}>LOG OUT</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create
    (
        {
            container:
            {
                flex: 1,
                backgroundColor: '#6495ED'

            },
            LogoContainer:
            {
                backgroundColor: "#13274F",
                margin: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                height: 100,
                width: 100,
                borderRadius: 100
            }

        }
    )

export default Admin_addSales