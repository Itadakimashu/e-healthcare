// src/context/AppContext.jsx
import React, { createContext, useState } from "react";
import { doctors } from "../assets/assets";


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [whoLoggedIn, setwhoLoggedIn] = useState(null);
    const value = { doctors, whoLoggedIn, setwhoLoggedIn };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
