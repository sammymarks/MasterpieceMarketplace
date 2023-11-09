import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import CreateBid from './CreateBid';
import { BASE_DB_URL } from '../../globals';


export default function AuctionDetails () {

    const { loggedInUser, userArtwork, userAuctions, userBids, auctionDetailID, setAuctionDetailID, } = useUserContext();
    const { auctionId } = useParams();


    const [auctionDetails, setAuctionDetails] = useState({
        title: 'Auction Title',
        description: 'Auction description goes here...',
        coverImageURL: 'https://auction-cover.jpg', 
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
      {loggedInUser && (
        <CreateBid auctionId={auctionId} />
      )}


    </div>
  );
}
       