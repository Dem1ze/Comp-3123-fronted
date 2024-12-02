import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Successfully logged out.");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <div>
        {location.pathname === "/signup" ? (
          <>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </>
        ) : location.pathname === "/login" ? (
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/signup")}
          >
            Register
          </button>
        ) : location.pathname === "/" ? (
          <>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/signup")}
            >
              Register
            </button>
          </>
        ) : (
          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
