import { useRoute } from "@react-navigation/native";
import React, { useEffect ,useState} from "react";
import { TouchableOpacity, View,Text} from "react-native";

import firestore from "@react-native-firebase/firestore";
import { FlatList } from "react-native";

import AddStar from "../components/Addstar";
import { load } from "npm";
import { ActivityIndicator,ProgressBar } from "react-native-paper";
import { Dimensions } from "react-native";

const Comments=()=>
{


    const key=useRoute().params.key
    
    const [index,setindex]=useState(1)

    const [lastvisited,setlastvisited]=useState()

    const [refreshning,setrefreshning]=useState(false)

    const [avg,setavg]=useState(
        {
            one:2,
            two:0,
            three:0,
            four:0,
            five:0,
            avg:0,
            total:0
        }
    )
    
    const {height,width}=Dimensions.get('screen')
    const [loading,setloading]=useState(true)
    const [end,setend]=useState(false)
    const itembuilder=({item,index})=>
    {

        
      
        console.log(item)
        return(
        <View style={{marginHorizontal:20,width:width-40,borderRadius:30,alignSelf:"center",backgroundColor:"pink"}}>
        <View style={{flexDirection:"row"}}>
  
  
  
        <AddStar
        star={item.star}
        />
        <Text>{item.date}</Text>
       
      
      
       
        </View>
        <Text style={{fontSize:20,marginHorizontal:20,fontWeight:'bold'}}>{item.email}</Text>
       
  
  
  
       <Text style={{fontSize:15,marginHorizontal:20}}>{item.review}</Text>
        </View>
        )
    }
  
    const [rev,setrev]=useState([])
    
    const getavg=async()=>
    {
        setloading(true)
        try
        {
       const average=await firestore().collection('reviews').doc(key).get()
        
       setavg(average.data())
      
       console.log(avg+'avg')
      
       if(average!=undefined)
       {
           setloading(false)
       }
    }
        catch(err)
        {
            console.log(err+'err in avrage')
        }
    }
    useEffect
    (
        async()=>
        {
           getavg()  
        },[]
    )
    useEffect
    (
    
    
      

     
      ()=>{ 
        firestore().collection('reviews').doc(key).collection('review').limit(1).onSnapshot((snapshot)=> {
    
            const li=[]
            var key=""
            snapshot.docs.forEach((docs) =>
          {
           


            
            li.push(docs.data())
            
          }
          
          )
         

          
          setlastvisited(li[li.length-1].email)
          
          setend(true)
          setrev(li)
          console.log(rev)
         
        setloading(false)
        })
         
      }
      ,[]
    
    
      )


      const retriveMore=()=>
      {

        setrefreshning(true)

        firestore().collection('reviews')
        .doc(key)
        .collection('review')
        .orderBy("email")
        .startAfter(lastvisited)
        .limit(1)
        .onSnapshot((snapshot)=> {
    
            var li=[]
        snapshot.docs.forEach((docs) =>
          {
           

            
            li.push(docs.data())
            
          }
          
          )

          console.log(li)

          if(li.length<=0)
          {
              alert('reached the end')
              setend(true)
              return
          }
          if(li.length> 0&& li!=null)
          {

            console.log('called')
          setlastvisited(li[li.length-1].email)
          
          setrev([...rev,...li])
          setrefreshning(false)
          console.log(rev)
         
          }
         
        }
        )

        
    }

    return(
    

        <View style={{flex:1}}>
        {

            (loading ) &&
            <ActivityIndicator
            style={{alignSelf:"center",top:250}}
            size="large"
            
            >

            </ActivityIndicator>
        }
        
        {
         (!loading) &&
        
        <View style={{flex:1}}>


            <View>
            {/* <ProgressBar
            style={{width:width-80,marginBottom:10,borderRadius:30,marginHorizontal:20,height:30}}
            progress={avg.one/avg.total}
            color={"black"}
            />
            <ProgressBar
            style={{width:width-80,marginBottom:10,borderRadius:30,marginHorizontal:20,height:30}}
            progress={avg.two/avg.total}
            color={"black"}
            >

            </ProgressBar>
            <ProgressBar
            style={{width:width-80,marginBottom:10,borderRadius:30,marginHorizontal:20,height:30}}
            progress={avg.two/avg.total}
            color={"black"}
            >

            </ProgressBar>
            <ProgressBar
            style={{width:width-80,marginBottom:10,borderRadius:30,marginHorizontal:20,height:30}}
            progress={avg.three/avg.total}
            color={"black"}
            >

            </ProgressBar>
            <ProgressBar
            style={{width:width-80,marginBottom:10,borderRadius:30,borderRadius:30,marginHorizontal:20,height:30}}
            progress={avg.four/avg.total}

            
            
            color={"black"}
            >

            </ProgressBar>
            <ProgressBar
            style={{width:width-80,marginBottom:10,borderRadius:30,marginHorizontal:20,height:30}}
            progress={avg.five}
            color={"black"}
            >

            </ProgressBar> */}
          
            </View> 
    
            
            
            <FlatList
            data={rev}
            style={{width:'100%',height:150,backgroundColor:'pink'}}
            
            scrollEnabled={true}
            renderItem={itembuilder}
           
            ListFooterComponent={
            
               ( refreshning  && !end)&&
                <ActivityIndicator
                size={"large"}
                >


                </ActivityIndicator>
            }

            
           
            
             onEndReached={()=>retriveMore()}
            keyExtractor={item=>item.email}
            >

            </FlatList>
                
                    
        </View>}
        </View>
    
    )

}
export default Comments