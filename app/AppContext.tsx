"use client";
import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";
import StorageManager from "../provider/StorageManager";

// Define the shape of the context value
interface AppContextType {
  accessToken: string | null; // accessToken can be a string or null
  setAccessToken: Dispatch<SetStateAction<string | null>>; // Setter for accessToken
}

// Create context with a default value of undefined (for TypeScript safety)
export const AppContext = createContext<AppContextType | undefined>(undefined);

const storageManager = new StorageManager();

// Define the props for the AppProvider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(storageManager.getAccessToken());

  useEffect(() => {
    storageManager.saveAccessToken(accessToken);
  }, [accessToken]);

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AppContext.Provider>
  );
};
