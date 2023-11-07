import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../App';


export default function UserArtistInfo () {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();

    return (
        <div className='UserArtistInfo'> I am UserArtistInfo </div>
    )
}