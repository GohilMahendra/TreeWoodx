
import { useRoute } from '@react-navigation/core';
import React  from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';


const SimilarProducts=({navigation})=>
{


    const p=useRoute()


    let name=p.params.categoryname

    
    console.log(name+"__category name recieved")   
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

        



        
     
        {/* <FlatList
        


        
        style={{flex:1}}
        data={product}
        numColumns={2}
        keyExtractor={item=>item.key}
        renderItem={itembuilder}
        >

        </FlatList>
     */}

    <ActivityIndicator
    animating={false}
    >
        </ActivityIndicator>    
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