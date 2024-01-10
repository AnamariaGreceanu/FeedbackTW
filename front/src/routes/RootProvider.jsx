import React from "react";

import { useState } from "react";

export const RootContext = React.createContext()

function RootProvider({ children }){
    const [user, setUser] = useState(null);
    const [typeUser, setTypeUser] = useState('')

    const context = {
        user: user,
        setUser: setUser,
        typeUser: typeUser,
        setTypeUser: setTypeUser,
    }

    return (<RootContext.Provider value={context}>
        {children}
    </RootContext.Provider>)
} 

export default RootProvider;