import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {authenticateCredentials,refreshAccessToken}  from "../api/authenticationServices.js"

const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {

    const [accessToken,setAccessToken] = useState(null);
    const [refreshToken,setRefreshToken] = useState(null);
    const [loadingTokens,setLoadingTokens] = useState(true);

    useEffect(() => {
        setLoadingTokens(true);
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        if (storedAccessToken && storedRefreshToken) {
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
        }
        setLoadingTokens(false);
    }, []);

    const setTokens = useCallback(tokens=>{
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
        if (typeof window === "undefined") return;
        localStorage.setItem("accessToken",tokens.accessToken)
        localStorage.setItem("refreshToken",tokens.refreshToken)
    },[]);

    const clearTokens = useCallback(() => {
        setAccessToken(null);
        setRefreshToken(null);
        if (typeof window === "undefined") return;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }, []);

    const logout = useCallback(() => {
        clearTokens();
    }, [clearTokens]);

    const login = useCallback(async (email, password) => {
        try {
            const tokens = await authenticateCredentials(email,password);
            setTokens(tokens);
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    },[setTokens]);

    const tryRefreshToken = useCallback(async () => {
        if (!refreshToken) return false;
        try {
            const tokens = await refreshAccessToken(refreshToken)
            setTokens(tokens);
            return true
        } catch(err) {
            clearTokens();
            return false;
        }
    }, [refreshToken, setTokens, clearTokens])
    
    const values = useMemo(() => ({
      accessToken,
      refreshToken,
      isAuthenticated: accessToken != null,
      login,
      logout,
      setTokens,
      tryRefreshToken,
      loadingTokens,
    }),
    [
      accessToken,
      refreshToken,
      login,
      logout,
      setTokens,
      tryRefreshToken,
      loadingTokens,
    ]
  );

    return (
        <AuthenticationContext.Provider value={values}>
        {children}
        </AuthenticationContext.Provider>
    );

}

export const useAuthentication = () => {
    const context = useContext(AuthenticationContext);
    if (!context) {
        throw new Error("useAuthentication must be used within an AuthenticationProvider");
    }
    return context;
};