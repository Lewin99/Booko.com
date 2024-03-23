import React, { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useMyContext } from "../Context/AutheticationContext";

const RequireAuth = () => {
  const { AuthState } = useMyContext();
  const location = useLocation();
  const [isAccessTokenValid, setIsAccessTokenValid] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const checkValidity = () => {
      if (AuthState?.expiresIn) {
        const currentTime = Date.now();
        const expirationTime = AuthState.expiresIn;
        const isValid = expirationTime > currentTime;
        setIsAccessTokenValid(isValid);
      } else {
        setIsAccessTokenValid(false);
      }
    };

    checkValidity();

    const validityInterval = setInterval(() => {
      checkValidity();
    }, 60 * 60 * 1000);

    setAuthReady(true);

    return () => {
      clearInterval(validityInterval);
    };
  }, [AuthState.expiresIn]);

  if (!authReady) {
    return null;
  }

  if (isAccessTokenValid) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
