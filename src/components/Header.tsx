import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">Navbar</a>

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" aria-current="page">
              Read
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create" className="nav-link" aria-current="page">
              Create
            </NavLink>
          </li>
        </ul>
        <form className="d-flex"></form>
      </div>
    </nav>
  );
};

export default Header;
