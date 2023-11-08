import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';


export default function ArtistDetails () {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();
    const [artistDetails, setArtistDetails] = useState({
        name: 'Artist Name',
        profilePic: 'https://default-profile-pic.jpg',
        bio: 'Artist bio goes here...',
      });

      
      const [isFollowing, setIsFollowing] = useState(false);


      useEffect(() => {

        const getArtistDetails = async () => {
            try {
              const response = await axios.get('/api/artist-details'); // Replace w/ API endpoint
              const artistData = response.data; // if API response provides artist details
      
              
              // Update the artistDetails state
              setArtistDetails({
                name: artistData.name,
                profilePic: artistData.profilePic,
                bio: artistData.bio,
              });
            } catch (error) {
              console.error(error);
            }
          };
        getArtistDetails();
        }, []);

        // function for follow/unfollow if used 
        const toggleFollow = async () => {
            try {
              // API request to update follow status
              await axios.post('/api/follow-artist', { artistId: artistDetails.id }); // Replace with  API endpoint!
              // Update isFollowing
              setIsFollowing(!isFollowing);
            } catch (error) {
              console.error(error);
            }
          };

          return (
            <div className='ArtistDetails'>
              <div className='profile-section'>
                <img src={artistDetails.profilePic} alt={artistDetails.name} />
                <h2>{artistDetails.name}</h2>
                <p>{artistDetails.bio}</p>
                <button onClick={toggleFollow}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              </div>
              {/* Additional */}
            </div>
          );
        }
    



     

    