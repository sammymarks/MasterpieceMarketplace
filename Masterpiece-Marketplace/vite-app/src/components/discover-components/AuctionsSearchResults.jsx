import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'


export default function AuctionsSearchResults (props) {
    const [auctionResults, setAuctionResults] = useState(null)
    const [searchText, setSearchText] = useState(null)

    const getAuctionSearch = async () => {
        const response = await axios.get("http://localhost:3001/auctions")
        setAuctionResults(response.data)
    }

    useEffect(() => {
        setSearchText(props.text)
        getAuctionSearch()
    }, [searchText])

    console.log("searchText", searchText)
    console.log(auctionResults)


    return (
        !auctionResults ?
        <div>LOADING</div>
        :
        <div className='ArtistSearchResults'> 
        {
            auctionResults.map((item, index) => (
                <div 
                    className='search-results-grid-item' 
                    key={index} 
                    // onClick={() => goToGridItem(index)}
                >
                    <img className='search-results-image' src={item.coverImageURL}></img>
                    <div className='search-results-title-one'>{item.title}</div>
                    <div className='search-results-title-two'>{item.artistSeller}</div>
                    <div className='search-results-description'>{item.description}</div>
                </div>
            ))
        }
        </div>
    )
}