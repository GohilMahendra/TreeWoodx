

import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import { fonts } from "../../constants/fonts";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/core";
import { useState } from "react/cjs/react.development";
import FeaturedCard from "../../components/Featured/FeaturedCard";
import { prod } from "@tensorflow/tfjs-core";
import {
    Color,
    colorArrayEditer
} from "../../constants/colors";
import { AddToFeatured } from "../../redux/Actions/FeaturedActions";
const FeaturedEditer = ({ navigation }) => {


    const route = useRoute()
    const dispatch=useDispatch()

    const [theme, settheme] = useState(
        {
            gradient_color_1: "#B8E4F0",
            gradient_color_2: "#E6DDC4",
            secondary_color: "#E6DDC4",
            fontFamily: fonts.SpaceMono_Regular

        }
    )

    const addTofeatured=()=>
    {
        
        dispatch(AddToFeatured(route.params.data,theme))
    }

    const fontsRender = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={
                    () => settheme({ ...theme, fontFamily: item })
                }
            >
                <View
                    style={styles.fontContainer}
                >
                    <Text
                        style={{ marginHorizontal: 10, fontSize: 20, fontFamily: item }}
                    >{item}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const renderItem2 = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={
                    () => settheme({ ...theme, gradient_color_2: item })
                }
            >
                <View
                    style={
                        [
                            { backgroundColor: item }, styles.colorContainer
                        ]
                    }
                ></View>
            </TouchableOpacity>

        )
    }
    const renderItem3 = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={
                    () => settheme({ ...theme, secondary_color: item })
                }
            >
                <View
                    style={
                        [
                            { backgroundColor: item }, styles.colorContainer
                        ]
                    }
                ></View>
            </TouchableOpacity>
        )
    }
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => settheme({ ...theme, gradient_color_1: item })}
            >
                <View
                    style={
                        [
                            { backgroundColor: item }, styles.colorContainer
                        ]
                    }
                ></View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>

            <FeaturedCard
                data={route.params.data}
                colorTheme={theme}

            ></FeaturedCard>
            <ScrollView>
            <View>

                <Text style={styles.txtLabel}>First gradient Color</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={colorArrayEditer}
                    keyExtractor={item => item}
                    renderItem={renderItem}
                >

                </FlatList>
                <Text style={styles.txtLabel}>Second Gradient Color</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={colorArrayEditer}
                    keyExtractor={item => item}
                    renderItem={renderItem2}
                >

                </FlatList>
                <Text style={styles.txtLabel}>Font Family:</Text>
                <FlatList

                    horizontal
                    keyExtractor={item => item}
                    data={[fonts.Federo_Regular, fonts.Genos_Regular, fonts.Playball_Regular, fonts.SpaceMono_Regular]}

                    renderItem={fontsRender}
                >
                </FlatList>
                <Text style={styles.txtLabel}>Secondary Color</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={colorArrayEditer}
                    keyExtractor={item => item}
                    renderItem={renderItem3}
                >

                </FlatList>

        <TouchableOpacity
        onPress={()=>addTofeatured()}
        style={styles.btnsubmit}
        >
            <Text style={styles.txtsubmit}>SUBMIT</Text>
        </TouchableOpacity>
            </View>
        </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create
    (
        {
            colorContainer:
            {
                height: 50,
                elevation: 5,
                width: 50,
                margin: 10,
                borderRadius: 15
            },

            txtLabel:
            {

                fontSize:18,
                alignSelf:'center',
                margin:10
            },
            fontContainer:
            {
                height: 50,
                borderRadius: 15,
                elevation: 5,
                backgroundColor: '#fff',
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center'

            },
            container:
            {
                flex: 1,
                backgroundColor: "#fff"
            },
            btnsubmit: 
            {
                height:50,
                margin:20,
                borderRadius:15,
                elevation:10,
                backgroundColor:"blue",
                justifyContent:"center",
                alignItems:'center'
            },
            txtsubmit:
            {
                color:"#fff",
                fontSize:20
            }


        }
    )

export default FeaturedEditer