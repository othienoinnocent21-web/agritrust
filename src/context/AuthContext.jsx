
import { createContext, useState, useCallback } from "react";

import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return authService.getCurrentUser();
  });

  const [token, setToken] = useState(() => {
    return authService.getToken();
  });

  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token && !!user;

  // REAL BACKEND LOGIN
  const login = useCallback(async (email, password) => {
    setLoading(true);

    try {
      const data = await authService.login(email, password);

      /*
       * Spring Boot currently returns:
       *
       * {
       *   id: 2,
       *   name: "New Farmer",
       *   email: "newfarmer2@test.com",
       *   role: "FARMER"
       * }
       *
       * A real JWT will be added later.
       */

      const userData = data.user || data;

      // Temporary token until JWT authentication is implemented
      const userToken = data.token || "authenticated";

      setToken(userToken);
      setUser(userData);

      localStorage.setItem("token", userToken);
      localStorage.setItem("user", JSON.stringify(userData));

      return {
        success: true,
        data: {
          token: userToken,
          user: userData,
        },
      };
    } catch (error) {
      console.error("Login failed:", error);

      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Invalid email or password",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    authService.logout();

    setToken(null);
    setUser(null);
  }, []);

  // REGISTER
  const register = useCallback(async (userData) => {
    setLoading(true);

    try {
      const data = await authService.register(userData);

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Registration failed",
      };
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
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

