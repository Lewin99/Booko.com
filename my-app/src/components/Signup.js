import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "./styles/loginSignup.css";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    try {
      const response = await fetch("https://booko-com.onrender.com/users", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/");
        setEmail("");
        setPassword("");
      } else {
        const res = await response.json();
        if (res.email) {
          setEmailError(res.email);
        }
        if (res.password) {
          setPasswordError(res.password);
        }
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    setEmailError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    setPasswordError(null);
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
        <h2>Sign up</h2>
      </div>
      <div className="FormWrapper">
        <div className="Form bg-dark">
          <div className="LoginIcon">
            <h1>Sign up</h1>
            <AppRegistrationIcon />
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
                  onChange={handleEmailChange}
                  required
                  style={{ width: "100%" }}
                />
                {emailError && (
                  <div className="emailError text-danger p-1">
                    <h5>{emailError}</h5>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && (
                  <div className="passwordError text-danger p-2">
                    <h5>{passwordError}</h5>
                  </div>
                )}
              </div>
              <div className="SubmitButton">
                <button type="submit" className="btn mt-2 btn-warning">
                  Sign up
                </button>
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
