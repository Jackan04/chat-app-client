import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./auth-context.js";
import { useNavigate } from "react-router-dom";
import AuthService from "../api/authService.js";

const authService = new AuthService();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const clearAuth = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setToken(null);
  };

  const loadCurrentUser = useCallback(async () => {
    if (!token) return;

    try {
      const user = await authService.getCurrentUser(token);
      setCurrentUser(user);
    } catch {
      clearAuth();
    }
  }, [token]);

  const login = async (authToken) => {
    localStorage.setItem("token", authToken);
    setToken(authToken);

    try {
      const user = await authService.getCurrentUser(authToken);
      setCurrentUser(user);
    } catch {
      clearAuth();
      return;
    }

    navigate("/");
  };

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  useEffect(() => {
    if (!token) return;

    (async () => {
      await loadCurrentUser();
    })();
  }, [token, loadCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        currentUser,
        loadCurrentUser,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
