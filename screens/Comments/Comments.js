import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { FlatList } from "react-native";


import ReviewRatings from "../../components/Review/ReviewRatings";
import ReviewCard from "../../components/Review/reviewCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreReviews, FetchReviews, LoadExternalDetails } from "../../redux/Actions/CommentActions";

const Comments = () => {


    const key = useRoute().params.key

    const dispatch = useDispatch()

    const avg = useSelector(state => state.Comment.avg)
    const Comments = useSelector(state => state.Comment.Comments)
    const lastCommentIndex = useSelector(state => state.Comment.lastCommentIndex)

    console.log(Comments+"COMMENTS")

    useEffect
        (
            () => {
                dispatch(LoadExternalDetails(key))
            },
            []
        )
    useEffect
        (

            () => {


                dispatch(FetchReviews(key))

            }
            , []

        )
    
    const FetchMoreComments=()=>
    {
        dispatch(fetchMoreReviews(key,lastCommentIndex))
    }

    const itembuilder = ({ item, index }) => {

        return (

            <ReviewCard

                rev={item}
            >

            </ReviewCard>
        )
    }



    return (


        <View style={{ flex: 1 }}>

            <View style={{ flex: 1 
            ,backgroundColor:'#fff'
            }}>

                <ReviewRatings

                    avg={avg}
                >

                </ReviewRatings>


                <FlatList
                    data={Comments}
                    style={{ flex: 1 }}

                    scrollEnabled={true}
                    renderItem={itembuilder}

                    keyExtractor={item => item.email}
                >

                </FlatList>

            </View>
        </View>

    )

}
export default Comments