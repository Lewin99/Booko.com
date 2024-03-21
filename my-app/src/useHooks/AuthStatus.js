import React, { createContext, useContext, useState, useEffect } from "react";
import { isLoggedIn } from "./isLoggedIn";

const AuthStatusContext = createContext();

export const useAuthStatus = () => {
  return useContext(AuthStatusContext);
};

export const AuthStatusProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthenticationStatus = async () => {
      try {
        const isAuthenticated = await isLoggedIn();
        setLoggedIn(isAuthenticated);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setLoggedIn(false);
        setIsLoading(false);
      }
    };

    fetchAuthenticationStatus();
  }, []);

  return (
    <AuthStatusContext.Provider value={{ loggedIn, isLoading }}>
      {children}
    </AuthStatusContext.Provider>
  );
};
