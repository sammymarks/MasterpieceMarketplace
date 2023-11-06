import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

import ActiveAuctions from './ActiveAuctions'
import AuctionHistory from './AuctionHistory'


export default function MyBuyerAuctions () {

    return (
        <div className='MyBuyerAuctions'>
            <div>I am MyBuyerAuctions </div>
            <ActiveAuctions />
            <AuctionHistory />
        </div>
    )
}