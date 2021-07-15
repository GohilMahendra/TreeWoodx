import { } from "react-redux";
import { combineReducers } from "redux";
import { user } from "./user";


const Reducers=
combineReducers(
    {
        UserState:user
    }
)


export default Reducers