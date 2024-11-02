import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

function cb(){
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(cb);
    useEffect(() => {
        user ? localStorage.setItem("user", JSON.stringify(user)) : localStorage.removeItem("item");
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
