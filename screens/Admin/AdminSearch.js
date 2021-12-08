import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { fonts } from "../../constants/fonts";
import { searchProd } from '../../redux/Actions/SearchActions';
const AdminSearch = ({ navigation }) => {

    const dispatch = useDispatch()
    const [search, setsearch] = useState("")

    const data = useSelector(state => state.Search.searchResults)
    useEffect(
        () => {

         //   console.log("search", search)
            if (search != "") {
                dispatch(searchProd(search))

            }

        },
        [search]
    )

    const itemBuilder = ({ item, index }) => {
    //    console.log(item)
        return (
            <TouchableOpacity

                onPress={
                    () => navigation.navigate('Admin_ProductScreen',

                        {
                            search: item.pname,
                            name: item.pname != undefined ? item.pname : item.pbrand,
                            brand: item.pbrand
                        })
                }
                style={{ width: '100%', height: 50 }}
            >
                <View style={{ flexDirection: 'row' }}>
                    {item.pname != undefined ? <Text
                        style={{
                            fontFamily: fonts.Federo_Regular,
                            fontSize: 20
                        }}
                    >{item.pname}</Text>

                        :
                        <Text
                            style={{
                                fontFamily: fonts.Federo_Regular,
                                fontSize: 20
                            }}
                        >{item.pbrand}</Text>
                    }
                    <Text style={{ fontWeight: "bold" }}> in {item.pbrand}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View
            style={styles.Container} >

            <View
                style={styles.InputContainer}
            >
                <TextInput

                    value={search}
                    onChangeText={text => setsearch(text)}
                    style={styles.txtInputeSearch}
                />
                <FontAwesome5Icon
                    name="search"
                    size={25}

                ></FontAwesome5Icon>
            </View>
            <FlatList

                style={styles.listContainer}
                data={data}
                renderItem={itemBuilder}
                keyExtractor={item => item.key}

            >

            </FlatList>
        </View>
    )
}


const styles = StyleSheet.create
    (
        {
            Container:
            {
                flex: 1
            },
            InputContainer:
            {
                flexDirection: 'row',
                height: 50,
                marginHorizontal: 20,
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'silver'

            },
            txtInputeSearch:
            {
                width: '80%',
                height: '100%'
            },
            listContainer:
            {
                flex: 1
            }

        }
    )

export default AdminSearch