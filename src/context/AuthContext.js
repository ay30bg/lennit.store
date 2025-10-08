import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    // Initialize auth state from localStorage if available
    const token = localStorage.getItem("authToken");
    return token ? { token, user: null } : null;
  });

  const login = ({ user, token }) => {
    setAuth({ user, token });
    localStorage.setItem("authToken", token); // Persist token
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
