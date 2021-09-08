import React, { useEffect,useState } from "react";
import { View,Dimensions ,Text, ScrollView} from "react-native";
import {PieChart,LineChart ,ProgressChart } from "react-native-chart-kit";


import { fonts } from "../constants/fonts";
import firestore from "@react-native-firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
const Admin_panel=()=>
{
    const {height,width}=Dimensions.get('screen')

    const [orderData,setOrderData]=useState()
    const date=new Date()
   
    const month=date.getUTCDate()+date.getUTCMonth()
// console.log(month)
    const year=date.getFullYear()
    const fetchChartData=(fetchBy)=>
    {
      
  
      const quary=firestore().collection('Orders').where('date','>','15/09/2021')
        quary.onSnapshot
        (
          (snapshot)=>
          {
            snapshot.forEach
            (
            function(child)
            {

              console.log(child.data().date)

            }
            )
          }
        )

  
    }
    useEffect

    (
      ()=>
      {

        fetchChartData(fetchBy)
      },
    [fetchBy]
    )


    const [fetchBy,setFetchBy]=useState("month")
 
    return(
        <View style={{flex:1,backgroundColor:'black'}}>
        <ScrollView>
            <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={height/3}
    yAxisLabel="RS"
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#a480ff",
      backgroundGradientTo: "#ff4525",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />

           <Text style={{fontFamily:fonts.Federo_Regular}}>

         

                </Text>
                
                <TouchableOpacity
                style={
                  {
                    backgroundColor:"blue"
                  }
                }
                onPress={()=>setFetchBy('month')}
                >
                  <Text>FIND BY MONTH</Text>
                </TouchableOpacity>
                </ScrollView>
                </View>
    )
}
export default Admin_panel