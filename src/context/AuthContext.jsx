import { createContext, useState, useCallback } from "react";
import authService from "../services/authService";
import devMockAuth from "../services/devMockAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const prodUser = authService.getCurrentUser();
    if (prodUser) return prodUser;
    const devAuth = devMockAuth.getStoredDevAuth();
    return devAuth?.user || null;
  });
  const [token, setToken] = useState(() => {
    const prodToken = authService.getToken();
    if (prodToken) return prodToken;
    const devAuth = devMockAuth.getStoredDevAuth();
    return devAuth?.token || null;
  });
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const devLogin = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { token: devToken, user: devUser } = devMockAuth.devLogin(email, password);
      setToken(devToken);
      setUser(devUser);
      return { success: true, data: { token: devToken, user: devUser } };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    devMockAuth.clearDevAuth();
    setToken(null);
    setUser(null);
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      const data = await authService.register(userData);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    devLogin,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
