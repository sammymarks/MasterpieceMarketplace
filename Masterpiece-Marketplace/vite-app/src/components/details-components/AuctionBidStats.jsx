import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import CreateBid from './CreateBid';
import { BASE_DB_URL } from '../../globals';


export default function AuctionBidStats (props) {
    const bids = props.bids

    const [bidsSorted, setBidsSorted] = useState(bids.sort((a,b) => b.bidUSD-a.bidUSD))
    const [bidStats, setBidStats] = useState({})
    
    console.log("bidstatsbids", bids)

    const getBidStats = () => {
        const bidsArray = bidsSorted
        const usersArray = []
        console.log("bidsArray", bidsArray)
        bidsArray.forEach((bid) => {
            if (!usersArray.includes(bid.user.username)) {usersArray.push(bid.user.username)}
        })
        console.log("usersArray", usersArray)
        setBidStats({
            "bidCount" : bidsArray.length,
            "highestBid" : bidsSorted[0].bidUSD,
            "highestBidUser" : bidsSorted[0].user.username,
            "uniqueBiddersCount": usersArray.length,
        })
    }

    useEffect(()=>{
        getBidStats()
    },[])

    return (
        bids.length > 0 ?
            <div className='auction-bid-stats'>
                <div className='auction-current-bid'><span className='auction-detail-category-title'>Current Bid {"(USD)"}: </span>{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(bidStats.highestBid)} by {bidStats.highestBidUser}</div>
                <div className='auction-active-bidders'><span className='auction-detail-category-title'>Active Bidders: </span>{bidStats.uniqueBiddersCount}</div>
                <div className='auction-bid-history'><span className='auction-detail-category-title'>Bid History: </span></div>
                {
                    bidsSorted ? 
                    bidsSorted.map((bid, index) => (
                        <div className='auction-bid-row'> TEST TEST
                            <div className='bid-row-index'>{index++}</div>
                            <div className='bid-row-amount'>{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(bid.bidUSD)}</div>
                            <div className='bid-row-user'>{bid.user.username}</div>
                            <div className='bid-row-date'>{new Date(bid.createdAt).toUTCString()}</div>

                        </div>
                    ))
                    // <div>TESing</div>
                    : null
                }
            </div>
            :
            <div>There no current bids on this auction</div>
        
    )
}