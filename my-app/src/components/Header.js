import { React } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMyContext } from "../Context/AutheticationContext";

function Header() {
  const { setAuthState } = useMyContext();
  const logout = async () => {
    try {
      const response = await fetch(
        "https://booko-com.onrender.com/users/logout",
        {
          method: "POST",
        }
      );

      if (response.status === 200) {
        console.log("Logout successful");
        setAuthState({}); // Set authState to an empty object
        window.localStorage.removeItem("auth"); // Remove the auth item from localStorage
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <div className="bg-dark p-4">
        <div className="container-fluid d-flex p-3 navbar navbar-expand bg-dark navbar-light">
          <Link to="/Home" className="navbar-brand text-warning">
            BOOKO<span className="text-white">.com</span>
          </Link>
          <div className="collapse navbar-collapse justify-content-end ">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/favorites" className="nav-link text-warning">
                  <span className="text-warning d-none d-sm-inline">
                    Favorite
                  </span>
                  <FavoriteIcon />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link text-warning" onClick={logout}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="line bg-warning"></div>
    </div>
  );
}

export default Header;
