import React, { useEffect, useState } from 'react';
import Nav from './Nav'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../App'; // Import the user context


const Header = () => {
  const { loggedInUser } = useUserContext();
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    if (loggedInUser) {
      const fetchProfilePic = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/users/${loggedInUser._id}`);
          if (response.data.profilePic) {
            setProfilePic(response.data.profilePic);
          }
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      };

      fetchProfilePic();
    }
  }, [loggedInUser]);

  const logoStyle = {
    display: 'block',
    margin: '0 auto',
  };

  const profilePicStyle = {
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    cursor: 'pointer', // Add a cursor to indicate it's clickable
  };

  return (
    <div className="Header">
      <Link to="/discover">
        <img
          id="logo"
          src="../src/assets/logo.png"
          alt="Logo"
          className="header-logo"
          style={logoStyle}
        />
      </Link>

      {loggedInUser && profilePic && (
        <Link to="/profile">
          <img
            src={profilePic}
            alt="Profile Pic"
            style={profilePicStyle}
          />
        </Link>
      )}

      <Nav />
    </div>
  );
};

export default Header;

