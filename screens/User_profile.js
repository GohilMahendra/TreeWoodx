
import React from "react";
import { Dimensions, ImageBackground, Text,TextInput,TouchableOpacity,View } from "react-native"
;
import { ModelView } from "react-native-3d-model-view";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
const User_profile=({navigation})=>

{

    const logout=()=>
    {
        auth().signOut()
        
        navigation.navigate("Login")

    }

    const {height,width}=Dimensions.get('screen')
    return(
    <View style={{flex:1}}>
       


       <LinearGradient
       style={{borderBottomLeftRadius:90,borderBottomRightRadius:90}}
       colors={["#ffc3a0","#ffafbd"]}
       >

        <View style={{height:height/3,width:width}}>

        
        </View>
        <View style={{alignSelf:'center',justifyContent:"center",alignItems:'center',top:height/3-50,position:"absolute",height:100,backgroundColor:'white',width:100,borderRadius:100}}>
        <Text style={{fontWeight:"bold",fontSize:30}}>{auth().currentUser.email[0]}</Text>
</View>


          </LinearGradient>
          <View style={{alignContent:'center',alignItems:'center',top:50}}>        
          <Text style={{margin:20,fontSize:30,fontWeight:'bold'}}>{auth().currentUser.displayName}</Text>
          <Text style={{fontSize:20,fontWeight:'bold'}}>{auth().currentUser.email}</Text>
        

        <TouchableOpacity style={{width:width-40,height:50,
            alignContent:'center',alignItems:'center',
            justifyContent:"center",borderRadius:30,margin:20,
            backgroundColor:'#37323E'}}>
            <Text style={{color:"#fff",fontSize:20,fontFamily:"Federo-Regular"}}>MY ORDERS</Text>
        </TouchableOpacity>
          </View>



            <TouchableOpacity
            onPress={()=>logout()}
             style={{top:100,backgroundColor:"#1C5D99",
             justifyContent:"center",alignSelf:"center",
             borderRadius:30,alignContent:"center",
             width:width/3,height:50}}>
                <Text style={{textAlign:"center",
                fontFamily:"Federo-Regular",color:'#fff',
                textAlignVertical:"center"}}>LOGOUT</Text>
            </TouchableOpacity>
           </View>
    )
}

export default User_profile