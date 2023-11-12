import React, { useEffect, useState } from 'react';
import Nav from './Nav'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../App'; // Import the user context


const Header = () => {
  const { loggedInUser } = useUserContext(); // Get loggedInUser from the context
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    if (loggedInUser) {
      // Fetch the profile picture URL from localhost:3001/users
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
    borderRadius: '50%', // Make it circular
    width: '50px', // Adjust the size as needed
    height: '50px',
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
        <img
          src={profilePic}
          alt="Profile Pic"
          style={profilePicStyle}
        />
      )}

      <Nav />
    </div>
  );
};

export default Header;