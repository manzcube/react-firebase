import React, { createContext, useReducer } from "react";

import authReducer from './AuthReducer';

const INITIAL_STATE = {
    currentUser: null
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

    function login(user) {
        dispatch({
            type: "LOGIN",
            payload: user
        })
    }

    function logout() {
        dispatch({
            type: "LOGOUT",
            payload: null
        })
    }

    return (
        <AuthContext.Provider 
            value={{
                currentUser: state.currentUser,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}