
import React,{useEffect, useState} from "react";
import { TextInput } from "react-native";
import { View ,Text, FlatList, Dimensions} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FeaturedCard from "../components/FeaturedCard";
import { Featured } from "../data/Featured";
import {  
    RadioButton, useTheme
} from "react-native-paper";
import { useRoute } from "@react-navigation/native";


import Featureddata from "../constants/FeaturedCard.json";
import { ImageBackground } from "react-native";
const Admin_features_edit=()=>
{

    const [offerOn,setOfferOn]=useState('price')



    const [index,setindex]=useState(0)
    
    const route=useRoute()
    const item=route.params.item
    

    const [headline,setheadline]=useState('Enter headline Here !!!')
   

    useEffect
    (
        ()=>
        {
    const changeData=()=>
    {
 

        console.log(index)
        console.log(Featureddata[index].background_color_2)
        setdata({...data,
          
            
            font_headline_color:Featureddata[index].font_headline_color,
            font_brand_color:Featureddata[index].font_brand_color,
            font_focus_color:Featureddata[index].font_focus_color,
            font_headline_fontstyle:Featureddata[index].font_headline_fontstyle,
            font_brand_fontstyle:Featureddata[index].font_brand_fontstyle,
            font_focus_fontstyle:Featureddata[index].font_focus_fontstyle,
            background_color:Featureddata[index].background_color,
            background_color_2:Featureddata[index].background_color_2,
            imageleftRadios:Featureddata[index].imageleftRadios,
              imageRIghtRadios:Featureddata[index].imageRIghtRadios,
              imageopacity:Featureddata[index].imageopacity
       
           
         
        })

    
        
    }
    changeData()
    },
    [index]
    )
   
    const [data,setdata]=useState(
       { 
        key: item.key,
        pbrand: item.pbrand,
         pdisc: item.pdisc, 
        
          pimage: item.pimage, 
          pname: item.pname, 
          pprice: item.pprice, 
          headline:'Get exiting deals ON',
          focus:'discount',
          font_headline_color:Featureddata[0].font_headline_color,
          font_brand_color:Featureddata[0].font_brand_color,
          font_focus_color:Featureddata[0].font_focus_color,
          font_headline_fontstyle:Featureddata[0].font_headline_fontstyle,
          font_brand_fontstyle:Featureddata[0].font_brand_fontstyle,
          font_focus_fontstyle:Featureddata[0].font_focus_fontstyle,
          background_color:Featureddata[0].background_color,
          background_color_2:Featureddata[0].background_color_2,
          imageleftRadios:Featureddata[0].imageleftRadios,
            imageRIghtRadios:Featureddata[0].imageRIghtRadios,
            imageopacity:Featureddata[0].imageopacity


    }
    )

   
        const changeHeadLine=(value)=>
    {
        setdata({...data,headline:value})
    }
   
    const itembuilder=({item,index})=>
    {
        return(

            <TouchableOpacity
            onPress={
                ()=>setindex(index)
                    
            }
            >
            <View
            style={
                {
                    marginHorizontal:20,
                    backgroundColor:"black",
                    height:50,
                    width:100,
                    alignItems:'center',
                    justifyContent:"center"
                }
            }
            >
                <Text
                style={
                    {
                        color:"#fff"
                    }
                }
                >{item.name}</Text>
            </View>
            </TouchableOpacity>
        )
    }
    return(
        
        <View
        style={
            {

                flex:1
            }}
        
        >
            <FeaturedCard
            
            
            data={data}
            
            >

            </FeaturedCard>

            <TextInput

            onChangeText={value=>changeHeadLine(value)}

            placeholder="Enter HEADLINE"
            style={
                {
                    alignItems:'center',
                    textAlign:'center',
                    borderWidth:0.5,
                    margin:20
                }
            }
            
            >

            </TextInput>
        
        <View
        style={
            {
                flexDirection:'row',
                justifyContent:"space-evenly"
            }
        }
        >
     
        <TouchableOpacity
        style={
            {
                backgroundColor:data.focus=='price'?"black":'#fff',
                
                margin:10,
                
                
            }
        }


        onPress=
        {()=> setdata({...data,focus:'price'})}
      
        >
            <Text
            style
            ={
            {
                margin:20,
                color:data.focus?'#fff':'black'
            }
            }
            >ON PRICE</Text>
        </TouchableOpacity>
        <TouchableOpacity
        
        >
           
        </TouchableOpacity>
        <TouchableOpacity
        style={
            {
                backgroundColor:"black",
                margin:10
                
            }
        }
        
       
        onPress=
        {()=> setdata({...data,focus:'discount'})}
        
        >
            <Text
            style
            ={
            {
                margin:20,
                color:data.focus?'#fff':'black'
            }
            }
            >ON PRICE</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            
        </TouchableOpacity>
        </View>
            <FlatList
            horizontal
            data={Featured}
            renderItem={itembuilder}
            keyExtractor={(item,index)=>item.id.toString()}
            >

            </FlatList>

       
        </View>
    )

}
export default Admin_features_edit