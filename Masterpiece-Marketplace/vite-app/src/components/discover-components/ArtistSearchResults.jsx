import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { useUserContext } from '../../App';
import axios from 'axios'
import { BASE_DB_URL } from '../../globals'


export default function ArtistSearchResults (props) {    
    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();
    
    const [artistResults, setArtistResults] = useState(null)
    const [searchText, setSearchText] = useState(null)

    const getArtistSearch = async () => {
        const url = `${BASE_DB_URL}users/artist-search/${searchText}`
        console.log(url)
        const response = await axios.get(url)
        setArtistResults(response.data)
    }

    useEffect(() => {
        setSearchText(props.text)
        getArtistSearch()
    }, [searchText])

    if (artistResults) {
        console.log("searchText", searchText)
        console.log(artistResults)
    }

    return (
        !artistResults ?
        <div>LOADING</div>
        :
        <div className='ArtistSearchResults'> 
        {
            artistResults.map((item, index) => (
                <div 
                    className='grid-item-card artist-results-grid-item' 
                    key={item._id} 
                    // onClick={() => goToGridItem(index)}
                >
                    <img className='search-results-image' src={item.profilePic}></img>
                    <div className='search-results-artist-name'>{item.username}</div>
                    <div className='search-results-artist-location'>{item.address}</div>
                    <div className='search-results-description'>{item.artistDescription}</div>
                </div>
            ))
        }
        </div>
    )
}