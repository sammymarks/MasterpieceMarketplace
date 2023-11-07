import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';


export default function ActiveAuctions () {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();


    return (
        <div className='ActiveAuctions'> I am ActiveAuctions </div>
    )
}