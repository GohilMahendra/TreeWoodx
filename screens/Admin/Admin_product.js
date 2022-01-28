import React, { useEffect } from "react";
import { Dimensions, Text, StyleSheet, TextInput, ScrollView, View, Alert } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";
import { useState } from "react/cjs/react.development";
import firestore from "@react-native-firebase/firestore";
import {
  getDiscountRange,
  getPriceRange
} from "../../functions/CalculationHelpers";

import { color, categories, Material } from "../../constants/categories";
import { useRoute } from "@react-navigation/core";
import { Color } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct } from "../../redux/Actions/ProductActions";
import { ActivityIndicator } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
const { height, width } = Dimensions.get('window')
const Admin_product = ({ navigation }) => {

  date = new Date()

  const p = useRoute()

  const dispatch = useDispatch()
  const IsAnyFieldNull = () => {
    return prod.pname === "" || prod.discount === "" || prod.price === "" || prod.warranty === "" ||
      prod.brand === "" || prod.material === "" || prod.subcategories === "" || prod.cat === "" || prod.discription === "" ||

      prod.dimensions.length === "" || prod.dimensions.width === "" || prod.stock === "" || prod.color === "" || prod.dimensions.height === "" ||
      prod.img1 === "" || prod.img2 === "" || prod.img3 === "" || prod.img4 === ""
  }


  const addProductLoad = useSelector(state => state.Products.addProductLoad)
  const addProductError = useSelector(state => state.Products.addProductError)

  const [prod, setprod] = useState
    (

      {

        pname: "",
        brand: "",
        cat: "",
        subcategories: "",
        material: "",
        priceRange: "0-1000",
        discountRange: '0-20',

        priceafterdisc: 0,
        price: 0,
        color: color[0],
        discount: 0,
        dimensions: {

          height: 50,
          width: 50,
          length: 50
        },
        warranty: 36,
        discription: "It’s all wood. Crafted from high-grade mango wood, the Duetto bed makes for the perfect unwind zone. Its sleek frame and minimalist design exude a contemporary flavour and blend in seamlessly with various styles of decor. A gently curving headboard supports your back, letting you sit up to read, watch TV or simply have a conversation. Layer the bed with plush quilts and fluffy pillows for a warm, cosy nook you’ll never want to leave.",
        date: todaysdate,
        stock: 15,
        img1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRdhvKeVWU27wW7t-pvkK-5f_nmot0QJ1HvyeM0qMojAKn069kTwyZUzTrrqHK0c3JbLqKZKfLx_Bg&usqp=CAc",
        img2: "",
        img3: "",
        img4: "",

      }
    )


  const todaysdate = new Date().toISOString()
  const fetch_Initials = async () => {


    const product = await firestore()
      .collection('products')
      .doc(p.params.item)
      .get()

    setprod(product.data())


  }
  useEffect
    (

      () => {

        if (p.params != undefined) {
          fetch_Initials()
        }

      }, []
    )

  const breakArr = (val) => {

    val = val.replaceAll(' ', '')
    val = val.split(',')

    return val
  }
  const uploadOnFirestore = async () => {

    try {

      if (IsAnyFieldNull()) {
        Alert.alert("Null field", "Please Check Your Field Before Upload")
        return
      }


      let subcategories = breakArr(prod.subcategories.toString())

      prod.priceafterdisc = prod.price - ((prod.price * prod.discount) / 100)

      prod.subcategories = subcategories
      prod.discountRange = getDiscountRange(prod.discount)
      prod.priceRange = getPriceRange(prod.priceafterdisc)
      prod.date = new Date().toISOString()
      console.log(prod)



      if (p.params != undefined) {

        dispatch(AddProduct(key, prod))
      }
      else {
        dispatch(AddProduct("", prod))

      }



    }
    catch (err) {
      console.log("Error", err)
    }
  }


  // const {height,width}=Dimensions.get('screen')

  const renderItem = ({ item, index }) => {
    return (

      <View

      >
        {
          item != 'multi' && item != 'other' ? <TouchableOpacity
            onPress={
              () => setprod({ ...prod, color: item })
            }
          >
            <View
              style={[styles.colorContainer, {
                backgroundColor: item,
                borderRadius: (item === prod.color) ? 50 : 10
              }]}
            ></View>
          </TouchableOpacity> :
            <TouchableOpacity

              onPress={
                () => setprod({ ...prod, color: item })
              }
              style={[styles.btnColorSelecter, {
                height: 50, borderRadius: (prod.color === item) ? 55 : 10,
              }]}
            >

              <Text
                style={
                  {
                    color: "black"
                  }
                }
              >{item}</Text>
            </TouchableOpacity>
        }
      </View>

    )
  }

  return (
    <View style={styles.Container}>

      <ScrollView style={{ flex: 1 }}>

        <View
          style={styles.innerContainer}
        >

          <Text
            style={
              {
                margin: 20,
                fontSize: 20,
                fontWeight: 'bold'
              }
            }
          >
            PRODUCT DETAILS
          </Text>
          <TextInput
            style={styles.inputText}

            value={prod.pname}
            onChangeText={val => setprod({ ...prod, pname: val })}
            placeholder="Enter Product Name(eX ..Gaming Chair)"
          />


          <TextInput

            style={styles.inputText}

            value={prod.brand}
            onChangeText={val => setprod({ ...prod, brand: val })}
            label="brand"
            placeholder="Enter Brand Name (IKEA,WAKEFIT)"
            mode="outlined"

          />

          <View
            style={
              {
                height: 70,
                justifyContent: 'center',
                alignItems: "center",
                margin: 10
              }
            }
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {
                categories.map
                  (
                    item => {
                      return (
                        <TouchableOpacity
                          onPress={() => setprod({ ...prod, cat: item })}
                          key={item}
                          style={[styles.btnCategory, { backgroundColor: (item === prod.cat) ? Color.purpleLight : '#fff' }]}
                        >
                          <Text
                            style={
                              {
                                color: (prod.cat === item) ? "#fff" : 'black',
                                fontSize: 18,
                                fontFamily: fonts.Federo_Regular
                              }
                            }
                          >{item}</Text>
                        </TouchableOpacity>
                      )
                    }
                  )
              }
            </ScrollView>
          </View>
          <TextInput
            onChangeText={val => setprod({ ...prod, subcategories: val })}
            value={prod.subcategories.toString()}
            style={styles.inputText}
            placeholder="subcategories like Office,Modern,LivingRoom etc"
          />

          <View
            style={{
              flexDirection: "row",
              //   height:50
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {Material.map
                (
                  item => {
                    return (
                      <TouchableOpacity
                        onPress={() => setprod({ ...prod, material: item })}
                        key={item}
                        style={
                          {
                            padding: 10,
                            elevation: 10,
                            borderRadius: 10,
                            margin: 10,
                            backgroundColor: (item === prod.material) ? Color.purpleLight : '#fff'

                          }
                        }
                      >
                        <Text
                          style={{
                            color: (item === prod.material) ? "#fff" : "black",
                            fontSize: 18,
                            fontFamily: fonts.Federo_Regular
                          }}
                        >{item}</Text>
                      </TouchableOpacity>

                    )
                  }

                )}
            </ScrollView>
          </View>

          <Text style={{ margin: 20 }}>Enter Dimentions in inches(height,width,length)</Text>

          <View style={styles.dimensionsContainer}>
            <TextInput

              maxLength={3}


              keyboardType='numeric'
              value={prod.dimensions.height.toString()}
              style={styles.inputTextNumbers}
              onChangeText={val => setprod({ ...prod, dimensions: { ...prod.dimensions, height: val } })}
            ></TextInput>
            <TextInput

              maxLength={3}
              keyboardType='numeric'
              onChangeText={val => setprod({
                ...prod,
                dimensions: { ...prod.dimensions, width: val }
              })}
              value={prod.dimensions.width.toString()}
              style={styles.inputTextNumbers}
            ></TextInput>
            <TextInput

              keyboardType='numeric'
              maxLength={3}
              onChangeText={val => setprod({ ...prod, dimensions: { ...prod.dimensions, length: val } })}
              value={prod.dimensions.length.toString()}
              style={styles.inputTextNumbers}
            ></TextInput>
          </View>
          <View
            style={styles.rowNumberContainer}
          >
            <Text>
              Price :
            </Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={text => setprod({ ...prod, price: text })}
              value={prod.price.toString()}
              style={styles.inputTextNumbers}
            />
            <Text>
              discount :
            </Text>
            <TextInput
              keyboardType={'numeric'}
              onChangeText={text => setprod({ ...prod, discount: text })}
              value={prod.discount.toString()}
              style={styles.inputTextNumbers}
            />
          </View>
          <Text>Select A Color</Text>
          <FlatList
            horizontal
            data={
              color
            }
            keyExtractor={item => item}
            renderItem={renderItem
            }
          />
          <TextInput
            onChangeText={text => setprod({ ...prod, img1: text })} t
            value={prod.img1}
            multiline={true}
            style={styles.inputTextImgLink}
            placeholder="Enter img Link 1"
          />
          <TextInput
            onChangeText={text => setprod({ ...prod, img2: text })}
            value={prod.img2}
            multiline={true}
            style={styles.inputTextImgLink}
            placeholder="Enter img Link 2"
          />

          <TextInput
            onChangeText={text => setprod({ ...prod, img3: text })}
            value={prod.img3}
            multiline={true}
            style={styles.inputTextImgLink}
            placeholder="Enter img3"
          />

          <TextInput
            onChangeText={text => setprod({ ...prod, img4: text })}
            value={prod.img4}
            multiline={true}
            style={styles.inputTextImgLink}
            placeholder="Enter img Link 4"
          />

          <View

            style={styles.rowNumberContainer}
          >
            <Text>
              Stock :
            </Text>
            <TextInput

              keyboardType='numeric'

              onChangeText={text => setprod({ ...prod, stock: text })}
              style={styles.inputTextNumbers}

              value={prod.stock.toString()}

            />
            <Text>
              Warranty
            </Text>
            <TextInput

              keyboardType='numeric'
              value={prod.warranty.toString()}
              onChangeText={text => setprod({ ...prod, warranty: text })}
              style={styles.inputTextNumbers}
            ></TextInput>
          </View>

          <TextInput
            onChangeText={text => setprod({ ...prod, discription: text })}
            value={prod.discription}
            style={styles.inputTextDiscription}
            placeholder="Enter Discription"
            multiline={true}
            numberOfLines={5}
          >

          </TextInput>
          <TouchableOpacity

            onPress={() => uploadOnFirestore()}
            style={styles.btnSubmit}

          >
            <LinearGradient
              style={styles.btnGradient}
              colors={['blue', 'skyblue']}
            >
              {addProductLoad
                ?
                <ActivityIndicator
                  size={30}
                  color="#fff"
                />
                :
                <Text style={styles.txtSubmit}>SUBMIT</Text>
              }
            </LinearGradient>
          </TouchableOpacity>


        </View>

      </ScrollView>


    </View>
  )
}

const styles = StyleSheet.create
  (
    {
      Container:
      {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center'
      },
      inputText:
      {
        // marginHorizontal:10,
        marginVertical: 10,
        height: 50,
        width: width - 40,
        alignSelf: "center",
        borderRadius: 5,
        borderWidth: 0.2,

        textAlign: 'center',
        borderColor: "black"
      },

      inputTextImgLink:
      {
        marginVertical: 10,
        height: 100,
        width: width - 40,
        alignSelf: "center",
        borderRadius: 10,

        borderWidth: 0.2,
        textAlign: 'center',

      },
      rowNumberContainer:
      {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        justifyContent: 'space-evenly'
      },
      innerContainer:

      {
        justifyContent: 'center',
        alignItems: 'center',

        flex: 1,
        alignContent: "center"
      },
      inputTextNumbers:
      {
        alignItems: 'center',
        textAlign: 'center',
        margin: 5,
        height: 50,
        borderWidth: 0.1,
        width: 100,
        borderRadius: 5,
      },
      btnGradient:
      {
        flex: 1,
        paddingHorizontal: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
      },
      dimensionsContainer:
      {
        flexDirection: 'row',
        alignSelf: "center",
        justifyContent: 'space-around'
      },
      btnSubmit:
      {

        marginBottom: 0,
        margin: 20,
        backgroundColor: Color.purpleLight,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
      },
      colorContainer:
      {
        height: 50,
        width: 50,
        margin: 10,
        elevation: 5,

        borderColor: 'black',
        borderWidth: 1,

      },
      inputTextDiscription:
      {

        height: 200,
        borderWidth: 0.1,
        marginHorizontal: 15,
        borderRadius: 5,

      },
      btnCategory:

      {
        height: 50,
        padding: 10,
        margin: 10,
        borderRadius: 15,

        elevation: 10,
        justifyContent: "center",
        alignItems: "center"
      },
      btnColorSelecter:
      {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 10

      },
      txtSubmit:
      {
        color: '#fff',
        fontSize: 20,
        textAlign: "center"
      }
    }
  )

export default Admin_product