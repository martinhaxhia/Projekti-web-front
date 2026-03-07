import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Decode JWT safely
    const decodeToken = (jwt) => {
        try {
            return JSON.parse(atob(jwt.split(".")[1]));
        } catch {
            return null;
        }
    };
    // Load auth state on app start
    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            const decoded = decodeToken(storedToken);

            if (decoded && decoded.exp * 1000 > Date.now()) {
                setToken(storedToken);
                setUser(decoded);
            } else {
                localStorage.removeItem("token");
            }
        }

        setLoading(false);
    }, []);

    const login = (jwt) => {
        const decoded = decodeToken(jwt);
        localStorage.setItem("token", jwt);
        setToken(jwt);
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated: !!token,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
