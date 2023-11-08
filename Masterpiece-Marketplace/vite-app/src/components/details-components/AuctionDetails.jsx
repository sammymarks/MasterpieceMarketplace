import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../App';
import CreateBid from './CreateBid';


export default function AuctionDetails () {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();
    const { auctionId } = useParams();


    const [auctionDetails, setAuctionDetails] = useState({
        title: 'Auction Title',
        description: 'Auction description goes here...',
        coverImageURL: 'https://auction-cover.jpg', 
      });

      useEffect(() => {
        async function getAuctionDetails() {
          try {
            const response = await axios.get(`/api/auctions/${auctionId}`); //replace 
            const auctionData = response.data;
    
            // auctionDetails state 
            setAuctionDetails({
              title: auctionData.title,
              description: auctionData.description,
              coverImageURL: auctionData.coverImageURL,
              // add other auction details if any...
            });
          } catch (error) {
            console.error(error);
          }
        }
    
    
        getAuctionDetails();
      }, [auctionId]);
    


    return (
        <div className='AuctionDetails'>
      <h2>{auctionDetails.title}</h2>
      <img src={auctionDetails.coverImageURL} alt={auctionDetails.title} />
      <p>{auctionDetails.description}</p>
      {/*  add other auction details if any ... */}

      {/* CreateBid component */}
      {loggedInUser && (
        <CreateBid auctionId={auctionId} />
      )}


    </div>
  );
}
       