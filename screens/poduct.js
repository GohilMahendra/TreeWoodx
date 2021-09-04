import { useRoute } from "@react-navigation/core";
import React, { useEffect } from "react";

import {View,Text,Image, ScrollView, ActivityIndicator, TextInput, Dimensions, FlatList, ImageBackground, VirtualizedList  } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";

import { useState } from "react/cjs/react.development";

import firestore from "@react-native-firebase/firestore";
import AddStar from "../components/Addstar";
import Modal from "react-native-modal";
import Samebrand from "../components/Samebrand";
import { listenerCount } from "npm";
import SimilarItems from "../components/SimilarItems";
import { StyleSheet } from "react-native";
import { $CombinedState } from "redux";
import { fonts } from "../constants/fonts";
import { useDispatch } from "react-redux";
import { AddToCart } from "../redux/Actions/CartActions";
const product=({navigation})=>


{

 
  const dispatch=useDispatch()

  const date=new Date()

  const todaysdate=date.getDate()+'/'+date.getUTCMonth()+'/'+date.getFullYear()

  console.log(todaysdate)

  const {height,width}=Dimensions.get('screen')




  //const [samebrandsta,setsamebrand]=useState()
  const [similar,setsimilar]=useState()

  const [success,setsuccess]=useState(false)
  
  const [showModel,setShowModel]=useState(true)

  const p=useRoute()
  // if(auth().currentUser.uid=="")
  // {
  //   navigation.navigate('Login')
  // }

  // async function processImage(localPath) {
  //   const labels = await ml().cloudImageLabelerProcessImage(localPath);
  
  //   labels.forEach(label => {
  //     console.log('Service labelled the image: ', label.text);
  //     console.log('Confidence in the label: ', label.confidence);
  //   });
  // }
  
  // // Local path to file on the device
  // const localFile = `${utils.FilePath.PICTURES_DIRECTORY}/images.jpeg`;
  // processImage(localFile).then(() => console.log('Finished processing file.'));



  


  
  const addRate=async()=>
  {
    



    if(review.review=="" || review.review==undefined)
    {
      alert('please add review and then try your thoughts are valueable to US')
      return
    }



  }
  const addTOcart=()=>
  {




    
   dispatch(AddToCart(prod,p.params.item.key))

  
    
  
  }
 
 
//   console.log(item)
  
useEffect
(


  
  
  ()=>{ 


    const subscriber=firestore().collection('reviews')
    .doc(p.params.item.key)
    .collection('review')
    .limit(1).
    onSnapshot((snapshot)=> {

    snapshot.docs.forEach((docs) =>
      {
        setrev(docs.data())
        
      }
      
      )
    
    })
     
    return subscriber
  }
  ,[rev]
)



useEffect(()=>{ 

    
        firestore().collection('products').doc(p.params.item.key).onSnapshot((snapshot)=> {

        
        setsuccess(true)
        setprod(snapshot.data().prod)

        setload(false)

     
  });



}
    ,[prod]
  )
  
  

   
  const [prod,setprod]=React.useState([])
  const [revdata,setrevdata]=useState({total:0,avg:5})
  const [cart,setcart]=React.useState()
  const [load,setload]=React.useState(true)
  const [rev,setrev]=useState( {date:todaysdate,
    email:""
    ,star:5,
    review:""})
  const [review,setreview]=useState(
    {rate:5,
      review:'',

    }
  )


 
    const reviewBuilder=(item,index)=>
    {
      console.log('called')
      console.log(item+'item')
      return(
        <View style={{width:width-40,margin:20}}>
          <Text>{item.star}</Text>
        </View>
      )
    }
 
   // const org_price=prod.price-prod.price*prod.discount/100
//    console.log(item)
    return(
        <View 
        style={{flex:1,backgroundColor:'#E3E8F0'}}



        //D3D3D3
        >
        

    { load && <ActivityIndicator
      size={"large"}
      color="green"
      style={{position:'absolute',top:'50%',left:'50%'}}
      >

      </ActivityIndicator>  
}

 {(!load) && <View style={{flex:1}}>
   
   
   
    {/* <Viro360Image
    source={require(

      '../assets/chair.png'
    )}
    >

    </Viro360Image> */}
   
       <ScrollView style={{flex:1}}>
      
      <View style={{flex:1}}>
      <View style={{height:height/4,position:'absolute',
      backgroundColor:'gray',borderBottomLeftRadius:40,
      borderBottomRightRadius:40}}>

</View>
       <ImageBackground
      
      source={{uri:prod.img1}}
      style={{height:height/2,width:width,  shadowColor: '#fff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    width:width}}


>
  

      
      </ImageBackground>
  
     

    <View style={{flexDirection:'row',
    justifyContent:"space-evenly",
    width:width,marginTop:20}}>

    
    <View style={{height:100,
    borderRadius:20,width:100,
      
      justifyContent:'center',alignItems:'center',
      backgroundColor:'#fff', 
        shadowOffset: {width:10, height: 6},
      shadowOpacity:1,shadowColor:'#455fff',
      shadowRadius:20,elevation:30}}>


    <Text>Height</Text>
    <Text>{prod.dimensions.height}</Text>

    </View>

    <View style={{height:100, shadowOffset: 
    {width:20, height: -60},
      shadowOpacity:1,shadowColor:'#455fff',
      shadowRadius:30,elevation:10,
      justifyContent:'center',
      alignItems:'center',borderRadius:20,width:100,
      backgroundColor:'#fff'}}>

    <Text>width</Text>
    <Text>{prod.dimensions.width}</Text>
</View>
<View style={{height:100, shadowOffset: {width:10, height: 6},
      shadowOpacity:1,shadowColor:'#fbffff',

      shadowRadius:6,elevation:30,justifyContent:'center',
      alignItems:'center',borderRadius:20,width:100,backgroundColor:'#fff'}}>
<Text>depth</Text>
    <Text>{prod.dimensions.depth}</Text>
    </View>
    </View>
      <View style={{backgroundColor:'transparent',opacity:0.7,margin:20,borderRadius:20}}>
      <Text style={{
      alignSelf:'center',
      fontFamily:"Merienda-Regular",
      fontWeight:'bold',
      fontSize:25}} >
        {prod.pname}
      </Text>
      <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold'}} >{prod.brand}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-evenly'}}
      >
        <Text style={{fontSize:20}} >RS{Math.floor(prod.price-prod.price*prod.discount/100)}</Text>
        <Text style={{textDecorationLine:'line-through',fontSize:20}} >RS{prod.price}</Text>
        <Text  style={{color:"green",fontSize:20}}>{prod.discount} % OFF</Text>
        
      </View>
      <Text style={{margin:20,fontFamily:"Federo-Regular",fontSize:18}}>{prod.discription}</Text>
    
    <View style={{flexDirection:'row',justifyContent:"center"}}>
      <Text style={{fontSize:20,fontWeight:'bold',fontFamily:"Orbitron-Black"}}>Material :</Text>
      <Text style={{elevation:15,marginHorizontal:20,
      fontSize:20,color:"black",
      fontFamily:fonts.Federo_Regular,
      backgroundColor:'#fff',borderRadius:20}}>  {prod.material}  </Text>
      </View>
      </View>
    
      <View style={{flexDirection:'row',
      justifyContent:'space-evenly',marginVertical:10}}
      
      >
        
        <Text style={{fontSize:20,width:100,height:50,
          textAlignVertical:'center',
          backgroundColor:'#fff',
          fontFamily:fonts.Federo_Regular,
          elevation:25,color:"black"
          ,textAlign:'center',borderRadius:20}} >{prod.cat}</Text>
        <Text style={{fontSize:20,
          height:50,
          textAlignVertical:'center',
          fontFamily:fonts.Federo_Regular,
          backgroundColor:'#fff',color:'black',
          marginHorizontal:20,
          textAlign:'center',borderRadius:20,
          elevation:25}} >{prod.sub_cat}</Text>
        
      </View>
     
     
      <TouchableOpacity
      
      onPress={()=>addTOcart()}
      style={{flexDirection:'row',alignContent:'center',
      justifyContent:"space-evenly",alignSelf:'center',alignItems:'center',
      backgroundColor:'black',
      elevation:25,
      height:50,width:'70%',borderRadius:20,
      borderWidth:1}}>
        <Text style={{textAlignVertical:'center',
        fontFamily:fonts.Federo_Regular,
        justifyContent:'center',textAlign:'center',color:'#fff'}}>ADD TO CART</Text>
        <FontAwesome5Icon
        size={20}
        name="shopping-cart" color='#fff'></FontAwesome5Icon>
      </TouchableOpacity>
      

      <View style={{alignContent:"center",
      alignItems:'center',margin:20}}>
      <Text style={{margin:20,fontFamily:"Federo-Regular",
      fontSize:30}}>REVIEWS</Text>
    

   

   {/* <Modal
   isVisible={showModel}


   
   >


        <TouchableOpacity 
        
        onPres={()=>setShowModel(false)}
        style={{height:100,width:100,backgroundColor:"#fff"}}>

        </TouchableOpacity>
     <Text>HU</Text>
     <FlatList
     
     
     
     >

     </FlatList>

   </Modal> */}


      {/* <Rating
  type='star'

tintColor="#455fff"
  ratingBackgroundColor="#455fff"
  ratingColor="#455fff"
  ratingCount={5}
  jumpValue={0.5}
  imageSize={60}
  showRating
  
/> */}

  <View style={{flexDirection:'row',margin:20,marginTop:0}}> 

  <TouchableOpacity
  onPress={()=>setreview({...review,rate:1})}
  >
  <FontAwesome5Icon name="star" size={30} solid={(review.rate>=1)?true:false}></FontAwesome5Icon>
  </TouchableOpacity>
  <TouchableOpacity
   onPress={()=>setreview({...review,rate:2})}>
  <FontAwesome5Icon name="star" size={30}  solid={(review.rate>=2)?true:false}></FontAwesome5Icon>
  </TouchableOpacity>
  <TouchableOpacity
  onPress={()=>setreview({...review,rate:3})}
  >
  <FontAwesome5Icon name="star" size={30}  solid={(review.rate>=3)?true:false}></FontAwesome5Icon>
  </TouchableOpacity>
  
  <TouchableOpacity
  onPress={()=>setreview({...review,rate:4})}
  >
  <FontAwesome5Icon name="star" size={30}  solid={(review.rate>=4)?true:false}></FontAwesome5Icon>
  </TouchableOpacity>
  <TouchableOpacity
  onPress={()=>setreview({...review,rate:5})}
  >
  <FontAwesome5Icon name="star" size={30}  solid={(review.rate>=5)?true:false}></FontAwesome5Icon>
  </TouchableOpacity>
  </View>

      <TextInput
      
      onChangeText={val=>setreview({...review,review:val})}
      placeholder=" + Add review Here"
      style={{borderRadius:20,alignSelf:'center',
      borderWidth:1,width:width-40}}
      multiline={true}

      >

      </TextInput>
 
    <TouchableOpacity

    onPress={()=>addRate()}
    style={styles.addbtnReview}>
    <Text style={styles.addbtnReviewText}>Add</Text>
    </TouchableOpacity>
      </View>
     
     {

       (rev.email!="")
       &&
      <TouchableOpacity
      onPress={()=>navigation.navigate('Comments',{"key":p.params.item.key})}
      
      >
     
     
      <View style={{marginHorizontal:20,
        width:width-40,
        borderRadius:15,
        alignSelf:"center",
        borderTopWidth:1,
        borderBottomWidth:1,
        backgroundColor:"transparent"}}>
       
    
        <MaterialIcons
        
        style={
          {
            alignSelf:"flex-end",

          }
        }
        name={"read-more"}
        size={30}
        >

        </MaterialIcons>
      
      <View style={{flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"}}>



      <AddStar
      star={rev.star}
      />
      <Text style={{
        textAlign:'center',
        marginHorizontal:20,
        textAlignVertical:'center'
      }}>{rev.date}</Text>
     
    
    
     
      </View>
      <Text style={{
        fontSize:20,
        marginHorizontal:20,
        fontWeight:'bold'}}>{rev.email}</Text>
     



     <Text style={{fontSize:15,marginHorizontal:20}}>{rev.review}</Text>
      </View>
      </TouchableOpacity>

}
    </View>
     

    


   

    

    <View>
    <SimilarItems
    
    category={prod.cat}
    navigation={navigation}
    curruntID={p.params.item.key}
    
    >

    </SimilarItems>
  
  <Samebrand
  
  brand={prod.brand}
  navigation={navigation}
  curruntID={p.params.item.key}

  >

  </Samebrand>
  </View>
    </ScrollView>


      </View>}
    </View>
    )


}
export default product

const styles=StyleSheet.create
(
  {
    addbtnReview:
    {
      justifyContent:"center",
      alignItems:"center",
      marginTop:20,
      height:50,
     width:70,
      borderRadius:20,
      backgroundColor:'black'
    },
    addbtnReviewText:

    {
      color:"#fff",
      

    },
    elevatedtext:
    {
      elevation:25,
      backgroundColor:'#fff',
      color:"black",
      margin:20
    }
  }
)