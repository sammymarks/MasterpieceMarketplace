import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import CreateBid from './CreateBid';
import { BASE_DB_URL } from '../../globals';


export default function AuctionDetails () {

    const { loggedInUser, userArtwork, userAuctions, userBids, auctionDetailID, setAuctionDetailID, } = useUserContext();
    const { auctionId } = useParams();


    const [auctionDetails, setAuctionDetails] = useState({});
    const [auctionBids, setAuctionBids] = useState({})

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
        console.log(response)
        setAuctionBids(auctionBidsData)
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      getAuctionDetails();
      getAuctionBids()
    }, [auctionDetailID]);
    
    // console.log("auctionDetails", auctionDetails)
    console.log("auctionBids", auctionBids)

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
       