import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import ActiveAuctions from './ActiveAuctions'
import AuctionHistory from './AuctionHistory'


export default function MyBuyerAuctions () {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();


    return (
        <div className='MyBuyerAuctions'>
            <div>I am MyBuyerAuctions </div>
            <ActiveAuctions />
            <AuctionHistory />
        </div>
    )
}