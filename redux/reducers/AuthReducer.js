import { CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, SIGN_IN_FAILED, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT_FAILED, SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_UP_FAILED, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "../Types/AuthTypes"



const initialState = {



    loginLoading: false,
    loginError: null,



    isadmin:true,


    logoutLoading: false,
    logoutError: null,


    registerLoading: false,
    registerError: null,

    changePasswordLoading: false,
    changePasswordError: null

}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {


        case SIGN_IN_REQUEST:
            return {
                ...state,
                loginLoading: true,
                loginError: null
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                isadmin:action.payload.isAdmin
            }
        case SIGN_IN_FAILED:
            return {
                ...state,
                loginLoading: false,
                loginError: action.payload
            }


        case SIGN_OUT_REQUEST:
            return {
                ...state,
                loginLoading: true,
                loginError: null
            }
        case SIGN_OUT_SUCCESS:
           return initialState

        case SIGN_OUT_FAILED:
            return {
                ...state,
                logoutLoading: false,
                logoutError: action.payload
            }

        case SIGN_UP_REQUEST:
            return {
                ...state,
                registerLoading: true,
                registerError: null
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                registerLoading: false,
            }
        case SIGN_UP_FAILED:
            return {
                ...state,
                registerLoading: false,
                registerError: action.payload
            }
        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                changePasswordLoading: true,
                changePasswordError: null
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changePasswordLoading: false,
            }
        case CHANGE_PASSWORD_FAILED:
            return {
                ...state,
                changePasswordLoading: false,
                changePasswordError: action.payload
            }


        default:
            return state

    }

}

export default AuthReducer