import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import {
    CHANGE_PASSWORD_FAILED,
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS,
    SIGN_IN_FAILED, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT_FAILED, SIGN_OUT_SUCCESS, SIGN_UP_FAILED, SIGN_UP_REQUEST
} from "../Types/AuthTypes";
import { Alert } from "react-native";
import { changeCartQuantity } from "./CartActions";
import { validateCred } from "../../functions/VarifyEmail";


export const loginUser = (email, password) => {
    return async (dispatch) => {
        try {

            if (email === "" || password === "") {
                Alert.alert("Filed are empty", "Please fill field with right Details")
                return
            }

            const validate = validateCred(email, password)

            if (!validate) {
              Alert.alert("invalid syntex", "Email or Password is not uniforrm")
           
                return
            }

            dispatch({ type: SIGN_IN_REQUEST })

            const user = await auth().signInWithEmailAndPassword(email, password)

            let admin = await firestore().collection('Admin').doc(auth().currentUser.uid).get()

            let isAdmin = false

            if (admin.exists) {
                isAdmin = true
            }

            dispatch({ type: SIGN_IN_SUCCESS, payload: { isAdmin: isAdmin } })

        }
        catch (err) {
            console.log(err)
            dispatch({ type: SIGN_IN_FAILED, payload: err })

        }
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        try {

            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let validate = re.test(String(email).toLowerCase());
        
            if (!validate) {
              Alert.alert("please add email", "Add email in email section for password link!!")
              return
            }

            dispatch({ type: CHANGE_PASSWORD_REQUEST })
            const sendlink = await auth().sendPasswordResetEmail(email)

            console.log(sendlink)
            dispatch({ type: CHANGE_PASSWORD_SUCCESS })
        }
        catch (err) {

            console.log(err)
            dispatch({ type: CHANGE_PASSWORD_FAILED, payload: err })

        }

    }
}

export const signOut = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: SIGN_OUT_FAILED })

            await auth().signOut()

            dispatch({ type: SIGN_OUT_SUCCESS })

        }
        catch (err) {
            console.log(err)
            dispatch({ type: SIGN_OUT_FAILED })
        }
    }
}

export const signUp = (username, email, password, isAdmin = false) => {
    return async (dispatch) => {
        try {
            const destination = isAdmin ? "admin" : "users"


            if (!validateCred(email, password) || username == "") {
                Alert.alert("Invalide Entries", "Make sure password length more then 8(eight)")

                return
            }

            const user = await auth().createUserWithEmailAndPassword(email, password)

            const uploadDetilas = await firestore().
                collection(destination)
                .doc(auth().currentUser.uid)
                .set(
                    {
                        email: email,
                        name: username
                    }
                )

            await auth().currentUser.updateProfile(
                {
                    displayName: username
                }
            )
            dispatch({ type: SIGN_UP_REQUEST })

        }
        catch (err) {
            console.log(err)
            dispatch({ type: SIGN_UP_FAILED })
        }
    }
}

