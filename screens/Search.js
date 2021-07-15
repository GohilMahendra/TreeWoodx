import React ,{useState,useEffect}from 'react'
import { Dimensions } from 'react-native';
import {View,Text,Image ,TouchableOpacity,TextInput } from "react-native";

import { FlatList } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import { TextInputBase } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import { fonts } from "../constants/fonts";
const Search=({naviagtion})=>
{
    const {height,width}=Dimensions.get('screen')
    const [search,setsearch]=useState('')

    const [data,setData]=useState()


    const [display,setdisplay]=useState("")

    const serachBuilder=({item,index})=>
    {
        console.log(item)
        return(
           <TouchableOpacity
           onPress={()=>setdisplay(item)}
           style={{width:'100%',height:50}}
           >
               <View style={{flexDirection:'row'}}>
               <Text>{item.pname}</Text>
               <Text style={{fontWeight:"bold"}}> in {item.pbrand}</Text>
               </View>
           </TouchableOpacity>
        )
    }

    const emptyScreen=()=>
    {
        return(
            <View
            style={{flex:1,alignItems:"center",marginTop:250,alignSelf:'center',justifyContent:"center"}}
            >
                <Text>NO SEARCH RESULT HERE!!</Text>

            </View>
        )
    }
    useEffect
    (
        ()=>{


            if(search=="")
            return
            const ser=firestore().collection('products').orderBy("prod.pname").startAt(search).endAt(search + "\\uf8ff")
            ser.onSnapshot(
                (snapshot)=> {

                    
                    //console.log(snapshot)
                var list=[]
             
                snapshot.forEach(function(child) {
            
             
                    console.log(child.data())
                   
                    list.push({
                       
                        pid:child.id,
                        pname:child.data().prod.pname,
                        pbrand:child.data().prod.brand,
                        pcat:child.data().prod.cat,

                        pprice:child.data().prod.price,
                        psubcat:child.data().prod.sub_cat,
                        pmaterial:child.data().prod.material,
                        pdiscount:child.data().prod.discount,
                        pimage:child.data().prod.img1
                     
                      })
                }
                );
                list.reverse()
               list=Array.from(new Set(list))
                setData(list)



            })
            return ser
        },[search]
    )
    return(
        <View
        style={{flex:1}}
        >
            <Searchbar
         
            autoCapitalize={"sentences"}
            value={search}
            
            onChangeText={setsearch}
            >

            </Searchbar>
            
            <TextInput

            autoCapitalize={"words"}
            
            disa
            style={{height:100,backgroundColor:"pink"}}
            >

            </TextInput>
            <FlatList
            style={{flex:1}}
            data={data}
            keyExtractor={item=>item.pid}
            renderItem={serachBuilder}
            ListEmptyComponent={emptyScreen}
            
            >

            </FlatList>
           {(display!=undefined && display!="") && <View style={{marginHorizontal:20,height:200}}>

                <View style={{flex:1,backgroundColor:'#fff',borderRadius:20,flexDirection:"row"}}>
                <Image
                style={{height:'90%',marginHorizontal:10,alignSelf:"center",width:'50%',borderRadius:30}}
                   source={{uri:display.pimage}}

                >

                </Image>
                <View>
                    <Text 
                    
                    style={{fontFamily:fonts.Quicksand_Medium}}>{display.pname}</Text>
                    <Text style={{textAlign:'center',fontFamily:"Merienda-Regular",marginHorizontal:10,borderRadius:20,backgroundColor:"green"}}>{display.pdiscount} %OFF</Text>
                    <Text style={{fontSize:30,color:'grey',fontFamily:"Federo-Regular"}}>{display.pbrand}</Text>
                    <Text style={{fontFamily:fonts.Merienda_Regular}}>RS .{display.pprice-(display.pprice*display.pdiscount/100)}</Text>
                </View>
                </View>
            </View>}
        </View>
    )


}
export default Search