import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../App';


export default function CreatedArtwork () {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();


    return (
        <div className='CreatedArtwork'> I am CreatedArtwork </div>
    )
}