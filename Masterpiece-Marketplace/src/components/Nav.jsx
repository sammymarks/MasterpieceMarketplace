import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='Nav'>
      <Link to="/">Home</Link>
      <Link to="/profile">My Profile</Link>
      <Link to="/artist-dashboard">Artist Dashboard</Link>
      <Link to="/buyer-dashboard">Buyer Dashboard</Link>
      <Link to="/discover">Discover</Link>
    </div>
  );
};

export default Nav;
