import React, { useEffect, useReducer ,createContext} from "react"

const INITIAL_STATE ={
    countNotifications:{
        countNotification: JSON.parse(localStorage.getItem("countNotifications")) || null ,
    }
}

export const NotificationContext = createContext(INITIAL_STATE)

const NotificationContextReducer = (state,action) =>{
    switch(action.type){
        case "INCRIMENT":{
             return action.payload
        }
        case "DECREMENT":{
            return INITIAL_STATE
       }
        default:{
            return state
        }
    }
}

export const NotificationContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(NotificationContextReducer,INITIAL_STATE)
  
    useEffect(() => {
        localStorage.setItem("countNotifications", JSON.stringify(state.countNotification))
    }, [state.countNotification])

    return(
        <NotificationContext.Provider value={{countNotifications: state.countNotifications, dispatch}}>
            {children}
        </NotificationContext.Provider>
    )
}