import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { BASE_DB_URL } from '../../globals'
import { useUserContext } from '../../App';


export default function ArtworkSearchResults (props) {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();

    const [artworkResults, setArtworkResults] = useState(null)
    const [searchText, setSearchText] = useState(null)

    const getArtworkSearch = async () => {
        const url = `${BASE_DB_URL}artworks/search/${searchText}`
        const response = await axios.get(url)
        setArtworkResults(response.data)
    }

    useEffect(() => {
        setSearchText(props.text)
        getArtworkSearch()
    }, [searchText])

    if (artworkResults) {
        console.log("searchText", searchText)
        console.log(artworkResults)
    }

    return (
        !artworkResults ?
        <div>LOADING</div>
        :
        <div className='ArtistSearchResults'> 
        {
            artworkResults.map((item, index) => (
                <div 
                    className='search-results-grid-item artwork-results-grid-item' 
                    key={item._id} 
                    // onClick={() => goToGridItem(index)}
                >
                    <img className='search-results-image' src={item.imageURLs[0]}></img>
                    <div className='search-results-title'>{item.title}</div>
                    <div className='search-results-artist-name'>{item.artist.username}</div>
                    <div className='search-results-description'>{item.description}</div>
                </div>
            ))
        }
        </div>
    )
}