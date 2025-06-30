// src/context/auth/AuthProvider.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  nama: string;
  email: string;
  
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
  isLoading: true,
});

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // On mount, pull from localStorage
  useEffect(() => {
    const t = localStorage.getItem("authToken");
    const u = localStorage.getItem("authUser");
    if (t && u) {
      setToken(t);
      setUser(JSON.parse(u));
      setIsLoggedIn(true)
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, userData: User) => {
    // save both to state
    setToken(newToken);
    setUser(userData);
    // persist
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("authUser", JSON.stringify(userData));

    setIsLoggedIn(true)
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    navigate("/login?loggedOut=true", { replace: true });
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLoggedIn: Boolean(token),
    isLoading,
  };

  // Wait until we know logged‑in state before rendering children
  if (isLoading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
