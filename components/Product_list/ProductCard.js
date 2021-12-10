import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, Text, View, StyleSheet } from "react-native"
  ;
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Color } from "../../constants/colors";

import { fonts } from "../../constants/fonts";

const ProductCard = (props) => {
  const navigation = useNavigation()
  const { item, index, height, width } = props
  return (

    <TouchableOpacity
      onPress={() =>
        navigation.push("product",
          {
            item: item, name: item.pname
          })}

      style={[styles.Container, { width: width / 2 - 10, }]}
    >

      <Image
        source={
          {
            uri: item.pimage
          }
        }
        style={styles.imgProduct}
        resizeMode="cover"
      />

      <View
        style={styles.detailsContainer}
      >
        <View
          style={styles.nonBlueEffect}
        >
        </View>
        <View
          style={styles.textContainer}
        >
          <Text
            style={styles.txtpname}
          >{item.pname}</Text>
          <Text
            style={styles.txtpbrand}
          >{item.pbrand}</Text>

          <View
            style={styles.priceRowContainer}
          >
            <Text
              style={styles.txtpriceAfterDisc}
            >
              RS {item.priceafterdisc}
            </Text>
            <Text
              style={styles.txtprice}
            >
              RS {item.pprice}
            </Text>

          </View>
        </View>
      </View>
      <View
        style={styles.discountContinaer}
      >
        <Text
          style={styles.txtdiscount}
        >{item.pdisc} % OFF</Text>

      </View>


    </TouchableOpacity>

  )

}

const styles = StyleSheet.create
  (
    {
      Container:
      {
        backgroundColor: '#fff',
        elevation: 5,
        height: 350,

        margin: 5,
        borderRadius: 15,

      },
      imgProduct:
      {
        //backgroundColor:"blue",

        borderRadius: 15,
        height: '60%',
        width: "100%",
        alignSelf: "center"
      }
      ,
      textContainer:
      {
        flex: 1,
        position: "absolute"
      },
      txtpbrand:
      {
        fontSize: 18,
        color: "gray"

      },
      txtpname:
      {
        fontSize: 20,
        fontFamily: fonts.Federo_Regular,
        color: 'black',

      },
      priceRowContainer:
      {
        flexDirection: "row",
        justifyContent: 'space-between',

      },
      nonBlueEffect:
      {
        flex: 1,
        backgroundColor: "#fff",
        opacity: 0.5
      },
      detailsContainer:
      {
        alignSelf: 'center',
        justifyContent: "center",
        height: '40%',
        width: "100%",
        // elevation: 15,
        borderRadius: 15,
        backgroundColor: "#fff",
        alignItems: "center"
      },
      txtdiscount:
      {
        marginHorizontal: 10,
        marginVertical: 5,
        color: "#fff",
        fontSize: 15,
        fontFamily: fonts.Federo_Regular
      },

      discountContinaer:
      {
        backgroundColor: "#90a955",
        position: "absolute",
        top: 5,
        right: 5,
        elevation: 10,
        borderRadius: 10
      },
      txtprice:
      {
        fontFamily: fonts.Federo_Regular,
        fontSize: 18,
        alignSelf: "flex-end",
        textDecorationLine: 'line-through',
        color: 'black'
      },
      txtpriceAfterDisc:
      {
        fontFamily: fonts.Quicksand_Medium,
        fontSize: 20,
        color: "black"
      },

    }
  )
export default ProductCard