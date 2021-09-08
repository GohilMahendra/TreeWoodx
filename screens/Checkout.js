import { useRoute } from "@react-navigation/core";
import React,{useEffect, useRef,useMemo,useCallback} from "react";
import {View,Text,PermissionsAndroid, TextInput, Alert } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useState } from "react/cjs/react.development";
import MapboxGL from "@react-native-mapbox-gl/maps";
import axios from "axios";
import { Dimensions } from "react-native";
import { Marker } from "react-native-svg";
import { Searchbar } from "react-native-paper";

const Checkout=({navigation})=>
{



  const anonationref=useRef()

  const {height,width}=Dimensions.get('screen')
  const [search,setserach]=useState("")
  const [long,setlong]=useState(23.0225)
  const [lat,setlat]=useState(72.5714)
  const [res,setres]=useState({})

  const [pincode,setpincode]=useState("")
  const [addressline,setaddressline]=useState("")



  const [address,setaddress]=useState(null)

  const [showSearchList,setshowSearchList]=useState(false)

  const [permissionLocation,setpermissionLocation]=useState(false)


  useEffect
(()=>{
  PermissionsAndroid.requestMultiple(
    [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
    {
        title: 'Give Location Permission',
    message: 'App needs location permission to find your position.'
}
).then(granted => {
console.log(granted);

setpermissionLocation(true)


}).catch(err => {
console.warn(err);
});
})
   
  MapboxGL.setAccessToken("pk.eyJ1IjoibWFoZW5kcmFnb2hpbCIsImEiOiJja3EwZnV0Ym8wNGNzMndwaGZqZnB2aWJiIn0.hUfo_Ii9qcCmUzNekkLs3Q");


   var item=[]
  
  

   const getPincode=async(name)=>
   {

    const pincode=await axios.get(`https://api.postalpincode.in/postoffice/${name}`)


    if(pincode.data[0].PostOffice==null)
    {
    alert("Enable to locate pincode please enter Manually")
    return
    }

    setpincode(pincode.data[0].PostOffice[0].Pincode)
   }

   const changeLocation=(item)=>
   {

    setshowSearchList(false)
    console.log(item.place_name+'item')
    setserach(item.place_name)
   
    //  console.log(item.geomatry+'geo')

    const latitute=item.geometry.coordinates[0]
    const longitude=item.geometry.coordinates[1]

    setlong(longitude)
    setlat(latitute)
   }
   const itemLoader=({item,index})=>
   {
    //  console.log(JSON.stringify(item)+"item")

    return(
     <TouchableOpacity style={{marginHorizontal:20,height:50,marginVertical:10}}
     
     onPress={()=>{changeLocation(item),setaddress(item)}}
     >
       <Text>{item.place_name}</Text>
     
     </TouchableOpacity>
    )

   }
   const cameraRef=useRef()

   const ShowFlatlist=()=>
   {
    setshowSearchList(true)
   }
   const setQuary=(text)=>
   {
     
     setserach(text)
   }


   const coordinateSearch=async(long,lat)=>
   {
     try
     {

        const details=await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI([long,lat])+'.json?access_token=pk.eyJ1IjoibWFoZW5kcmFnb2hpbCIsImEiOiJja3EwZnV0Ym8wNGNzMndwaGZqZnB2aWJiIn0.hUfo_Ii9qcCmUzNekkLs3Q&autocomplete=true&country=in')
         
        if(details!="" && details!=undefined)
        return details
      }
     catch(err)
     {
       console.log(err)
    }
   }
  
  
 
   const showMessege=async()=>
   {

  
    //  const coord=anonationref.current.props.coordinate
     
    //  const data=await coordinateSearch(coord[0],coord[1])

    
    // 
     

   }
   const getMapdata=async()=>
   {

    //const place=search


    if(search=="")
    return

    try
    {
    const res=await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(search)+'.json?access_token=pk.eyJ1IjoibWFoZW5kcmFnb2hpbCIsImEiOiJja3EwZnV0Ym8wNGNzMndwaGZqZnB2aWJiIn0.hUfo_Ii9qcCmUzNekkLs3Q&autocomplete=true&country=in')
     
      setres(res.data.features)
     //  console.log(res)

    }
    catch(err)
    {
      console.log(err)
    }
       



   }


   useEffect
   (

    ()=>
    {
    // cameraRef.current.}
  }
    ,[]
   )

   
   useEffect
   (
     ()=>
     {
     getMapdata()}
     ,[search]
   )
   const gopay=()=>
  {
    
 

    if(pincode=="" || address==null)
    {
    alert((pincode=="")?"pincode is not valid/null":"Address is not provided")
    return
    }


    let add={}
    
    address.context.map(
      (addressx)=>
      {
     
        add[addressx.id.split(".")[0]]=addressx.text
   
      }
    )
 
    const AddressDetails={

     AddressLine:addressline,pincode:pincode,address:add
    }


    console.log(AddressDetails)

    navigation.navigate("Payment",{address:AddressDetails})
  }
  const [add,setadd]=useState(
    {
      area:'',
      city:'',
      state:'',
      pincode:''
    }
  )
    return(

    
        <View style={{flex:1,backgroundColor:'white',justifyContent:'center',position:'relative'}}>
  

      <Searchbar
   

      onTouchStart={()=>ShowFlatlist()}
      value={search}
      style={{height:50,margin:0,backgroundColor:"#fff"}}
      onChangeText={text=>setQuary(text)}
      >

      </Searchbar>

      

     <View
     style={
       {
         flex:1
       }
     }
     >
    
        <MapboxGL.MapView
        style={{flex:1}}
  

        styleURL={MapboxGL.StyleURL.Street}
        surfaceView={false}

        logoEnable={true}

        
        userTrackingMode={MapboxGL.UserTrackingModes.FollowWithHeading}
        zoomEnabled={true}
        
        focusable={true}
      
        


        >
       

            <MapboxGL.PointAnnotation 
            
          
            ref={anonationref}

         
            id="market settle up"
            title="hotel"
          

            onSelected={()=>showMessege()}
            draggable={false}
            coordinate={[lat,long]}
            />
            
            

             <MapboxGL.Camera
         // followUserLocation={true}




          centerCoordinate={[lat,long]}
          ref={cameraRef}


          
        
          
        
          animationMode="flyTo"
         // ref={loc=>console.log(loc)}
          zoomLevel={15}
          
          followZoomLevel={15}
          
          
          >
      <MapboxGL.UserLocation
         
         animated={true}
        //  ref={(location) => {console.log(location)}} 
         showsUserHeadingIndicator={true}
         visible={true}
        
         renderMode="normal"
         
         
         androidRenderMode="normal"
        // zoom={18}
          >
           
            </MapboxGL.UserLocation> 
            
          </MapboxGL.Camera>
        

        </MapboxGL.MapView>
        </View>
      
        {showSearchList &&


          
          <View
          style={
            {
              top:50,
              backgroundColor:"#fff",
              width:"100%",
              position:"absolute",
             
            }
          }
          >
          <FlatList
          data={res}
          keyExtractor={res.id}
          renderItem={itemLoader}
          style={
            {
            flex:1

            
            }
          }
          >

          </FlatList>
          </View>


          }
     
      
       
        <View
            style={
              {
                position:"absolute",
                backgroundColor:"#007FFF",
                height:70,
                width:70,
                borderRadius:70,
                right:10,
                bottom:50
              
              }
            }
            >
              <TouchableOpacity
              style=
              {
                {
                  height:70,
                  width:70,
                  borderRadius:70,
                  alignItems:'center',
                  justifyContent:"center"
                }
              }
              >
            <FontAwesome5Icon
            name="location-arrow"
            size={35}
            color="#fff"
            >

            </FontAwesome5Icon>
          </TouchableOpacity>
            </View>



            {address!=null

&&
        <View
        style={
          {
            position:'absolute',
            backgroundColor:'#fff',
            alignSelf:"center",
            
            width:width-40,
            bottom:50,
            borderRadius:30

          }
        }
        >
        
        <TouchableOpacity
        onPress={()=>{setaddress(null),setpincode("")}}
        >
         <Text
         style=
         {
          {
            textAlign:"right",
            margin:20
          }
         }
         >
           X
           </Text>
           </TouchableOpacity>
           
          <Text>ADDRESS LINE </Text>
          <TextInput
       
       
         value={addressline}
         onChangeText={text=>setaddressline(text)}

          multiline={true}
          style={
            {
              borderWidth:0.5,
              margin:10
            }

          }
          >

          </TextInput>

          <Text>Address</Text>
          <View
          style={
            {
              flexDirection:"row",
              justifyContent:'space-between',
              marginHorizontal:10,
              height:50,
              alignItems:"center"
            }
          }
          >
          <TouchableOpacity
          style={{
            backgroundColor:"blue",


          }}
          onPress={()=>getPincode(address.context[0].text)}
          >
            <Text
            style={{
              
            }}
            >GETPINCODE</Text>
            </TouchableOpacity>

            <TextInput
            
            style={
              {
                borderRadius:20,
                width:"50%",
                alignItems:"center",
                textAlign:'center',
                borderWidth:0.5
              }
            }
            value={pincode}
            onChangeText={text=>setpincode(text)}



            >

            </TextInput>
          </View>
         {address!=null && 

         address.context.map(
           (address)=>
           {
             return(
               <View
               style={
                 {
                   flexDirection:"row",
                   justifyContent:"space-around",
                   alignItems:'center'
                 }
               }
               >
               <Text>{address.id.split(".")[0]}</Text>
               <Text>{address.text}</Text>
              </View>
             )
           }
         )
          }
          <TouchableOpacity
          onPress={
           ()=>gopay()
          }
          >

              <Text>PROCCED TO PAYMENT</Text>
          </TouchableOpacity>
        </View>
}



     

         
        </View>
    )
}

export default Checkout