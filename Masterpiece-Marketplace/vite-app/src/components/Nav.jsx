import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../App';

const Nav = () => {
  const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();

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
        {loggedInUser ?
          <>
            <Link to="/profile">My Profile</Link>
            <Link to="/artist-dashboard">Artist Dashboard</Link>
            <Link to="/buyer-dashboard">Buyer Dashboard</Link>  
          </>                
          :
          null
        }
        <Link to="/discover">Discover</Link>
      </div>
    </div>
  );
};

export default Nav;
