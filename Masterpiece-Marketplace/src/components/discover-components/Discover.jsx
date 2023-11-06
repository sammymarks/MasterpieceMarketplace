import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

import ArtistSearchResults from './ArtistSearchResults'
import ArtworkSearchResults from './ArtworkSearchResults'
import AuctionSearchResults from './AuctionsSearchResults'


export default function Discover () {
    const [searchCategory, setSearchCategory] = useState('none')
    const [searchText, setSearchText] = useState('')
    const [searchResultsMessage, setSearchResultsMessage] = useState('')
    const [searchResultsArray, setSearchResultsArray] = useState([{}])
    
    const searchFunction = async () => {
        switch(searchCategory) {
            case "artists":
                setSearchResultsArray([{results: "artists API Pull"}])
            break;
            case "artwork":
                setSearchResultsArray([{results: "artwork API Pull"}])
            break;
            case "auctions":
                setSearchResultsArray([{results: "auctions API Pull"}])
            break;
        }
    }


    const handleSearchSubmit = async (event) => {
        event.preventDefault()
        console.log("submitted")
        console.log('searchCategory', searchCategory)
        console.log('searchText', searchText.length)

        if(searchCategory != "none" && searchText.length>0) {
            setSearchResultsMessage(`Showing ${searchCategory} results with "${searchText}"`)
            searchFunction()
        } else {
            if (searchCategory=="none" && searchText.length==0) {
                setSearchResultsMessage("Please enter a search category and name or description")
            } else if (searchCategory=="none") {
                setSearchResultsMessage("Please enter a search category")
            } else if (searchText.length==0) {
                setSearchResultsMessage("Please enter a name or description")
            }
        } 
        
    }

    return (
        <div className='Discover'>
            <div className='searchbar-container'>
                <form onSubmit={handleSearchSubmit}>
                    
                    <select 
                        id="categories" 
                        name="categories" 
                        onChange={(e) => setSearchCategory(e.target.value)}
                    >
                        <option selected disabled hidden>--Select a Category--</option> 
                        <option value="Atrists">Artists</option>
                        <option value="Artwork">Artwork</option>
                        <option value="Auction">Auctions</option>
                    </select>
                    
                    <input
                        className='search-input'
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Enter name or description"
                    />

                    <input type="submit" id="submit" value="Submit"/>
                </form>
            </div>
            <div className='search-results-message'>{searchResultsMessage}</div>
            <div className='search-results-container'>
                {/* {searchResultsArray} */}
            </div>
            {/* <ArtistSearchResults />
            <ArtworkSearchResults />
            <AuctionSearchResults /> */}
        </div>
    )
}