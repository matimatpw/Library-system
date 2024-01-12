import React from "react";
import { NavLink } from "react-router-dom";
import "../css/navBar.css";
import { getIsAdmin } from "../services/authService";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        Library
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/">
            Home
          </NavLink>

          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}

          {user && (
            <React.Fragment>
              {getIsAdmin() && (
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/addbookform">
                    Add
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/deletebookform">
                    Delete
                  </NavLink>
                </React.Fragment>
              )}
              {!getIsAdmin() && (
                <React.Fragment>
                  <NavLink className="nav-item nav-link" to="/calendar">
                    Calendar
                  </NavLink>
                  <NavLink className="nav-item nav-link" to="/profile">
                    Profile
                  </NavLink>
                </React.Fragment>
              )}
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
