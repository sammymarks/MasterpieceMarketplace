import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';


export default function ActiveAuctions () {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();

      const [auctions, ActiveAuctions] = useState([]);
    
      useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('/auctions'); 
            if (response.ok) {
              const data = await response.json();
              ActiveAuctions(data);
            } else {
              console.error('Failed to fetch Auctions');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
    
        fetchData();
      }, []);
    
      return (
        <div>
          <h1>Auction List</h1>
          <ul>
            {auctions.map(auction => (
              <li key={auction._id}>
                {auction.name} - {auction.description}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
