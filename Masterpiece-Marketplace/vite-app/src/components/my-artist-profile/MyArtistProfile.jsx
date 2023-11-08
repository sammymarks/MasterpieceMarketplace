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

    return (
        <div className='MyArtistProfile'> 
            <div> Welcome USERPLACEHOLDER </div>
            <button className='profile-create-btn'>Create Artwork</button>
            <button className='profile-create-btn'>Create Auction</button>
            
            <CreateArtwork />
            <CreateAuction />
            <CreatedArtwork />
            <CreatedAuctions />
        </div>
    )
}