import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { BASE_DB_URL } from '../../globals'
import { useUserContext } from '../../App';



export default function AuctionsSearchResults (props) {

    const { loggedInUser, userArtwork, userAuctions, userBids, auctionDetailID, setAuctionDetailID } = useUserContext();
    const navigate = useNavigate();

    const [auctionResults, setAuctionResults] = useState(null)
    const [searchText, setSearchText] = useState(null)


    const goToAuctionDetail= (id) => {
        setAuctionDetailID(id)
        navigate('/auction-details')
    }

    const goToArtistDetail = (id) => {
        setArtistDetailID(id)
        navigate('/artist-details')
        return false
    }

    const getAuctionSearch = async () => {
        const url = `${BASE_DB_URL}auctions/search/${searchText}`
        const response = await axios.get(url)
        setAuctionResults(response.data)
    }

    useEffect(() => {
        setSearchText(props.text)
        getAuctionSearch()
    }, [searchText])

    if (auctionResults) {
        console.log("searchText", searchText)
        console.log(auctionResults)
    }


    return (
        !auctionResults ?
        <div>LOADING</div>
        :
        <div className='auction-search-results'> 
        {console.log("mapping")}
        {
            auctionResults.map((item, index) => (
                <div 
                    className='search-results-grid-item auction-results-grid-item' 
                    key={item._id} 
                    onClick={() => goToAuctionDetail(item._id)}
                >
                    <img className='search-results-image' src={item.coverImageURL}></img>
                    <div className='search-results-title'>{item.title}</div>
                    <div className='search-results-artist-name'onClick={() => goToArtistDetail(item.artistSeller._id)}>{item.artistSeller.username}</div>
                    <div className='search-results-description'>{item.description}</div>
                    <div className='search-results-included'>Includes {item.artworkIncluded.length} piece{item.artworkIncluded.length>1 ? "s" : null}</div>
                </div>
            ))
        }
        </div>
    )
}