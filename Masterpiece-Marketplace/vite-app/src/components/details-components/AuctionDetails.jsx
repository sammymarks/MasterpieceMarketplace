import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import CreateBid from './CreateBid';
import { BASE_DB_URL } from '../../globals';
import '../../App.css';



export default function AuctionDetails () {

    const { loggedInUser, userArtwork, userAuctions, userBids, auctionDetailID, setAuctionDetailID, } = useUserContext();
    const { auctionId } = useParams();


    const [auctionDetails, setAuctionDetails] = useState({
        title: 'Auction Title',
        description: 'Auction description goes here...',
        coverImageURL: 'https://auction-cover.jpg', 
        artworks: [], 
      });

      useEffect(() => {
        async function getAuctionDetails() {
          try {
            const response = await axios.get(`${BASE_DB_URL}auctions/${auctionDetailID}`);  
            const auctionData = response.data;
    
            // auctionDetails state 
            setAuctionDetails({
              title: auctionData.title,
              description: auctionData.description,
              coverImageURL: auctionData.coverImageURL,
              artworks: auctionData.artworks || [], //artworks array
              
            });
          } catch (error) {
            console.error(error);
          }
        }
    
    
        getAuctionDetails();
      }, [auctionDetailID]);
    


    return (
        <div className='AuctionDetails'>
      <h2>{auctionDetails.title}</h2>
      <img src={auctionDetails.coverImageURL} alt={auctionDetails.title} />
      <p>{auctionDetails.description}</p>
     

      {/* CreateBid component */}
      {loggedInUser && 
        <CreateBid auctionId={auctionId} />}

      <div className="artworks-container">
        {auctionDetails.artworks.map((artwork) => (
          <div className="artwork-card" key={artwork._id}>
            <img src={artwork.imageURLs[0]} alt={artwork.title} />
            <div className="artwork-title">{artwork.title}</div>
            {/* Additional artwork details */}
          </div>
        ))}
      </div>
    </div>
  );
}


    
       