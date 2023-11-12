import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import { BASE_DB_URL } from '../../globals'; 

export default function ArtistDetails () {

    const { loggedInUser, userArtwork, userAuctions, userBids, artistDetailID, setArtistDetailID, isFollowing, setIsFollowing } = useUserContext();
    const [artistDetails, setArtistDetails] = useState({
        name: 'Artist Name',
        profilePic: 'https://default-profile-pic.jpg',
        bio: 'Artist bio goes here...',
      });

      
      // const [isFollowing, setIsFollowing] = useState(false);


      useEffect(() => {

        const getArtistDetails = async () => {
            try {
              const url = `${BASE_DB_URL}/artists/${artistDetailID}`; 
              const response = await axios.get(url);
              const artistData = response.data;

      
              
              // Update the artistDetails state
              setArtistDetails({
                name: artistData.name,
                profilePic: artistData.profilePic,
                bio: artistData.bio,
              });

              // setIsFollowing(loggedInUser.followedArtists.includes(artistData._id)); 
            } catch (error) {
              console.error(error);
            }
          };
        getArtistDetails();
        }, [artistDetailID, setIsFollowing, loggedInUser]);

        // function for follow/unfollow if used 
        const toggleFollow = async () => {
            try {
              // API update follow status
              const url = `${BASE_DB_URL}/follow-artist/${artistDetailID}`;
              // await axios.post(url, { follow: !isFollowing }); // toggle follow status 
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
    



     

    