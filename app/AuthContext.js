"use client";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    email: "",
  });

  const saveAuthData = (email) => {
    setAuthData({ email });
  };

  return (
    <AuthContext.Provider value={{ authData, saveAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
