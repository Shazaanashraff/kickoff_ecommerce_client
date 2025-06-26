import React, { createContext, useContext } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext({ backendUrl });

export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ backendUrl }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);