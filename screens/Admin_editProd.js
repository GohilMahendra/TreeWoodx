import React, { useEffect } from "react";
import { View,Dimensions ,Image,Text, ScrollView} from "react-native";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";


const Admin_editProd=({navigation})=>
{


    const {height,width}=Dimensions.get('screen')

    useEffect
    (

        ()=>
        {
        firestore().collection('products').onSnapshot
        (
            (snapshot)=>
            {
                var list=[]
         
                snapshot.forEach(function(child) {
            
                    // console.log(child)
            
              
                   
                    list.push({
                        key: child.id,
                        pname:child.data().prod.pname,
                        pprice: child.data().prod.price,
                        pdisc:child.data().prod.discount,
                        pimage:child.data().prod.img1,
                        pbrand:child.data().prod.brand,
                        pstock:child.data().prod.stock,
                        pdiscount:child.data().prod.discount
                      })

                    })
                    setdata(list)
            }
            )

        },
        [data,setdata]
    )
    

    const [data,setdata]=React.useState()

    const prodBuilder=({item,index})=>
    {

        const price_after_disc=Math.floor(item.pprice-item.pprice*item.pdiscount/100)
        return(
            
            <View style={{width:width-40,margin:20,height:300,
            backgroundColor:"#fff",borderRadius:20}}>
            <View style={{height:200,justifyContent:'center',flexDirection:"row"}}>

                <Image
                source={{uri:item.pimage}}
                style={{height:150,alignItems:'center',alignSelf:'center',width:150}}
                >

                </Image>
                <View style={{flex:1,alignContent:"center",alignItems:'center',justifyContent:'center'}}>

                <Text>{item.pname}</Text>
                <View style={{flexDirection:"row"}}>
                <Text style={{textDecorationLine:"line-through",marginRight:20}}>RS {item.pprice}</Text>
                <Text>RS {price_after_disc}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{marginRight:20}}>stock {item.pstock}</Text>
                <Text>disc {item.pdiscount} %</Text>
                </View>
                </View>


            </View>
            
            <View style={{flexDirection:'row',alignSelf:"center",justifyContent:"space-evenly"}}>

            <TouchableOpacity
            
            onPress={()=>navigation.navigate('Admin_product',{item:item.key})}
            style={{height:50,margin:20,justifyContent:"center",width:width/4,backgroundColor:'blue',borderRadius:30,}}
            >

                <Text style={{textAlign:'center',color:"#fff"}} >EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity   style={{height:50,margin:20,justifyContent:"center",
            width:width/4,backgroundColor:'red',borderRadius:30,}}>
                <Text style={{textAlign:'center',color:"#fff"}}>DELETE</Text>
            </TouchableOpacity>
            </View>
            </View>
        )

    }

    return(
        <View style={{flex:1}}>
        <FlatList
        
        
        data={data}
        
        renderItem={prodBuilder}
        keyExtractor={item=>item.key}
        >

        </FlatList>
        </View>
    )
}
export default Admin_editProd