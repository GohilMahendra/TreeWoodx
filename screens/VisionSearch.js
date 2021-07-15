import { transformFile } from "@babel/core";
import { forScaleFromCenterAndroid } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators";
import React,{useEffect,useRef,useState} from "react";
import { View,Text,PermissionsAndroid } from "react-native";


import {RNCamera,FaceDetector} from "react-native-camera";
import RNFS from "react-native-fs";
const VisionSearch=()=>
{

    const cameraRef=useRef()
    
    let date=new Date()
    const [Process,setProcess]=useState(false)
    const [Result,serResult]=useState("")
    
    const takePicture=async()=>
    {
        try
        {
        setProcess(true)
        const imageData=await cameraRef.current.takePictureAsync(
            {
                base64:true
            }
        )

        getPrediction(imageData)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    const getPrediction=async(imageData)=>
    {
        var Path=RNFS.DocumentDirectoryPath

    
        var name=date.getUTCDate().toString()+
        "-"+date.getUTCMonth().toString()+
        "-"+date.getUTCFullYear().toString()+
        "-"+date.getMilliseconds().toString()+
        ".jpg"
       
      

        console.log(name)
        // try
        // {
        //     console.log(RNFS.PicturesDirectoryPath+"/"+name)
        // RNFS.writeFile(RNFS.PicturesDirectoryPath+"/",imageData,'base64')


        // }
        // catch
        // (err){console.log(err)}
        
        
    }

    const getPermissionStorage=async()=>
    {
        PermissionsAndroid.request
        (
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Give Location Permission',
                message: 'App needs location permission to find your position.'
        }
        ).then(granted => {

        console.log(granted);
        
        }).catch(err => {
        console.warn(err);
        }
        )
    }
    const getPermissionCamera=async()=>
    {

        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            
            {
                title: 'Give Location Permission',
                message: 'App needs location permission to find your position.'
        }
        ).then(granted => {
        console.log(granted);
        
        }).catch(err => {
        console.warn(err);
        });


    }

    const onBarCodFound=({barcodes})=>
    {
        barcodes.forEach(barcode => console.warn(barcode.data))

    }
    useEffect
    (
        ()=>{

        getPermissionCamera()
          
        }
        ,[]
    )
    useEffect
    (
        ()=>
        {
            getPermissionStorage()
        },[]
    )
    return(
        <View style={{flex:1}}>



            <Text>HI</Text>
            <RNCamera
            ref={cameraRef}
            onTap={()=>takePicture()}
            captureAudio={false}
            style={{flex:1}}

            onGoogleVisionBarcodesDetected={onBarCodFound}
            >

            </RNCamera>
        </View>
    )

}
export default VisionSearch