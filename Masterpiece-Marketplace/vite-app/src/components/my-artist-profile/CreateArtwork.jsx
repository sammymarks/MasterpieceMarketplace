import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../App';

export default function CreateArtwork () {
    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();

    return (
        <div className='CreateArtwork'> I am CreateArtwork </div>
    )
}