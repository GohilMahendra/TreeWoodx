


import { stat } from "react-native-fs";
import {

 
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_FAILED,
    LOAD_COMMENTS_REQUEST,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_FAILED
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
           return {...state}
        case LOAD_COMMENTS_SUCCESS:
                      return Object.assign({},state)
        case LOAD_COMMENTS_FAILED:
            console.log(action.payload)
          
        default:
            return {...state}

    }

}
export default CommentReducer