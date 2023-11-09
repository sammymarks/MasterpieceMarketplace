import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import { BASE_DB_URL } from '../../globals';



export default function CreatedAuctions () {

    const { loggedInUser, userArtwork, setUserArtwork, userAuctions, setUserAuctions, userBids } = useUserContext();

    const getUserAuctions = async () => {
        const url = `${BASE_DB_URL}auctions/users/${loggedInUser._id}`
        console.log(url)
        const response = await axios.get(url)
        setUserAuctions(response.data)
    }
    
    useEffect(() => {
        getUserAuctions()
    }, [])

    if (userAuctions) {
        console.log(userAuctions)
    }


    return (
<div className='CreatedAuction'>
            <div>My Auctions</div>
            <div className='user-auctions-container'>
            {
                userAuctions ? 
                userAuctions.map((item, index) => (
                    <div 
                        className='user-auctions-grid-item grid-item-card' 
                        key={item._id} 
                        onClick={() => goToArtworkDetail(item._id)}
                    >
                        <div className='user-auctions-title'>{item.title}</div>
                        <img className='user-auctions-image artist-profile-image' src={item.imageURLs[0]}></img>
                        <div className='user-auctions-description'>{item.description}</div>
                        <div className='user-auctions-genre'>{item.genre}</div>
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
        </div>    )
}