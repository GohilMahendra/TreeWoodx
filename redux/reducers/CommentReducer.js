

import {

 
    
    LOAD_COMMENTS_REQUEST,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_FAILED,
    LOAD_EXTERNAL_DETAILS_REQUEST,
    LOAD_EXTERNAL_DETAILS_SUCCESS,
    LOAD_EXTERNAL_DETAILS_FAILED,
    LOAD_MORE_COMMENTS_FAILED,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILED,
    LOAD_MORE_COMMENTS_REQUEST
  } from "../Types/CommentTypes";



const initialstate={
    

    Comments:[],
    avg:{
        one:0,
        two:0,
        three:0,
        four:0,
        five:0,
        total:0,
        avg:0
    }
}


const CommentReducer=(state=initialstate,action)=>


{

    switch(action.type)
    {
        case LOAD_COMMENTS_REQUEST:
           
        case LOAD_COMMENTS_SUCCESS:
            console.log("COMMENT ADDED SUCCESSFULLYY")
            
        case LOAD_COMMENTS_FAILED:
            console.log(action.payload)
        case LOAD_MORE_COMMENTS_FAILED:
        case LOAD_MORE_COMMENTS_REQUEST:
        case LOAD_MORE_COMMENTS_FAILED:
        case ADD_COMMENT_REQUEST:
        case LOAD_EXTERNAL_DETAILS_REQUEST:
        case LOAD_EXTERNAL_DETAILS_SUCCESS:
        case LOAD_EXTERNAL_DETAILS_FAILED:
       
        default:
            return state

    }

}
export default CommentReducer