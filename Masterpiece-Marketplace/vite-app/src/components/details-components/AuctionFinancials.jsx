import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import CreateBid from './CreateBid';
import AuctionBidStats from './AuctionBidStats';
import { BASE_DB_URL } from '../../globals';


export default function AuctionFinancials (props) {

    const { loggedInUser, userArtwork, userAuctions, userBids, auctionDetailID, setAuctionDetailID, } = useUserContext();

    const auction = props.auctionDetails
    const bids = props.auctionBids
    const start = new Date(auction.startTime)
    const end = new Date(auction.endTime)

    const [auctionStatus, setAuctionStatus] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date())
    // const [bidsSorted, setBidsSorted] = useState([])
    // const [bidStats, setBidStats] = useState({})

    const getAuctionStatus = () => {
        console.log("getAuctionStatus running")
        if (currentDate<start) {setAuctionStatus("Pending")}
        if (currentDate>start && currentDate<end) {setAuctionStatus("Active")}
        if (currentDate>end && bids.length>0) {setAuctionStatus("Resolved")}
        if (currentDate>end && bids.length==0) {setAuctionStatus("Unresolved")}
    }

    const millisecondsToDateString = (milliseconds) => {
        //https://stackoverflow.com/questions/38355157/is-there-a-method-to-convert-miliseconds-to-years-months-days-minutes-seconds-in
        let seconds = Math.floor(milliseconds / 1000)
        let minutes = Math.floor(seconds / 60)
        let hours = Math.floor(minutes / 60)
        let days = Math.floor(hours / 24)
        let months = Math.floor(days / 30)
        let years = Math.floor(days / 365)

        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        days %= 30;
        months %= 12; 
    
        // let returnString = ""
        // if (years>0) {returnString += `${years} Year${years>1 ? "s" : ""}, `}
        // if (months>0) {returnString += `${months} Month${months>1 ? "s" : ""}, `}
        // if (days>0) {returnString +=`${days} Day${days>1 ? "s" : ""}, `}
        // if (hours>0) {returnString += `${hours} Hour${hours>1 ? "s" : ""}, `}
        // if (minutes>0) {returnString += `${minutes} Minute${minutes>1 ? "s" : ""}, `}
        // returnString += `${seconds} Second${seconds!=1 ? "s" : ""}`

        let returnString = ""
        if (years>0) {returnString += `${years} Y, `}
        if (months>0) {returnString += `${months} M, `}
        if (days>0) {returnString +=`${days} D, `}
        if (hours>0) {returnString += `${hours} hr, `}
        if (minutes>0) {returnString += `${minutes} min, `}
        returnString += `${seconds} sec`

        return (returnString)
    }

    useEffect(()=>{
        //https://stackoverflow.com/questions/68378691/react-countdown-timer-using-new-date
        const i = setInterval(()=>{
            console.log("auction is refreshing")
            getAuctionStatus()
            setCurrentDate(new Date())     
        }, 1000)
        return () => clearInterval(i);
    },[])

    return (
        <div className='auction-financials'>
            <div className='auction-financials-title'>Auction Details</div> 
            <div className='auction-start-time'><span className='auction-detail-category-title'>Start Date: </span>{start.toUTCString()}</div>
            <div className='auction-end-time'><span className='auction-detail-category-title'>End Date: </span>{end.toUTCString()}</div>
            { auctionStatus == "Pending" ? 
                <>
                    <div className='auction-status'><span className='auction-detail-category-title'>Status: </span>{auctionStatus}</div>
                    <div className='auction-reserve'><span className='auction-detail-category-title'>Reserve {"(USD)"}: </span>{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(auction.reservePriceUSD)}</div>
                </>
            : null}
            { auctionStatus == "Active" ? 
                <>
                    <div className='auction-status'><span className='auction-detail-category-title'>Status: </span>{auctionStatus}</div>
                    <div className='auction-reserve'><span className='auction-detail-category-title'>Reserve {"(USD)"}: </span>{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(auction.reservePriceUSD)}</div>
                    <div className='auction-time-until'><span className='auction-detail-category-title'>Remaining Time: </span>{millisecondsToDateString(end-currentDate)}</div>
                    {bids.length>0 ? 
                        <AuctionBidStats bids={bids} />
                        :
                        <div>There are no bids in auction</div>
                    }
                </>
            : null}
            { auctionStatus == "Resolved" ? 
                <>
                    <div className='auction-status'>Status: {auctionStatus}</div>
                    <div className='auction-reserve'>Reserve {"(USD)"}: { new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(auction.reservePriceUSD)}</div>

                </>
            : null}
            { auctionStatus == "Unresolved" ? 
                <>
                    <div className='auction-status'>Status: {auctionStatus}</div>
                    <div className='auction-reserve'>Reserve {"(USD)"}: { new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(auction.reservePriceUSD)}</div>

                </>
            : null}
        </div>
    )
}