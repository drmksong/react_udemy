import React, { useState } from "react";

export const AuthContext = React.createContext({
    isAuth: false,
    login: () => {},
    logout: () => {}
});

const AuthContextProvider = (props) => {
    const [isAuthed, setIsAuthed] = useState(false);

    const loginHandler = () => {
        setIsAuthed(true);
    };

    const logoutHandler = () => {
        setIsAuthed(false);
    }
    return (
        <AuthContext.Provider value={{ isAuth: isAuthed, login: loginHandler, logout:logoutHandler }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
