import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import CreateArtwork from './CreateArtwork'
import CreateAuction from './CreateAuction'
import CreatedArtwork from './CreatedArtwork'
import CreatedAuctions from './CreatedAuctions'
import { useUserContext } from '../../App';


export default function MyArtistProfile () {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();
    const [viewWindow, setViewWindow] = useState(<CreatedArtwork />)
    const navigate = useNavigate()



    return (
        <div className='MyArtistProfile'> 
            
            <div>  </div>
            
            <div className='profile-category'>Create</div>
            <button 
                className='profile-create-btn' 
                onClick={() => navigate('/create-artwork')}
            >Upload New Artwork</button>
            <button 
                className='profile-create-btn'
                onClick={() => navigate('/create-auction')}
            >Create New Auction</button>

            <div className='profile-category'>View and Edit</div>
            <button 
                className='profile-create-btn' 
                onClick={() => setViewWindow(<CreatedArtwork/>)}
            >My Artwork</button>
            <button 
                className='profile-create-btn'
                onClick={() => setViewWindow(<CreatedAuctions/>)}
            >My Auctions</button>
            {viewWindow}
        </div>
    )
}