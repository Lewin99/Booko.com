import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "./styles/loginSignup.css";
import LoginIcon from "@mui/icons-material/Login";
import { useMyContext } from "../Context/AutheticationContext";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const { AuthState, setAuthState } = useMyContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch(
        "https://booko-com.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const statusCode = response.status;

      const responseData = await response.json();
      const accessToken = responseData.Access_token;
      const expires = responseData.expiresIn;

      if (statusCode === 200) {
        const authData = {
          accessToken: accessToken,
          expiresIn: expires,
        };

        console.log("token", authData);
        setAuthState(authData);
        window.localStorage.setItem("auth", JSON.stringify(authData));
        navigate("/Home");
        setEmail("");
        setPassword("");
      } else {
        console.log("Login failed:", responseData.error);
        setLoginError(responseData.error);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };
  return (
    <div>
      <div className="bg-dark p-4">
        <div className="container-fluid d-flex p-3 navbar navbar-expand bg-dark navbar-light">
          <Link to="/" className="navbar-brand text-warning">
            BOOKO<span className="text-white">.com</span>
          </Link>
        </div>
      </div>
      <div className="line bg-warning"></div>
      <div className="title text-dark bg-warning">
        <h2>Login</h2>
      </div>

      <div className="FormWrapper">
        <div className="Form bg-dark">
          <div className="LoginIcon">
            <h1>Login</h1>
            <LoginIcon />
          </div>

          <div className="loginfailed">
            <h3></h3>
          </div>
          <div className="FormElement">
            <form className="formy" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: "100%" }}
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && (
                <div className="loginfailed d-flex justify-content-center align-items-center text-danger p-3">
                  <h5>{loginError}!!!!!</h5>
                </div>
              )}
              <div className="SubmitButton">
                <div className="p-1 ">
                  <button type="submit" className="btn mt-2 btn-warning">
                    Login
                  </button>
                </div>
              </div>
              <div className="pt-2 ">
                <Link to="/signup" className="nav-link text-warning">
                  New here?Click to signup.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;
