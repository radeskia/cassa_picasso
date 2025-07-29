import { createContext, useContext, useEffect, useState } from "react";

// interface AuthContextStateProps {
//   currentUser: string;
//   updateUser: (user: string) => void;
// }

const initialState = {};
const AuthContext = createContext(initialState);
const { Provider } = AuthContext;

const AuthContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(() => {
        return localStorage.getItem("USER")
            ? localStorage.getItem("USER") || ""
            : "";
    });

    useEffect(() => {
        if (!userToken) {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }, [userToken]);

    const handleUserChange = (user) => {
        setUserToken(user);
    };

    const contextValue = {
        currentUser: userToken,
        updateUser: handleUserChange,
    };

    return <Provider value={contextValue}>{children}</Provider>;
};

const useAuth = () => useContext(AuthContext);
export { AuthContextProvider, useAuth, AuthContext };
