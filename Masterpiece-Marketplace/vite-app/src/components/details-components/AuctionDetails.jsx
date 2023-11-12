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
  const [auctionBids, setAuctionBids] = useState([])
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
  
  if (Object.keys(auctionDetails).length>0 && auctionBids) {
    console.log("auctionDetails", auctionDetails)
    console.log("auctionBids", auctionBids)
  }

  return (
    Object.keys(auctionDetails).length>0 ? 
    <div className='AuctionDetails'>
      <div className='auction-details-container auction-overview'>
        <div className='auction-details-label'>~Auction Overview~</div>
        <div className='auction-details-title'>{auctionDetails.title}</div>
        <div className='auction-details-description'>{auctionDetails.description}</div>
        <img className='auction-image' src={auctionDetails.coverImageURL} alt={auctionDetails.title} />
      </div>
      <div className='auction-details-container auction-artwork'>
        <div className='auction-details-label'>~Included Artwork~</div>
        <div className="artworks-container"> 
          {auctionDetails.artworkIncluded.map((artwork) => (
            <div className="artwork-card" key={artwork._id}>
              <img src={artwork.imageURLs[0]} alt={artwork.title} />
              <div className="artwork-title">{artwork.title}</div>
              {/* Additional artwork details */}
            </div>
          ))}
        </div>
      </div>
      {Object.keys(auctionDetails).length>0 && auctionBids ? <AuctionFinancials auctionDetails={auctionDetails} auctionBids={auctionBids}/> : null}
    </div>
    :
    <div>LOADING</div>
  );



}       

