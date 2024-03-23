import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useMyContext } from "./Context/AutheticationContext";
import Home from "./components/Home";
import Details from "./components/Details";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import Favorites from "./components/Favorites";
import Nomatch from "./components/Nomatch";

function PrivateRoute({ element, ...rest }) {
  const { AuthState } = useMyContext();

  return AuthState ? React.cloneElement(element, rest) : <Navigate to="/" />;
}

function App() {
  const { setAuthState } = useMyContext();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const storedAuthData = JSON.parse(window.localStorage.getItem("auth"));
    console.log("Stored Auth Data:", storedAuthData);

    if (storedAuthData) {
      setAuthState(storedAuthData);
    }
    setAuthReady(true);
  }, [setAuthState]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Signup" element={<Signup />} />

        {authReady && (
          <>
            <PrivateRoute path="/Home" element={<Home />} />
            <PrivateRoute path="Details/:id" element={<Details />} />
            <PrivateRoute path="Favorites" element={<Favorites />} />
          </>
        )}
        <Route path="*" element={<Nomatch />} />
      </Routes>
    </div>
  );
}

export default App;
