import { useState, createContext, useContext} from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
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