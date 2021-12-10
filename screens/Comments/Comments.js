import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, RefreshControl, StyleSheet } from "react-native";

import { FlatList } from "react-native";


import ReviewRatings from "../../components/Review/ReviewRatings";
import ReviewCard from "../../components/Review/reviewCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreReviews, FetchReviews, LoadExternalDetails } from "../../redux/Actions/CommentActions";

const Comments = () => {


    const key = useRoute().params.key

    const dispatch = useDispatch()

    const commentsLoading=useSelector(state => state.Comment.commentsLoading)
    const avg = useSelector(state => state.Comment.avg)
    const Comments = useSelector(state => state.Comment.Comments)

    useEffect
        (
            () => {
               
              fetchComments()
            },
            []
        )
 

    const fetchComments=()=>
    {
        dispatch(LoadExternalDetails(key))
        dispatch(FetchReviews(key))
    }
    const FetchMoreComments = () => {
        dispatch(fetchMoreReviews(key))
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


        <View style={styles.Container}>


                <FlatList
                    data={Comments}
                    ListHeaderComponent={
                       avg.total>0 && <ReviewRatings
                            avg={avg}
                        >
                        </ReviewRatings>
                    }
                    style={{ flex: 1 }}

                    refreshControl={
                        <RefreshControl
                        refreshing={commentsLoading}
                        onRefresh={()=>fetchComments()}
                        ></RefreshControl>
                    }
                    onEndReached={
                        ()=>FetchMoreComments()
                    }
                    scrollEnabled={true}
                    renderItem={itembuilder}

                    keyExtractor={item => item.email}
                >

                </FlatList>

        
        </View>

    )

}

const styles=StyleSheet.create
(
    {
        Container:
        {
            flex:1,
            backgroundColor:"#fff"
        }

    }
)
export default Comments