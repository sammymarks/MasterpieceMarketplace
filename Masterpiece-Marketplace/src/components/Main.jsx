import React from 'react';
import { Link, useParams, useNavigate, Routes, Route } from "react-router-dom"
import HomePage from './main-components/HomePage';
import MyArtistProfile from './my-artist-profile/MyArtistProfile';
import UserProfile from './user-profile-details/UserProfile';
import MyBuyerAuctions from './my-buyer-profile/MyBuyerAuctions';
import Discover from './discover-components/Discover';


const Main = () => {
  return (
      <div className="Main">
        <h5>This is Main</h5>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/artist-dashboard" element={<MyArtistProfile/>} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/buyer-dashboard" element={<MyBuyerAuctions/>} />
          <Route path="/discover" element={<Discover/>}/>
        </Routes>
      </div>
  );
};

export default Main;
