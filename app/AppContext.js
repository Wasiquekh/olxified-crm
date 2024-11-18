"use client";
import { createContext, useEffect, useState } from "react";
import StorageManager from "../provider/StorageManager";

export const AppContext = createContext();

const storageManager = new StorageManager();

export const AppProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(storageManager.getAccessToken());

  useEffect(()=>{
    storageManager.saveAccessToken(accessToken);
  },[accessToken]);

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AppContext.Provider>
  );
};
