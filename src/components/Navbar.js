import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for active styling
import './Navbar.css';
import logo from '../assets/UPM_W4.png';

const Navbar = () => {
  return (
    <nav className="side-nav">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            View Submissions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/status"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Application Status
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Manage Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/regions"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Manage Regions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
