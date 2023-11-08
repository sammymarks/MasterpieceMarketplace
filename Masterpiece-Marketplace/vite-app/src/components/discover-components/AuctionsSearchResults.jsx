import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { BASE_DB_URL } from '../../globals'
import { useUserContext } from '../../App';



export default function AuctionsSearchResults (props) {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();
    
    const [auctionResults, setAuctionResults] = useState(null)
    const [searchText, setSearchText] = useState(null)

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
        {
            auctionResults.map((item, index) => (
                <div 
                    className='search-results-grid-item auction-results-grid-item' 
                    key={item._id} 
                    // onClick={() => goToGridItem(index)}
                >
                    <img className='search-results-image' src={item.coverImageURL}></img>
                    <div className='search-results-title'>{item.title}</div>
                    <div className='search-results-artist-name'>{item.artistSeller.username}</div>
                    <div className='search-results-description'>{item.description}</div>
                    <div className='search-results-included'>Includes {item.artworkIncluded.length} piece{item.artworkIncluded.length>1 ? "s" : null}</div>
                </div>
            ))
        }
        </div>
    )
}