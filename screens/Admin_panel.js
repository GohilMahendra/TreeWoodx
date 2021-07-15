import React from "react";
import { View,Dimensions ,Text, ScrollView} from "react-native";
import {PieChart,LineChart ,ProgressChart } from "react-native-chart-kit";
const Admin_panel=()=>
{
    const {height,width}=Dimensions.get('screen')

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [0, 0, 0, 3, 0, 0],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Total Sales(no)"] // optional
      };

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
    yAxisSuffix="k"
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
  <LineChart
  data={data}
  width={width}
  height={220}
  chartConfig={chartConfig}
/>

<ProgressChart
  data={{  labels: ["Bed", "Chair", "Tv Unit"], // optional
  data: [0.4, 0.6, 0.0]}}
  width={width}
  height={220}
  strokeWidth={16}
  radius={32}
  chartConfig={chartConfig}
  hideLegend={false}
/>
           <Text style={{fontFamily:'Orbitron-Black'}}>

         

                </Text>
                
                </ScrollView>
                </View>
    )
}
export default Admin_panel