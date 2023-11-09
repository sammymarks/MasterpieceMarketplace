import React, { useState } from 'react';
import axios from 'axios';
import { BASE_DB_URL } from '../../globals';

export default function CreateBid({ auctionId }) {
    const [bidAmount, setBidAmount] = useState('');
  
    const handleBidSubmit = async (event) => {
      event.preventDefault();

// POST request here 
try {
  const response = await axios.post(`${BASE_DB_URL}bids/create`, {
    auctionId: auctionId,
    amount: parseFloat(bidAmount), // number
    userId: loggedInUser._id, 
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

