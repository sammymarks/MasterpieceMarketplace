import React from 'react';
import { Link, useParams, useNavigate, Routes, Route } from "react-router-dom"
import HomePage from './main-components/HomePage';
import MyArtistProfile from './my-artist-profile/MyArtistProfile';
import UserProfile from './user-profile-details/UserProfile';
import MyBuyerAuctions from './my-buyer-profile/MyBuyerAuctions';
import Discover from './discover-components/Discover';
import LoginPage from './main-components/LoginPage';
import SignUpPage from './main-components/SignUpPage';
import ArtworkDetails from './details-components/ArtworkDetails';
import ArtistDetails from './details-components/ArtistDetails'
import AuctionDetails from './details-components/AuctionDetails'
import CreateArtwork from './my-artist-profile/CreateArtwork';
import CreateAuction from './my-artist-profile/CreateAuction';
import CreateBid from './details-components/CreateBid';


const Main = () => {
  return (
      <div className="Main">
        {/* <h5>This is Main</h5> */}
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/artwork-details" element={<ArtworkDetails />}/>
          <Route path="/artist-details" element={<ArtistDetails />}/>
          <Route path="/auction-details" element={<AuctionDetails />}/>
          <Route path="/artist-dashboard" element={<MyArtistProfile/>} />
          <Route path="/create-artwork" element={<CreateArtwork/>} />
          <Route path="/create-auction" element={<CreateAuction/>} />
          <Route path="/create-bid" element={<CreateBid/>} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/buyer-dashboard" element={<MyBuyerAuctions/>} />
          <Route path="/discover" element={<Discover/>}/>
        </Routes>
      </div>
  );
};

export default Main;