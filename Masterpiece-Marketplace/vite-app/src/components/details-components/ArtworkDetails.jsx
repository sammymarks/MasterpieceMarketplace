import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../App';


export default function ArtworkDetails () {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();
    const { artworkId } = useParams(); 
    const [artwork, setArtwork] = useState(null);
    const [artist, setArtist] = useState(null);
    const [isBidding, setIsBidding] = useState(false);

    useEffect(() => {
        // artworkId based artwork and artist details 
        async function getArtworkDetails() {
          try {
            // for artwork details
            const artworkResponse = await axios.get(`/api/artworks/${artworkId}`);
            setArtwork(artworkResponse.data);
    
            // for  artist details
            const artistResponse = await axios.get(`/api/artists/${artworkResponse.data.artist}`);
            setArtist(artistResponse.data);
          } catch (error) {
            console.error(error);
          }
        }

        getArtworkDetails();

    }, [artworkId]);


    return (
        <div className="ArtworkDetails">
          {artwork ? (
            <div>
              <h2>{artwork.title}</h2>
              <p>{artwork.description}</p>
              {/* Display of other artwork and artist details */}
            </div>
          ) : (
            <p>Loading artwork details...</p>
          )}
        </div>
      );
    }
    