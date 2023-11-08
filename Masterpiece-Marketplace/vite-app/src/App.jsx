import { useState, createContext, useContext} from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}
const placeholder = {
"_id": "654a48398bc0887a57b0aca0",
"username": "BlenVanGogh",
"password": "ears",
"address": "12 10th St, Zundert, Netherlands",
"profilePic": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
"isAdmin": false,
"isArtist": true,
"artistDescription": "I am GOAT and deeply troubled",
"followedArtists": [],
"followedAuctions": [],
"createdAt": "2023-11-07T14:22:49.515Z",
"updatedAt": "2023-11-07T14:22:49.515Z",
"__v": 0
}
function App() {
  const [loggedInUser, setLoggedInUser] = useState(placeholder);
  const [userArtwork, setUserArtwork] = useState([]);
  const [userAuctions, setUserAuctions] = useState([]);
  const [userBids, setUserBids] = useState([]);
  const [detailsArtwork, setDetailsArtwork] = useState(null);
  const [detailsAuctions, setDetailsAuctions] = useState(null);
  const [detailsArtists, setDetailsArtists] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [artworkDetailID, setArtworkDetailID] = useState(null)
  const [artistkDetailID, setArtistkDetailID] = useState(null)
  const [auctionDetailID, setAuctionDetailID] = useState(null)

  

  
  
  return (
    <div className='App'>
     <UserContext.Provider
        value={{
          loggedInUser, setLoggedInUser,
          userArtwork, setUserArtwork,
          userAuctions, setUserAuctions,
          userBids, setUserBids,
          detailsArtwork, setDetailsArtwork,
          detailsAuctions, setDetailsAuctions,
          detailsArtists, setDetailsArtists,
          isFollowing, setIsFollowing,
          artworkDetailID, setArtworkDetailID,
          artistkDetailID, setArtistkDetailID,
          auctionDetailID, setAuctionDetailID
        }}
      >
        <Header />
        <Main />
        <Footer />
      </UserContext.Provider>
    </div>
  )
}

export default App