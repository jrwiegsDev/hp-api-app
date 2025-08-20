import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <nav className="nav-links">
        <NavLink to="/" className="nav-link">All Characters</NavLink>
        <NavLink to="/students" className="nav-link">Students</NavLink> {/* Add this */}
        <NavLink to="/staff" className="nav-link">Staff</NavLink>       {/* Add this */}
        <NavLink to="/spells" className="nav-link">Spells</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;