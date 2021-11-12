import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native';
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";

import { FlatList } from "react-native-gesture-handler";

import { Searchbar } from 'react-native-paper';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { searchProd } from '../redux/Actions/SearchActions';
import { fonts } from '../constants/fonts';
const Search = () => {
    const navigation = useNavigation()
    const [search, setsearch] = useState("")

    const dispatch=useDispatch()
    const data=useSelector(state=>state.Search.searchResults)

    const serachBuilder = ({ item, index }) => {
        console.log(item)
        return (
            <TouchableOpacity

                onPress={
                  ()=>  navigation.navigate('Product_list',
                    
                    {search:item.pname,
                    type:'search',
                    name:item.pname
                    })
                }
                style={{ width: '100%', height: 50 }}
            >
                <View style={{ flexDirection: 'row'}}>
                    <Text
                    style={{
                        fontFamily:fonts.Federo_Regular,
                        fontSize:20
                    }}
                    >{item.pname}</Text>
                    <Text style={{ fontWeight: "bold" }}> in {item.pcat}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const emptyScreen = () => {
        return (
            <View
                style={{ flex: 1, alignItems: "center", marginTop: 250, alignSelf: 'center', justifyContent: "center" }}
            >
                <Text>NO SEARCH RESULT HERE!!</Text>

            </View>
        )
    }


        useEffect
        (
            ()=>
            {
                
                if(search!="")
                dispatch(searchProd(search))
    
            }, [search]
        )
    return (
        <View
            style={{ flex: 1 }}
        >
            <Searchbar

                autoCapitalize={"sentences"}
                value={search}

                onChangeText={(text)=>setsearch(text)}
            >

            </Searchbar>

             <FlatList
                style={{ flex: 1 }}
                data={data}
                keyExtractor={item => item.key}
                renderItem={serachBuilder}
                ListEmptyComponent={emptyScreen}

            >

            </FlatList>
      
        </View>
    )


}
export default Search