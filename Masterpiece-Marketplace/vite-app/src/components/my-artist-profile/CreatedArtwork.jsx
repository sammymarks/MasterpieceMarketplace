import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import { BASE_DB_URL } from '../../globals';



export default function CreatedArtwork() {
    const { loggedInUser } = useUserContext();
    const [userArtwork, setUserArtwork] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
  
    const getUserArtwork = async () => {
      const url = `${BASE_DB_URL}artworks/users/${loggedInUser._id}`;
      try {
        const response = await axios.get(url);
        setUserArtwork(response.data);
      } catch (error) {
        console.error('Error fetching user artwork:', error);
      }
    };
  
    useEffect(() => {
      getUserArtwork();
    }, []);
  
    const handleDetailsClick = (artwork) => {
        if (selectedArtwork === artwork) {
          setSelectedArtwork(null); // Close details if the same artwork is clicked again
        } else {
          setSelectedArtwork(artwork); // Show details for the clicked artwork
        }
      };
  
    return (
      <div className="CreatedArtwork">
        <div>My Artwork</div>
        <div className="user-artwork-container">
          {userArtwork ? (
            userArtwork.map((item, index) => (
              <div
                className="user-artwork-grid-item grid-item-card"
                key={item._id}
              >
                <div className="user-artwork-title">{item.title}</div>
                <img
                  className="user-artwork-image artist-profile-image"
                  src={item.imageURLs[0]}
                  alt={item.title}
                />
                <div className="user-artwork-description">{item.description}</div>
                <div className="user-artwork-genre">{item.genre}</div>
                <div className="artist-profile-CRUD-buttons">
                  <button onClick={() => handleDetailsClick(item)}>Details</button>
                  {selectedArtwork === item && (
                    <div className="artwork-details">
                      <p><strong>Title:</strong> {item.title}</p>
                      <p><strong>Description:</strong> {item.description}</p>
                      <p><strong>Genre:</strong> {item.genre}</p>
                      <p><strong>Materials:</strong> {item.materials}</p>
                      <p><strong>Creation Year:</strong> {item.creationYear}</p>


                      
                      
                      {/* Add more details here */}
                    </div>
                  )}
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div>LOADING</div>
          )}
        </div>
      </div>
    );
  }