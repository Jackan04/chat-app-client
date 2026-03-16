import { useState } from "react";
import { AuthContext } from "./auth-context.js";
import { useNavigate } from "react-router-dom";

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
