import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../App';


const Nav = () => {
  const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();

  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <div className='Nav'>
      <div className="hamburger-icon" onClick={toggleMenu}>
        &#9776;
      </div>

      <div className={`menu-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        {loggedInUser ?
          <>
            <Link to="/profile" onClick={closeMenu}>My Profile</Link>
            <Link to="/artist-dashboard" onClick={closeMenu}>Artist Dashboard</Link>
            <Link to="/buyer-dashboard" onClick={closeMenu}>Buyer Dashboard</Link>
          </>                
          :
          null
        }
        <Link to="/discover" onClick={closeMenu}>Discover</Link>
      </div>
    </div>
  );
};

export default Nav;
