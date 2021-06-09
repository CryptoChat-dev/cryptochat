import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'

const initialState = {
    theme: 'dark',
    oppositeTheme: 'light',
    modalColor: '#292929',
    key: null,
    roomName: null,
    username: null,
    error: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;