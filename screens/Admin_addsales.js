import React from "react";
import { View ,Text, FlatList, Dimensions} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Admin_addSales=({navigation})=>
{

    
    const {height,width}=Dimensions.get('screen')
    const itemBuilder=
    ({item,index})=>
    {

    }

    return(
        <View style={{flex:1}}>
           
         <View style={{flexDirection:'row',alignItems:"center",height:height/3,backgroundColor:'gray'}}>
        <View style={{backgroundColor:"#4C8577",margin:10,justifyContent:'center',alignSelf:'center',height:100,width:100,borderRadius:100}}>
        <Text style={{fontSize:25,alignSelf:'center',fontWeight:'bold',color:'#fff'}}>M</Text>
        </View>
        <Text style={{fontSize:25,color:'#fff'}}>Mahendra Gohil</Text>

         </View>

         <TouchableOpacity
         onPress={()=>navigation.navigate("Login")}
         style={{marginTop:height/4,alignSelf:"center",justifyContent:"center",height:50,width:150,
         backgroundColor:"#BD4089",borderRadius:20,alignItems:'center'}}>
             <Text style={{fontSize:25,color:'#fff'}}>LOG OUT</Text>
         </TouchableOpacity>
          </View>
    )
}
export default Admin_addSales