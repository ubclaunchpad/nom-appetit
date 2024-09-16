import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, username: string, password: string) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}
const AuthContext = createContext<AuthProps>({});

const TOKEN_KEY = "my-jwt-token";
const API_URL = "http://127.0.0.1:5000";

export const useSession = () => {
  return useContext(AuthContext);
};

export const SessionProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token, authenticated: true });
        console.log("TOKEN LOADED FROM STORAGE");
      }
    };
    loadToken();
  }, []);

  const register = async (email: string, username: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/createUser`, { email, username, password });
      
    } catch (error) {
      return { error: true, msg: (error as any).response.data.message };
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/login`, { username, password });
      setAuthState({
        token: result.data.token,
        authenticated: true,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      console.log("LOADED TOKEN INTO STORAGE");
      return result;

    } catch (error) {
      return { error: true, msg: (error as any).response.data.message };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      console.log("DELETED TOKEN FROM STORAGE");
      axios.defaults.headers.common["Authorization"] = "";
      setAuthState({
        token: null,
        authenticated: false,
      });

    } catch (error) {
      return { error: true, msg: (error as any).response.data.message };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
