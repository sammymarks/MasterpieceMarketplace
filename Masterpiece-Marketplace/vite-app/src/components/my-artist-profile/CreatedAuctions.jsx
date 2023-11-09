import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import { BASE_DB_URL } from '../../globals';



export default function CreatedAuctions () {

    const { loggedInUser, userArtwork, setUserArtwork, userAuctions, setUserAuctions, userBids } = useUserContext();

    const getUserAuctions = async () => {
        const url = `${BASE_DB_URL}auctions/users/${loggedInUser._id}`
        console.log(url)
        const response = await axios.get(url)
        setUserAuctions(response.data)
    }
    
    const auctionStatus = (isResolved, startTime, endTime) => {
        console.log("status called")
        const current = new Date()
        //parse date string into Date object - https://chat.openai.com/c/b1dd3f60-0f31-431f-aa34-210522305962
        const start = new Date(startTime)
        const end = new Date(endTime)
        if (current>start && current<end) {console.log("active"); return "Active"}
        if (current<start) {console.log("not started"); return "Not Started"}
        if (current>end && isResolved) {console.log("resolved"); return "Complete and Resolved"}
        if (current>end && !isResolved) {console.log("resolved"); return "Complete and Not Resolved"}
    }

    useEffect(() => {
        getUserAuctions()
    }, [])

    if (userAuctions) {
        console.log(userAuctions)
    }


    return (
<div className='CreatedAuction'>
            <div>My Auctions</div>
            <div className='user-auctions-container'>
            {
                userAuctions ? 
                userAuctions.map((item, index) => (
                    <div 
                        className='user-auctions-grid-item grid-item-card' 
                        key={item._id} 
                        // onClick={() => goToArtworkDetail(item._id)}
                    >
                        <div className='user-auctions-title'><span className='card-topic'>Title: </span>{item.title}</div>
                        <img className='user-auctions-image artist-profile-image' src={item.coverImageURL}></img>
                        <div className='user-auctions-description'><span className='card-topic'>Description: </span>{item.description}</div>
                        <div className='user-auctions-artwork-count'><span className='card-topic'>Artwork Count: </span>{item.artworkIncluded.length}</div>
                        {/* https://www.freecodecamp.org/news/how-to-format-number-as-currency-in-javascript-one-line-of-code/ */}
                        <div className='user-auctions-reserve'><span className='card-topic'>Reserve (USD): </span>{
                            new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(item.reservePriceUSD)
                        }</div>
                        <div className='user-auctions-start'><span className='card-topic'>Start Time: </span>{Date(item.startTime)}</div>
                        <div className='user-auctions-end'><span className='card-topic'>End Time: </span>{Date(item.endTime)}</div>
                        <div className='user-auctions-resolved'><span className='card-topic'>Auction Status: </span>
                        {
                            auctionStatus(item.isResolved, item.startTime, item.endTime)
                        }</div>
                        {/* <div className='user-auctions-bids'><span className='card-topic'>Bid Count: </span>Placeholder</div> */}
                        <div className='artist-profile-CRUD-buttons'>
                            <button>Details</button>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                ))
                :
                <div>LOADING</div>
            }
            </div>
        </div>    )
}