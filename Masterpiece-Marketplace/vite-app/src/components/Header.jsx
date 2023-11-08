import React from 'react';
import Nav from './Nav'

const Header = () => {
  
  return (
    <div className='Header'>
      <img id='logo' src='../src/assets/logo.png' alt="Logo" className="header-logo" />

      <Nav />
    </div>
  );
};

export default Header;