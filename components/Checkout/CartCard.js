
import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import { fonts } from "../../constants/fonts";
const CartCard = (props) => {
  const { item } = props
  return (
    <View
      style={styles.Container}
    >
      <Image
        source={{ uri: item.img1 }}
        style={styles.imgContainer}
      >
      </Image>

      <View  style={styles.detailsContainer}>
        <Text
          style={styles.txtName}>{item.pname}</Text>
        <Text
          style={styles.txtBrand}>{item.brand}</Text>
        <Text
          style={styles.txtPrice}>RS {item.price}</Text>

        <View style={styles.qtyContainer}>
          <Text
            style={styles.txtQty}> qty : {item.quantity}</Text>
          <Text
            style={styles.txtTotal}>Total RS{item.price * item.quantity}</Text>
        </View>

      </View>

    </View>

  )
}
const styles = StyleSheet.create
  (
    {
      Container:
      {
        flexDirection: "row",
        margin: 10,
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 10
      },
      imgContainer:
      {
        width: '30%',
        height: '80%',
        height: 100,
        borderRadius: 15
      },
      detailsContainer:
      {
        flexWrap: "wrap",
        flex: 1,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
      },
      txtName:
      {
        fontSize: 20,
        fontFamily: fonts.Genos_Regular
      },
      txtBrand:
      {
        fontSize: 20,
        fontFamily: fonts.SpaceMono_Regular
      },
      txtPrice:
      {
        fontSize: 20,
        fontFamily: fonts.Genos_Regular
      },
      qtyContainer:
      {
        flexDirection: 'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
      },
      txtQty:
      {
        fontSize: 20,
        marginHorizontal: 5,
        fontFamily: fonts.Genos_Regular
      },
      txtTotal:
      {
        fontSize: 20,
        fontFamily: fonts.Genos_Regular
      }


    }
  )
export default CartCard
