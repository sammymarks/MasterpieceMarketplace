import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { BASE_DB_URL } from '../../globals'
import { useUserContext } from '../../App';


export default function ArtworkSearchResults (props) {

    const { loggedInUser, userArtwork, userAuctions, userBids, artworkDetailID, setArtworkDetailID, artistDetailID, setArtistDetailID, searchText, setSearchText} = useUserContext();
    const navigate = useNavigate();


    const [artworkResults, setArtworkResults] = useState([])
    // const [searchText, setSearchText] = useState(null)

    const goToArtworkDetail= (id) => {
        setArtworkDetailID(id)
        navigate('/artwork-details')
    }

    const goToArtistDetail = (id) => {
        setArtistDetailID(id)
        navigate('/artist-details')
    }

    const getArtworkSearch = async () => {
        const url = `${BASE_DB_URL}artworks/search/${searchText}`
        const response = await axios.get(url)
        setArtworkResults(response.data)
    }


    useEffect(() => {
        setSearchText(props.text)
        getArtworkSearch()
    }, [searchText])


    if (artworkResults && artworkResults.length>0) {
        console.log("searchText", searchText)
        console.log(artworkResults)
    }

    return (
        !artworkResults.length ?
        <div>LOADING</div>
        :
        <div className='ArtworkSearchResults'> 
        {
            artworkResults.map((item, index) => (
                <div 
                    className='grid-item-card artwork-results-grid-item' 
                    key={item._id} 
                    onClick={() => goToArtworkDetail(item._id)}
                >
                    <img className='search-results-image' src={item.imageURLs[0]}></img>
                    <div className='search-results-title'>{item.title}</div>
                    <div className='search-results-artist-name' onClick={() => goToArtistDetail(item.artist._id)}>{item.artist.username}</div>
                    <div className='search-results-description'>{item.description}</div>
                </div>
            ))
        }
        </div>
    )
}