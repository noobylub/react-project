import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProviderContext } from "../../../App";

const Navigation = () => {
  const { loggedIn } = useContext(ProviderContext);

  return (
    <nav className="navigations">
      {loggedIn ? (
        <ul className="nav-links">
          <li>
            <NavLink to="/" exact>
              ALL USERS
            </NavLink>
          </li>
          <li>
            <NavLink to="/places">MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to="/new-place">ADD PLACE</NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav-links">
          <li>
            <NavLink to="/" exact>
              ALL USERS
            </NavLink>
          </li>
          <li>
            <NavLink to="/authenticate">AUTHENTICATE</NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
