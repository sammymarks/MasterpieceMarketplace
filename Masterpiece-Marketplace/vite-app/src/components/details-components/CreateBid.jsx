import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import AuctionBidStats from './AuctionBidStats';
import { BASE_DB_URL } from '../../globals';

export default function CreateBid() {
  const { loggedInUser, userArtwork, userAuctions, userBids, auctionDetailID, setAuctionDetailID, } = useUserContext();
  
  
  const [bidAmount, setBidAmount] = useState('');
  
  const handleBidSubmit = async (event) => {
    event.preventDefault();
    // POST request here 
    try {
      const response = await axios.post(`${BASE_DB_URL}bids/create`, {
        auction: auctionDetailID,
        bidUSD: parseFloat(bidAmount), // number
        user: loggedInUser._id, 
      });
    // response 
      console.log('Bid placed successfully:', response.data);

      //clear out input 
      setBidAmount('');
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  }; 

    
 

return (
    <div>
      <h3>Place a Bid</h3>
      <form onSubmit={handleBidSubmit}>
        <input
          type="number"
          step="0.01"
          placeholder="Enter bid amount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          required
        />
        <button type="submit">Place Bid</button>
      </form>
    </div>
  );
}

