import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { BASE_DB_URL } from '../../globals'
import { useUserContext } from '../../App';



export default function AuctionsSearchResults (props) {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();
    
    const [auctionResults, setAuctionResults] = useState(null)
    const [auctionResultsLoaded, setAuctionResultsLoaded] = useState(false)
    const [auctionResultsDisplay, setAuctionResultsDisplay] = useState([])
    const [searchText, setSearchText] = useState(null)



    // const getUsernameByID = async (id) => {
    //     console.log("id", id)
    //     const url = `${BASE_DB_URL}users/${id}`
    //     console.log("url", url)
    //     const response = await axios.get(url)
        
    // } 

    const getUsernames = async () => {
        console.log("getUsernameRunning")
        const len = auctionResults.length
        for (let i=0; i<len; i++) {
            console.log("for loop running", i)
            console.log(auctionResults[i].artistSeller)
            const userID = auctionResults[i].artistSeller
            const url = `${BASE_DB_URL}users/${userID}`
            const response = await axios.get(url)
            // console.log(response.data)
            if (response.data) {
                const tempDisplay = auctionResultsDisplay
                const tempItem = auctionResults[i]
                // console.log("tempItem original", tempItem)
                tempItem.artistSeller = response.data.username
                console.log("tempItem updated", tempItem)
                tempDisplay.push(tempItem)
                setAuctionResultsDisplay(tempDisplay)
            }

        }
    }

    const getAuctionSearch = async () => {
        const url = `${BASE_DB_URL}auctions/search/${searchText}`
        const response = await axios.get(url)
        setAuctionResults(response.data)
        // auctionResults ? setAuctionResultsLoaded(true) : null
    }

    useEffect(() => {
        setSearchText(props.text)
        getAuctionSearch()
    }, [searchText])


    console.log("searchText", searchText)
    console.log(auctionResults)

    auctionResults ? getUsernames() :null
    console.log("auctionResultsDisplay", auctionResultsDisplay)

    return (
        !auctionResultsDisplay ?
        <div>LOADING</div>
        :
        <div className='ArtistSearchResults'> 
        {
            auctionResultsDisplay.map((item, index) => (
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