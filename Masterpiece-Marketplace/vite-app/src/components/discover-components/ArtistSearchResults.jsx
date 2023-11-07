import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../App';


export default function ArtistSearchResults (props) {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();
    
    const [artistResults, setArtistResuls] = useState(null)
    const [searchText, setSearchText] = useState(null)

    const getArtistSearch = async () => {
        const response = await axios.get("http://localhost:3001/users")
        setArtistResuls(response.data)
    }

    useEffect(() => {
        setSearchText(props.text)
        getArtistSearch()
    }, [searchText])

    console.log("searchText", searchText)
    console.log(artistResults)


    return (
        !artistResults ?
        <div>LOADING</div>
        :
        <div className='ArtistSearchResults'> 
        {
            artistResults.map((item, index) => (
                <div 
                    className='search-results-grid-item' 
                    key={index} 
                    // onClick={() => goToGridItem(index)}
                >
                    <img className='search-results-image' src={item.profilePic}></img>
                    <div className='search-results-title-one'>{item.username}</div>
                    <div className='search-results-description'>{item.artistDescription}</div>
                </div>
            ))
        }
        </div>
    )
}