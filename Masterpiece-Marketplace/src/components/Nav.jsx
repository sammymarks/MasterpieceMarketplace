import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  return (
    <div className='Nav'>
      <div className="hamburger-icon" onClick={toggleMenu}>
        &#9776; 
      </div>

      <div className={`menu-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/artist-dashboard">Artist Dashboard</Link>
        <Link to="/buyer-dashboard">Buyer Dashboard</Link>
        <Link to="/discover">Discover</Link>
      </div>
    </div>
  );
};

export default Nav;
