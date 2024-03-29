import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";

import { View, Text, Image, ScrollView, ActivityIndicator, TextInput, Dimensions, FlatList, ImageBackground, VirtualizedList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import firestore from "@react-native-firebase/firestore";
import AddStar from "../../components/Review/Addstar";
import Samebrand from "../../components/Similar/Samebrand";

import SimilarItems from "../../components/Similar/SimilarItems";
import { StyleSheet } from "react-native";
import { fonts } from "../../constants/fonts";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../redux/Actions/CartActions";
import ImageSwiper from "../../components/ImageSwiper";
import DimentionsView from "../../components/Product/DimentionsView";
//import { } from "@react-native-mapbox-gl/maps";
import AddReview from "../../components/Review/AddReview";
const { height, width } = Dimensions.get('screen')
const product = ({ navigation }) => {

  const dispatch = useDispatch()

  const date = new Date()

  const todaysdate = date.toISOString().split('T')[0]

  const [success, setsuccess] = useState(false)
  
  const [prod, setprod] = React.useState([])
  const [load, setload] = React.useState(true)


  const p = useRoute()

  const addTOcart = () => {
    dispatch(AddToCart(prod, p.params.item.key))
  }

 


  useEffect(() => {
    firestore().collection('products')
      .doc(p.params.item.key)
      .onSnapshot((snapshot) => {

        setsuccess(true)
        setprod(snapshot.data())
        setload(false)


      });

  }
    , []
  )

  


  return (
    <View
      style={styles.Container}
    >


      {load && <ActivityIndicator
        size={"large"}
        color="green"
        style={{ position: 'absolute', top: '50%', left: '50%' }}
      >

      </ActivityIndicator>
      }

      {(!load) && <View style={{ flex: 1 }}>

        <ScrollView style={{ flex: 1 }}>

          <View style={{ flex: 1 }}>

            {/**image courousel for product*/}
            <ImageSwiper

              data={[prod.img1, prod.img2, prod.img3, prod.img4]}
            />

            <DimentionsView

              productHeight={prod.dimensions.height}
              productWidth={prod.dimensions.width}
              productLength={prod.dimensions.length}

            />


            <View style={styles.productDetailsContainer}>
              <Text style={styles.txtPname} >
                {prod.pname}
              </Text>
              <Text style={styles.brandNameText} >
                {prod.brand}
              </Text>
              <View style={styles.priceContainer}
              >
                {/*RS{Math.floor(prod.price-prod.price*prod.discount/100)} */}
                <Text style={{ fontSize: 20, fontFamily: fonts.Quicksand_Medium }} >
                  RS {prod.priceafterdisc}

                </Text>
                <Text style={{ textDecorationLine: 'line-through', fontFamily: fonts.Quicksand_Medium, fontSize: 20 }} >RS{prod.price}</Text>
                <Text style={{ color: "green", fontSize: 20 }}>{prod.discount} % OFF</Text>

              </View>
              <Text style={styles.discription}>
                {prod.discription}
              </Text>

              <View style={styles.materialContainer}>
                <Text style={styles.materialText}>
                  Material :
                </Text>

                <View style={styles.materialTextContainer}>
                  <Text style={styles.materialTextName}>
                    {prod.material}
                  </Text>
                </View>

              </View>

            </View>

            <View
              style={styles.categoryContainerView}
            >
              <Text
                style={styles.productCategoryText} >
                {prod.cat}
              </Text>
            </View>
            <ScrollView
              horizontal
            >
              <View
                style={styles.categoryContainer}
              >
                {
                  prod.subcategories.map(
                    (item) => {
                      return (
                        <View
                          key={item}
                          style={styles.categoryContainerView}
                        >
                          <Text
                            style={styles.productCategoryText} >
                            {item}
                          </Text>
                        </View>
                      )
                    }
                  )
                }

              </View>
            </ScrollView>

            <TouchableOpacity
              onPress={() => addTOcart()}
              style={styles.AddToCartButtonContainer}>
              <Text style={styles.AddToCartText}>ADD TO CART</Text>
              <FontAwesome5Icon
                size={20}
                name="shopping-cart" color='#fff'></FontAwesome5Icon>
            </TouchableOpacity>

            <AddReview

              pid={p.params.item.key}
              todaysdate={todaysdate}

            />

            <TouchableOpacity
            onPress={()=>navigation.navigate("Comments",{key:p.params.item.key})}
            >
            <View style={{
              flexDirection:'row',
              margin:20,
              justifyContent:'space-between'
            }}>
              <Text
              style={{
                fontSize:20,
                fontFamily:fonts.Federo_Regular
              }}
              >SEE REVIEW HERE </Text>
              <FontAwesome5Icon
              size={20}
              name="chevron-right"
              color="black"
              ></FontAwesome5Icon>
        </View>
        </TouchableOpacity>
          </View>

          <View

          >

            {/**similar products */}
            <SimilarItems

              subcategories={prod.subcategories}

              curruntID={p.params.item.key}

            >
            </SimilarItems>

            {/**similar Brands */}
            <Samebrand
              brand={prod.brand}
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

const styles = StyleSheet.create
  (
    {
      Container:
      {
        flex: 1,
        backgroundColor: '#E3E8F0'
      },

      productDetailsContainer:
      {
        backgroundColor: 'transparent',
        opacity: 0.7,
        margin: 20,
        borderRadius: 20
      },

      brandNameText:
      {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
      }
      ,
      discription:
      {
        margin: 20,
        fontFamily: "Federo-Regular",
        fontSize: 18
      },

      AddToCartButtonContainer:
      {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: "space-evenly",
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        elevation: 25,
        height: 50,
        width: '70%',
        borderRadius: 20,
        borderWidth: 1
      },

      priceContainer:
      {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      },
      txtPname:
      {
        alignSelf: 'center',
        fontFamily: "Merienda-Regular",
        fontWeight: 'bold',
        fontSize: 25
      },
      materialContainer:
      {
        alignContent: "center",
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        margin: 20
      },
      materialText:
      {
        fontSize: 20,
        fontFamily: fonts.Federo_Regular,
        margin: 20
      },
      materialTextContainer:
      {
        backgroundColor: "#fff",
        borderRadius: 20,
        elevation: 15
      }
      ,
      materialTextName:
      {
        alignContent: "center",
        alignItems: 'center',
        margin: 10,
        fontSize: 20,
        fontFamily: fonts.Federo_Regular
      },
      productCategoryText:
      {
        fontSize: 20,
        textAlignVertical: 'center',
        fontFamily: fonts.Federo_Regular,
        padding: 15,
        color: "black",
        textAlign: 'center',

      },
      categoryContainer:
      {
        alignContent: "center",
        alignItems: 'center',
        alignSelf: 'center',
        margin: 20,
        flexDirection: "row",
        justifyContent: 'space-evenly',

      },
      reviewContainer:
      {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      },
      categoryContainerView:
      {
        backgroundColor: "#fff",
        alignItems: "center",
        marginHorizontal: 20,
        borderRadius: 15
      },

      AddToCartText:
      {
        textAlignVertical: 'center',
        fontFamily: fonts.Federo_Regular,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff'
      },

      elevatedtext:
      {
        elevation: 25,
        backgroundColor: '#fff',
        color: "black",
        margin: 20
      }
    }
  )