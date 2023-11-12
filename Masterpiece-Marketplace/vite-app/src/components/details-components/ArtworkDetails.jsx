import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import { BASE_DB_URL } from '../../globals'



export default function ArtworkDetails () {

    const { loggedInUser, userArtwork, userAuctions, userBids, artworkDetailID, setArtworkDetailID, } = useUserContext();
    const { artworkId } = useParams(); 
    const [artwork, setArtwork] = useState(null);
    // const [artist, setArtist] = useState(null);
    const [isBidding, setIsBidding] = useState(false);

    useEffect(() => {
        // artworkId based artwork and artist details 
        async function getArtworkDetails() {
          try {
            // for artwork details
            const url = `${BASE_DB_URL}artworks/${artworkDetailID}`
            const artworkResponse = await axios.get(url);
            setArtwork(artworkResponse.data);
    
            // for  artist details
            // const artistResponse = await axios.get(`/api/artists/${artworkResponse.data.artist}`);
            // setArtist(artistResponse.data);
          } catch (error) {
            console.error(error);
          }
        }

        getArtworkDetails();

    }, [artworkDetailID]);


    return (
        !artwork ? 
        <div>Loading Artwork Details</div>
        :
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
    