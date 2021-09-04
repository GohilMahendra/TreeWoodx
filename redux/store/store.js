


import { 
    applyMiddleware,
combineReducers,
createStore

 } from "redux";

 import CartReducer from "../reducers/CartReducer";
import thunk from "redux-thunk";
import CommentReducer from "../reducers/CommentReducer";
 const rootReducer=combineReducers
 (
     {
         Cart:CartReducer,
         Comment:CommentReducer
     }
 )
 

 const middleware=applyMiddleware(thunk)

 const store=createStore(rootReducer,middleware)
 export default store

