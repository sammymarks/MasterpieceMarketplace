import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import { BASE_DB_URL } from '../../globals';


export default function CreatedArtwork () {

    const { loggedInUser, userArtwork, setUserArtwork, userAuctions, userBids } = useUserContext();

    const getUserArtwork = async () => {
        const url = `${BASE_DB_URL}artworks/users/${loggedInUser._id}`
        console.log(url)
        const response = await axios.get(url)
        setUserArtwork(response.data)
    }
    
    useEffect(() => {
        getUserArtwork()
    }, [])

    if (userArtwork) {
        console.log(userArtwork)
    }

    return (
        <div className='CreatedArtwork'>
            <div>My Artwork</div>
            <div className='user-artwork-container'>
            {
                userArtwork ? 
                userArtwork.map((item, index) => (
                    <div 
                        className='user-artwork-grid-item grid-item-card' 
                        key={item._id} 
                        onClick={() => goToArtworkDetail(item._id)}
                    >
                        <div className='user-artwork-title'>{item.title}</div>
                        <img className='user-artwork-image artist-profile-image' src={item.imageURLs[0]}></img>
                        <div className='user-artwork-description'>{item.description}</div>
                        <div className='user-artwork-genre'>{item.genre}</div>
                        <div className='artist-profile-CRUD-buttons'>
                            <button>Details</button>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                ))
                :
                <div>LOADING</div>
            }
            </div>
        </div>
    )
}