import React from "react";
import { NavLink } from "react-router-dom";
import "../css/navBar.css";

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
          <NavLink className="nav-item nav-link" to="/addbookform">
            Add
          </NavLink>
          <NavLink className="nav-item nav-link" to="/deletebookform">
            Delete
          </NavLink>

          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
              <NavLink className="nav-item nav-link" to="/calendar">
                Calendar
              </NavLink>
            </React.Fragment>
          )}

          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                Profile
              </NavLink>
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
