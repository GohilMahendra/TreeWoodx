import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';


const OrderStatusCard = ({status}) => {


    console.log(status)

    const getProgress=()=>
    {
        switch(status)
        {
            case "Ordered":
                return 0.25
            case "Packaged":
                return 0.50
            case "Shipped":
                return 0.75
            case "Delivered":
                return 1
            default:
             return 0
        }
    }
    const { height, width } = Dimensions.get('window')
    const progress =getProgress()
    console.log(progress)
    return (

        <View
            style={styles.Container}
        >
            <ProgressBar
                style={styles.progressBar}
                visible={true}
                color="green"
                progress={progress}

            ></ProgressBar>
            <View
                style={styles.statusContainer}
            >
               
               <View
                    style={styles.stepConatainer}
                >
                    <View
                        style=
                        {[{ backgroundColor: (progress >= 0.25) ? "green" : "#fff" }, styles.statusViewContainer]}

                    >
                        <FontAwesome5Icon
                            name="file-alt"
                            size={25}
                            color={progress>=0.25?"#fff":"black"}
                        ></FontAwesome5Icon>

                    </View>
                    <Text>Packaged</Text>
               </View>
                <View
                    style={styles.stepConatainer}
                >
                    <View
                        style=
                        {[{ backgroundColor: (progress) >= 0.50 ? "green" : "#fff" }, styles.statusViewContainer]}

                    >
                        <FontAwesome5Icon
                            name="box"
                            size={25}
                            color={progress>=0.50?"#fff":"black"}
                        ></FontAwesome5Icon>

                    </View>
                    <Text>Packaged</Text>
                </View>
                <View
                    style={styles.stepConatainer}
                >
                    <View
                        style=
                        {[styles.statusViewContainer, { backgroundColor: (progress) >= 0.75 ? "green" : "#fff", }]}

                    >
                        <FontAwesome5Icon
                            name="truck"
                            size={25}
                            color={progress>=0.75?"#fff":"black"}
                        ></FontAwesome5Icon>

                    </View>
                    <Text>Shipped</Text>
                </View>
                <View
                    style={styles.stepConatainer}
                >
                    <View
                        style=
                        {[styles.statusViewContainer, { backgroundColor: (progress) >= 1 ? "green" : "#fff", }]}

                    >
                        <FontAwesome5Icon
                            name="home"
                            size={25}
                            color={progress>=1?"#fff":"black"}
                        ></FontAwesome5Icon>

                    </View>
                    <Text>Delivered</Text>
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
                height: 70,
                
                width:'100%',
                marginVertical:20,
                justifyContent: "center",
                //  width:width

            },
            progressBar:
            {
                height: 10,
                borderRadius: 15,
                width: "90%",
                alignSelf: "center"
                //  backgroundColor:"green"
            },
            statusContainer:
            {
                position: "absolute",
                height:'100%',
                width: "100%",
                alignItems:'center',
                justifyContent: "space-between",
                flexDirection: 'row'
            },
            stepConatainer:
            {
                alignItems: "center"
            },
            statusViewContainer:
            {
                height: 70,
                justifyContent: "center",
                alignItems: 'center',
                width: 70,
                elevation: 15,
                borderRadius: 70
            }





        }
    )
export default OrderStatusCard