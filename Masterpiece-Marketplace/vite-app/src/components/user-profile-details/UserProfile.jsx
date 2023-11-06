import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

import UserArtistInfo from './UserArtistInfo'
import UserInfo from './UserInfo'


export default function UserProfile () {

    return (
        <div className='UserProfile'> 
            <div>I am UserProfile</div>
            <UserInfo />
            <UserArtistInfo />
        </div>
    )
}