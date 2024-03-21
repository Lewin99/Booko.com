import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { MyProvider, useMyContext } from "./Context/AutheticationContext";
import Home from "./components/Home";
import Details from "./components/Details";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import Favorites from "./components/Favorites";
import Nomatch from "./components/Nomatch";

function ProtectedRoute({ element }) {
  const { AuthState } = useMyContext();
  console.log("intial authstate value", AuthState);

  if (!AuthState) {
    return <Navigate to="/" />;
  }

  return element;
}

function App() {
  return (
    <div className="App">
      <MyProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Signup" element={<Signup />} />

          <Route path="/Home" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="Details/:id"
            element={<ProtectedRoute element={<Details />} />}
          />
          <Route
            path="Favorites"
            element={<ProtectedRoute element={<Favorites />} />}
          />

          <Route path="*" element={<Nomatch />} />
        </Routes>
      </MyProvider>
    </div>
  );
}

export default App;
