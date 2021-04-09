import React from 'react';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
    return (
        <nav className="navigations">
            <ul className="nav-links">
                <li>
                    <NavLink to="/" exact>ALL USERS</NavLink>
                </li>
                <li>
                    <NavLink to="/places">MY PLACES</NavLink>
                </li>
                <li>
                    <NavLink to="/new-place">ADD PLACE</NavLink>
                </li>
                <li>
                    <NavLink to="/authenticate">AUTHENTICATE</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
