import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const MyProvider = ({ children }) => {
  const [AuthState, setAuthState] = useState(null);

  return (
    <AuthContext.Provider value={{ AuthState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(AuthContext);
};
