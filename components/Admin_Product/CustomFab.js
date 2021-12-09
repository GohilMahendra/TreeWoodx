import React from "react";
import { useState } from "react";
import { ShadowPropTypesIOS } from "react-native";
import {
    View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Dimensions, TextInput, ScrollView, ActivityIndicator

} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const CustomFab = (props) => {

    const { navigation } = props

    const ToggleShow = () => {
        setshow(!show)
    }


    const [show, setshow] = useState(false)
    return (

        <View

        >
            {
                show &&

                <View

                    style={[styles.FabContainer, { bottom: 170, right: 10 }]}

               >
                    <Text
                        style={styles.txtLabel}
                    >
                        ADD PRODUCT
                    </Text>
                    <TouchableOpacity
                        style={styles.btnFab}

                        onPress={

                            () => navigation.navigate(
                                'Admin_product'
                            )
                        }

                    >
                        <FontAwesome5Icon
                            name="shopping-bag"
                            color="#fff"
                            size={30}

                        >

                        </FontAwesome5Icon>

                    </TouchableOpacity>
                </View>
            }

            {show &&
                <View

                    style={[styles.FabContainer, { bottom: 90, right: 10, }]}

                >
                    <Text
                        style={styles.txtLabel}
                    >
                      FEATURED LIST
                    </Text>
                    <TouchableOpacity
                       onPress={

                        () => navigation.navigate(
                            'FeaturedList'
                        )
                    }
                        style={styles.btnFab}
                    >
                        <View>
                            <FontAwesome5Icon
                                name="shopping-basket"
                                color="#fff"
                                size={30}
                            >
                            </FontAwesome5Icon>

                        </View>
                    </TouchableOpacity>
                </View>
            }
            <TouchableOpacity
                style={styles.btnToggle}

                onPress={() => ToggleShow()}
            >
                {show
                    ?
                    <Text
                        style={
                            {
                                color: '#fff'
                            }
                        }
                    >
                        X
                    </Text>
                    :
                    <FontAwesome5Icon
                        name="plus"
                        color="#fff"

                    >
                    </FontAwesome5Icon>
                }
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create
    (
        {
            FabContainer:
            {
                position: "absolute",

                flexDirection: 'row',
                alignItems: 'center',
                elevation:15,

            },
            btnToggle:

            {
                height: 70,
                width: 70,
                borderRadius: 50,
                elevation:15,
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: 'black',
                alignItems: "center",
                justifyContent: "center"

            },
            txtLabel:

            {
                marginHorizontal: 10,
                padding: 10,
                elevation:10,
                borderRadius: 20,
                backgroundColor: 'black',
                color: "#fff"
            },
            btnFab:
            {
                height: 70,
                width: 70,
                elevation:15,
                borderRadius: 50,

                backgroundColor: 'black',
                alignItems: "center",
                justifyContent: "center"

            }

        }
    )
export default CustomFab