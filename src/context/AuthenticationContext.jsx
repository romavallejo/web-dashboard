import { createContext, useContext, useState, useCallback, useMemo } from "react";
import {authenticateCredentials,refreshAccessToken}  from "../api/authenticationServices.js"

const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {

    const [accessToken,setAccessToken] = useState(null);
    const [refreshToken,setRefreshToken] = useState(null);
    const [loadingTokens,setLoadingTokens] = useState(true);

    useEffect(() => {
        setLoadingTokens(true);
        if (typeof window === "undefined") return;
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

    /*
    const login = useCallback(
        async (email:, password: string) => {
            const response = await axios.post("http://localhost:4000/auth/login", {
                email,
                password,
            });
            if (response.status !== 500) {
                const tokens: Tokens = {
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token,
                };
                setTokens(tokens);
            } else {
                throw new Error("Login failed");
            }
        }
    ,[setTokens]);
    */

    /*
    const tryRefreshToken = useCallback(async (): Promise<boolean> => {
        if (!refreshToken) return false;
        try {
        const response = await axios.post("http://localhost:4000/auth/refresh", {
            refreshToken,
        });
        if (response.status === 201) {
            const tokens: Tokens = {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            };
            setTokens(tokens);
            return true;
        } else {
            clearTokens();
            return false;
        }
        } catch (error) {
        clearTokens();
        return false;
        }
        }, [refreshToken, setTokens, clearTokens]);
        */
    
    const values = useMemo(() => ({
      accessToken,
      refreshToken,
      isAuthenticated: accessToken != null,
      login: login,
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
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};