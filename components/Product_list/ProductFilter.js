
import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import {
    color,
    Material,
    categories,
    priceRange,
    discountRange
} from "../../constants/categories";
import { fonts } from "../../constants/fonts";
const ProductFilter = ({ filters, onPress, hideModel }) => {

    const [filter, setfilter] = useState(filters)

    const applyFilters = () => {


        onPress(filter)
        hideModel()

    }
    const resetFilters = () => {
        onPress({
            material: "",
            priceRange: "",
            cat: "",
            search:filters.search,
            brand:filters.brand,
            color: "",
            discountRange: "",
        })
        hideModel()
    }


    return (
        <View

            style={
                {
                    alignItems: 'center'
                }
            }
        >
            <Text
                style={
                    {
                        fontSize: 25,
                        fontFamily: fonts.SpaceMono_Regular
                    }
                }
            >FILTERS</Text>
            <TouchableOpacity
            onPress={()=>hideModel()}
            style={
                {
                    position:'absolute',
                    top:5,
                    elevation:20,
                    height:50,
                    borderRadius:15,
                    width:50,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:"#fff",
                  
                    right:5,
                }
            }
            ><Text style={styles.txtLabel}>X</Text>
            </TouchableOpacity>
            <ScrollView>
                <Text style={styles.txtLabel}>Material</Text>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    {
                        Material.map(
                            item => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => item===filter.material?setfilter({ ...filter, material: "" }):
                                        setfilter({ ...filter, material:item })}
                                        key={item}
                                        style={
                                            {
                                                backgroundColor: (item === filter.material) ? 'blue' : "#fff",
                                                elevation: 10,
                                                margin: 10,
                                                padding: 10,
                                                borderRadius: 5
                                            }
                                        }
                                    >
                                        <Text style={{ color: (item === filter.material) ? "#fff" : 'black' }}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        )
                    }
                </ScrollView>
                <Text style={styles.txtLabel}>Color</Text>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    {
                        color.map(
                            item => {
                                return (
                                    <TouchableOpacity
                                    onPress={() => item===filter.color?setfilter({ ...filter, color: "" }):
                                    setfilter({ ...filter, color:item })}
                                        key={item}
                                        style={
                                            {
                                                elevation: 10,
                                                margin: 10,

                                                padding: 10,
                                                height: 60,
                                                width: 60,
                                                borderRadius: (filter.color === item) ? 30 : 10,
                                                backgroundColor: (item != 'multi' && item != 'other') ? item : '#fff'
                                            }
                                        }
                                    >
                                        {
                                            (item == 'multi' || item == "other") &&
                                            <Text>{item}</Text>
                                        }

                                    </TouchableOpacity>
                                )
                            }
                        )
                    }
                </ScrollView>
                <Text style={styles.txtLabel}>PRICE RANGE</Text>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    {
                        priceRange.map(
                            item => {
                                return (
                                    <TouchableOpacity
                                    onPress={() => item===filter.priceRange?setfilter({ ...filter, priceRange: "" }):
                                    setfilter({ ...filter, priceRange:item })}
                                      key={item}
                                        style={
                                            {
                                                //  backgroundColor:'#fff',
                                                elevation: 10,
                                                margin: 10,
                                                backgroundColor: (item === filter.priceRange) ? 'blue' : "#fff",
                                                padding: 10,
                                                borderRadius: 5
                                            }
                                        }
                                    >
                                        <Text style={{ color: (item === filter.priceRange) ? "#fff" : 'black' }}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        )
                    }
                </ScrollView>
                <Text style={styles.txtLabel}>category</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        categories.map(
                            item => {
                                return (
                                    <TouchableOpacity
                                    onPress={() => item===filter.cat?setfilter({ ...filter, cat: "" }):
                                    setfilter({ ...filter, cat:item })}
                                   
                                        key={item}
                                        style={
                                            {
                                                backgroundColor: (item === filter.cat) ? 'blue' : "#fff",
                                                elevation: 10,
                                                margin: 10,
                                                padding: 10,
                                                borderRadius: 5
                                            }
                                        }
                                    >
                                        <Text style={{ color: (item === filter.cat) ? "#fff" : 'black' }}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        )
                    }
                </ScrollView>
                <Text style={styles.txtLabel}>Discount</Text>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    {
                        discountRange.map(
                            item => {
                                return (
                                    <TouchableOpacity
                                    onPress={() => item===filter.discountRange?setfilter({ ...filter,discountRange: "" }):
                                    setfilter({ ...filter, discountRange:item })}
                                     key={item}
                                        style={
                                            {
                                                backgroundColor: (item === filter.discountRange) ? 'blue' : "#fff",
                                                elevation: 10,
                                                margin: 10,
                                                padding: 10,
                                                borderRadius: 5
                                            }
                                        }
                                    >
                                        <Text style={{ color: (item === filter.discountRange) ? "#fff" : 'black' }}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        )
                    }
                </ScrollView>

                <View

                    style={
                        {
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }
                    }>

                    <TouchableOpacity
                        onPress={() => applyFilters()}
                        style={
                            {
                                height: 50,
                                padding: 10,
                                backgroundColor: "blue",
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 20,
                                elevation: 15,
                                borderRadius: 10
                            }
                        }
                    >
                        <Text
                            style={
                                {
                                    color: "#fff",

                                }
                            }
                        >APPLY FILTERS</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => resetFilters()}
                        style={
                            {
                                height: 50,
                                padding: 10,
                                backgroundColor: "#fff",
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 20,
                                elevation: 15,
                                borderRadius: 10
                            }
                        }
                    >
                        <Text

                        >RESET FILTERS</Text>

                    </TouchableOpacity>
                </View>


            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create
    (
        {
            txtLabel:
            {
                alignSelf: 'center',
                fontSize: 20,
                fontFamily: fonts.Federo_Regular
            }
        }
    )
export default ProductFilter