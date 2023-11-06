import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import CreateArtwork from './CreateArtwork'
import CreateAuction from './CreateAuction'
import CreatedArtwork from './CreatedArtwork'
import CreatedAuctions from './CreatedAuctions'


export default function MyArtistProfile () {

    return (
        <div className='MyArtistProfile'> 
            <div> I am MyArtistProfile </div>
            <CreateArtwork />
            <CreateAuction />
            <CreatedArtwork />
            <CreatedAuctions />
        </div>
    )
}