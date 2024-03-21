import React from "react";
import Header from "./Header";
import "./styles/notfound.css";
import { Link } from "react-router-dom";

function Nomatch() {
  return (
    <div className="NomatchWrapper">
      <Header />
      <div className="NotFound container-fluid text-dark">
        <div className="all text-dark">
          <h1 className="text-warning">404 Not Found</h1>
          <p className="text-dark">
            The page you're looking for does not exist.
          </p>
          <Link to="/Home">
            <h3 className="text-dark ">Go back to BOOKO home page</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nomatch;
