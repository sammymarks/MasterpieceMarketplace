import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import CreateBid from './CreateBid';
import AuctionFinancials from './AuctionFinancials';
import { BASE_DB_URL } from '../../globals';
import '../../App.css';



export default function AuctionDetails () {


  const { loggedInUser, userArtwork, userAuctions, userBids, auctionDetailID, setAuctionDetailID, } = useUserContext();

  const [auctionDetails, setAuctionDetails] = useState({});
  const [auctionBids, setAuctionBids] = useState()
  // const [auctionFinancials, setAuctionFinancials] = useState("financials")

  async function getAuctionDetails() {
    try {
      const response = await axios.get(`${BASE_DB_URL}auctions/${auctionDetailID}`);  
      const auctionData = response.data;
      setAuctionDetails(auctionData)
    } catch (error) {
      console.error(error);
    }
  }

  async function getAuctionBids() {
    try {
      const response = await axios.get(`${BASE_DB_URL}bids/auctions/${auctionDetailID}`);  
      const auctionBidsData = response.data;
      setAuctionBids(auctionBidsData)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAuctionDetails();
    getAuctionBids()
  }, [auctionDetailID]);
  
  console.log("auctionDetails", auctionDetails)
  console.log("auctionBids", auctionBids)

  return (
    <div className='AuctionDetails'>
      <h2>{auctionDetails.title}</h2>
      <img src={auctionDetails.coverImageURL} alt={auctionDetails.title} />
      <p>{auctionDetails.description}</p>
      <div className="artworks-container">
        {auctionDetails.artworks.map((artwork) => (
          <div className="artwork-card" key={artwork._id}>
            <img src={artwork.imageURLs[0]} alt={artwork.title} />
            <div className="artwork-title">{artwork.title}</div>
            {/* Additional artwork details */}
          </div>
        ))}
      </div>
      {Object.keys(auctionDetails).length>0 && auctionBids ? <AuctionFinancials auctionDetails={auctionDetails} auctionBids={auctionBids}/> : null}
      {/* CreateBid component */}
      {loggedInUser && 
        <CreateBid auctionId={auctionDetailID} />}
    </div>
  );
}


    
       

