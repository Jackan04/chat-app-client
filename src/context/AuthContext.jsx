import { useState, useEffect } from "react";
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

  const loadCurrentUser = async (authToken) => {
    try {
      const user = await authService.getCurrentUser(authToken);
      setCurrentUser(user);
    } catch {
      clearAuth();
    }
  };

  const login = async (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    await loadCurrentUser(token);
    navigate("/");
  };

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  useEffect(() => {
    if (!token) return;

    (async () => {
      await loadCurrentUser(token);
    })();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, login, logout, currentUser, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
