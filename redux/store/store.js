


import { 
    applyMiddleware,
combineReducers,
createStore

 } from "redux";

 import CartReducer from "../reducers/CartReducer";
import thunk from "redux-thunk";
 const rootReducer=combineReducers
 (
     {
         Cart:CartReducer
     }
 )
 

 const middleware=applyMiddleware(thunk)

 const store=createStore(rootReducer,middleware)
 export default store

