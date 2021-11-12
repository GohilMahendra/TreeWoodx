


import { 
    applyMiddleware,
combineReducers,
createStore

 } from "redux";

 import CartReducer from "../reducers/CartReducer";
import thunk from "redux-thunk";
import CommentReducer from "../reducers/CommentReducer";
import ProductReducer from "../reducers/ProductReducer";
import SimilarReducer from "../reducers/SimilarReducer";
import FeaturedReducer from "../reducers/FeaturedReducer";
import OrderReducer from "../reducers/OrderReducer";
import SearchReducer from "../reducers/SearchReducer";
 const rootReducer=combineReducers
 (
     {
         Cart:CartReducer,
         Comment:CommentReducer,
         Products:ProductReducer,
         Similar:SimilarReducer,
         Featured:FeaturedReducer,
         Orders:OrderReducer,
         Search:SearchReducer
     }
 )
 

 const middleware=applyMiddleware(thunk)

 const store=createStore(rootReducer,middleware)
 export default store

