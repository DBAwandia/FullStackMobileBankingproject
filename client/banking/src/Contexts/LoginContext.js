import  React, { createContext, useEffect, useReducer } from "react"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loadings: false,
    error: null
}

export const LoginContext = createContext(INITIAL_STATE)

const LoginReducer = (state, action) =>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user: null,
                loadings: true,
                error: null
            }
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                loadings: false,
                error: null
            }
        case "LOGIN_ERROR":
                return{
                user: null,
                loadings: false,
                error: action.payload
                }
        case "LOGOUT":
            return{
                user: null,
                loadings: false,
                error: null
            }
        default:
            return state
    }

    
}

export const LoginContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE)

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])
return(
    <LoginContext.Provider value={{user: state.user, loadings: state.loadings, error: state.error,dispatch}}>
        {children}
    </LoginContext.Provider>
)
}