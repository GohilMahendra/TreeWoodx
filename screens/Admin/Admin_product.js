import React, { useEffect } from "react";
import { Dimensions, Text, StyleSheet, TextInput, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";
import { useState } from "react/cjs/react.development";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/core";

const { height, width } = Dimensions.get('window')
const Admin_product = ({ navigation }) => {



  date = new Date()

  const p = useRoute()



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


      let subcategories = breakArr(prod.subcategories.toString())

      prod.priceafterdisc = prod.price - ((prod.price * prod.discount) / 100)

      prod.subcategories = subcategories
      console.log(prod)

      if (p.params != undefined) {
        await firestore()
          .collection('products')
          .doc(p.params.item)
          .set(prod)
      }
      else {
        await firestore()
          .collection('products')

          .add(prod)
      }



    }
    catch (err) {
      console.log("Error", err)
    }
  }


  // const {height,width}=Dimensions.get('screen')
  const [prod, setprod] = useState
    (

      {

        pname: "",
        brand: "",
        cat: "",
        subcategories: "",
        material: "",

        priceafterdisc: 0,
        price: 0,
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


  return (
    <View style={{
      flex: 1, alignItems: 'center',
      backgroundColor: '#fff',
      alignContent: 'center', justifyContent: 'center'
    }}>

      <ScrollView style={{ flex: 1 }}>

        <View
          style={
            {
              justifyContent: 'center',
              alignItems: 'center',

              flex: 1,
              alignContent: "center"
            }
          }
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
          <TextInput
            value={prod.cat}
            onChangeText={val => setprod({ ...prod, cat: val })}
            style={styles.inputText}

            placeholder="Enter category(eg . Chair ,Bed ,Cabinet)"
          />
          <TextInput
            onChangeText={val => setprod({ ...prod, subcategories: val })}
            value={prod.subcategories.toString()}
            style={styles.inputText}
            placeholder="subcategories like office king media"
          />
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
            style={
              {
                flexDirection: "row",
                alignItems: "center",

                justifyContent: 'space-evenly'
              }
            }
          >
            <Text>
              Price :
            </Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={text => setprod({ ...prod, price: text })}
              value={prod.price}
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
          <TextInput
            onChangeText={text => setprod({ ...prod, img1: text })} t
            value={prod.img1}
            style={styles.inputTextImgLink}
            placeholder="Enter img Link 1"
          />
          <TextInput
            onChangeText={text => setprod({ ...prod, img2: text })}
            value={prod.img2}
            style={styles.inputTextImgLink}
            placeholder="Enter img Link 2"
          />

          <TextInput
            onChangeText={text => setprod({ ...prod, img3: text })}
            value={prod.img3}
            style={styles.inputTextImgLink}
            placeholder="Enter img3"
          />

          <TextInput
            onChangeText={text => setprod({ ...prod, img4: text })}
            value={prod.img4}
            style={styles.inputTextImgLink}
            placeholder="Enter img Link 4"
          />

          <View

            style={{
              flexDirection: 'row',
              alignItems: 'center'


            }}
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

            <Text style={styles.txtSubmit}>SUBMIT</Text>
          </TouchableOpacity>


        </View>

      </ScrollView>


    </View>
  )
}

const styles = StyleSheet.create
  (
    {
      inputText:
      {
        // marginHorizontal:10,
        marginVertical: 10,
        height: 50,

        width: width - 40,

        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        textAlign: 'center',
        borderColor: "#009DAE"
      },

      inputTextImgLink:
      {
        marginVertical: 10,
        height: 100,

        width: width - 40,
        alignSelf: "center",
        borderRadius: 20,
        borderWidth: 1,
        textAlign: 'center',
        borderColor: "#009DAE"

      },
      inputTextNumbers:
      {

        alignItems: 'center',
        textAlign: 'center',
        margin: 20,
        backgroundColor: '#009DAE',

        height: 50,
        width: 70,
        borderRadius: 20,
        borderWidth: 1
      },
      dimensionsContainer:
      {
        flexDirection: 'row',

        alignSelf: "center",
        justifyContent: 'space-around'
      },
      btnSubmit:
      {


        paddingHorizontal: 50,
        marginBottom: 0,
        margin: 20,
        backgroundColor: '#009DAE',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
      },
      inputTextDiscription:
      {


        height: 200,

        borderColor: '#009DAE',

        marginHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1
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