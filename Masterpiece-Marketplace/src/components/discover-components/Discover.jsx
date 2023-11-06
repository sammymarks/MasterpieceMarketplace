import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

import ArtistSearchResults from './ArtistSearchResults'
import ArtworkSearchResults from './ArtworkSearchResults'
import AuctionSearchResults from './AuctionsSearchResults'


export default function Discover () {
    

    const tempArray = [
        {
            artist: "BlenvanGogh",
            title: "Arles Sunflower Initial",
            description: "Sunflowers",
            genre: "Post-Impressionist",
            material: ["Oil", "Canvas"],
            creationYear: "1988",
            imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg/1280px-Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg"]
        },
        {
            artist: "BlenvanGogh",
            title: "Arles Sunflower Initial",
            description: "Sunflowers",
            genre: "Painting",
            material: ["Oil", "Canvas"],
            creationYear: "1988",
            imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg/1280px-Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg"]
        },
        {
            artist: "BlenvanGogh",
            title: "Arles Sunflower The Berceuse-Triptych",
            description: "Sunflowers",
            genre: "Painting",
            material: ["Oil", "Canvas"],
            creationYear: "1989",
            imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vincent_Willem_van_Gogh_128.jpg/1280px-Vincent_Willem_van_Gogh_128.jpg"]
        }
    ]

    const [searchCategory, setSearchCategory] = useState('none')
    const [searchText, setSearchText] = useState('')
    const [searchResultsMessage, setSearchResultsMessage] = useState('')
    const [searchResultsArray, setSearchResultsArray] = useState(tempArray)
    
    const searchFunction = async () => {
        switch(searchCategory) {
            case "artists":
                setSearchResultsArray(tempArray)
                console.log("artists")
            break;
            case "artwork":
                setSearchResultsArray(tempArray)
                console.log("artwork")
            break;
            case "auctions":
                setSearchResultsArray(tempArray)
                console.log("auctions")

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
                {searchResultsArray.map((item, index) => (
                    <div 
                        className='search-results-grid-item' 
                        key={index} 
                        // onClick={() => goToGridItem(index)}
                    >
                        <img className='detail-image' src={item.imageURLs}></img>
                        <h2 className='detail-title'>{item.title}</h2>
                        <h2 className='detail-artist'>{item.artist}</h2>
                    </div>
                ))}
            </div>
            {/* <ArtistSearchResults />
            <ArtworkSearchResults />
            <AuctionSearchResults /> */}
        </div>
    )
}