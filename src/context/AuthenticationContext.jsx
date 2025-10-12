import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {authenticateCredentials,refreshAccessToken}  from "../api/authenticationServices.js"

const AuthenticationContext = createContext();

const VALID_ROLE = 2;

function validateToken(token) {
    if (!token || typeof token !== 'string') {
        return { valid: false, reason: 'Invalid token format' };
    }
    
    const parts = token.split('.');
    if (parts.length !== 3) {
        return { valid: false, reason: 'Invalid JWT structure' };
    }
    
    try {
        const payload = JSON.parse(atob(parts[1]));
        
        if (!payload.exp) {
            return { valid: false, reason: 'Missing expiration' };
        }
        
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp < now) {
            return { valid: false, reason: 'Token expired' };
        }
        if (payload.profile.role_id !== VALID_ROLE) {
            return { valid: false, reason: 'Insufficient role' };
        }
        return { valid: true, payload };
    } catch (e) {
        return { valid: false, reason: 'Failed to decode token' };
    }
}


export function AuthenticationProvider({ children }) {

    const [accessToken,setAccessToken] = useState(null);
    const [refreshToken,setRefreshToken] = useState(null);
    const [loadingTokens,setLoadingTokens] = useState(true);

    useEffect(() => {
        setLoadingTokens(true);
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        const { valid } = validateToken(storedAccessToken);

        if (!valid) {
            setAccessToken(null);
            setRefreshToken(null);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }

        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
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
            const { valid } = validateToken(tokens.accessToken);
            if (!valid) throw new Error("Invalid access token received");
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
    
    const isAuthenticated = useMemo(() => {
        if (!accessToken) return false;
        const { valid } = validateToken(accessToken);
        return valid;
    }, [accessToken]);

    const values = useMemo(() => ({
      accessToken,
      refreshToken,
      isAuthenticated,
      login,
      logout,
      setTokens,
      tryRefreshToken,
      loadingTokens,
    }),
    [
      accessToken,
      refreshToken,
      isAuthenticated,
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