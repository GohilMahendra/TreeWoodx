
import { useRoute } from '@react-navigation/core';
import React  from 'react';
import { View, Text,StyleSheet, Dimensions } from 'react-native';
import { stat } from 'react-native-fs';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';


import {
    FlatList, TouchableOpacity
  } from "react-native-gesture-handler";


  import ProductCard from "../components/Product_list/ProductCard";
import { FetchMoreSimilarProducts } from '../redux/Actions/SimilarActions';
const {height,width}=Dimensions.get('screen')
const SimilarProducts=({navigation})=>
{




    
    const p=useRoute()
    const dispatch=useDispatch()



    let name=p.params.categoryname

    


    const products=useSelector(state=>state.Similar.similarProducts)

    const lastindex=useSelector(state=>state.Similar.lastKeyProduct)

    console.log(lastindex+"LAST INDE")
    
    console.log(name+"__category name recieved")   
   
   
    const fetchMoreProd=()=>
    {
        dispatch(FetchMoreSimilarProducts(name,lastindex))
        

    }
    const itembuilder=({item,index})=>

    {
       
     const disc=item.pprice-item.pprice*item.pdisc/100   
    
     console.log(item)

     return(

      
      <ProductCard
      navigation={navigation}
      item={item}
      index={index}
      height={height}
      width={width}
      >

      </ProductCard>
          
          
        )
    }
   


    return(
        <View
        style={styles.container}
        >

        



        
     
        <FlatList
        


        
        style={{flex:1}}
        data={products}
        numColumns={2}
        keyExtractor={item=>item.key}
        renderItem={itembuilder}

        ListFooterComponent={
            <TouchableOpacity

            onPress={
                ()=>fetchMoreProd()
            }            
            >
                <Text>LOAD MORE</Text>
            </TouchableOpacity>
        }
        >

        </FlatList>
    

     
        </View>
    )
}

const styles=StyleSheet.create
(
    {
        container:
        {
            flex:1,
        }
    }
)
export default SimilarProducts