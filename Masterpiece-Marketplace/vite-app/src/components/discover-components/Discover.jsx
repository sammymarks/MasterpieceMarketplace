import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

import ArtistSearchResults from './ArtistSearchResults'
import ArtworkSearchResults from './ArtworkSearchResults'
import AuctionSearchResults from './AuctionsSearchResults'
import { useUserContext } from '../App';


export default function Discover () {

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();
    
    // const tempArtistArray = [
    //     {
    //         username: "BlenVanGogh",
    //         password: "ears",
    //         address: "12 10th St, Zundert, Netherlands",
    //         profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
    //         isAdmin: false,
    //         isArtist: true,
    //         artistDescription: "I am GOAT and deeply troubled"
    //     },
    //     {
    //         username: "SammyfromEtsy",
    //         password: "ArTi$t",
    //         address: "20 South Entrance Road, Grand Canyon, AZ 86023, USA",
    //         profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Boy_Blowing_Bubbles_Edouard_Manet.jpg/1280px-Boy_Blowing_Bubbles_Edouard_Manet.jpg",
    //         isAdmin: false,
    //         isArtist: true,
    //         artistDescription: "I <3 Manet"
    //     }
    // ]

    // const tempArtworkArray = [
    //     {
    //         artist: tempArtistArray[0],
    //         title: "Arles Sunflower Initial",
    //         description: "Sunflowers",
    //         genre: "Post-Impressionist",
    //         material: ["Oil", "Canvas"],
    //         creationYear: "1988",
    //         imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg/1280px-Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg"]
    //     },
    //     {
    //         artist: tempArtistArray[0],
    //         title: "Arles Sunflower Initial",
    //         description: "Sunflowers",
    //         genre: "Painting",
    //         material: ["Oil", "Canvas"],
    //         creationYear: "1988",
    //         imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg/1280px-Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg"]
    //     },
    //     {
    //         artist: tempArtistArray[0],
    //         title: "Arles Sunflower The Berceuse-Triptych",
    //         description: "Sunflowers",
    //         genre: "Painting",
    //         material: ["Oil", "Canvas"],
    //         creationYear: "1989",
    //         imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vincent_Willem_van_Gogh_128.jpg/1280px-Vincent_Willem_van_Gogh_128.jpg"]
    //     },
    //     {
    //         artist: tempArtistArray[2],
    //         title: "The Grand Canyon",
    //         description: "I made this",
    //         genre: "Sculpture",
    //         material: ["Water", "Stone", "Sand"],
    //         creationYear: "unknown",
    //         imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Canyon_River_Tree_%28165872763%29.jpeg/576px-Canyon_River_Tree_%28165872763%29.jpeg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/GrandCanyon.NASA.2014.jpg/440px-GrandCanyon.NASA.2014.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/GCRockfall.JPG/440px-GCRockfall.JPG"]
    //     },
    //     {
    //         artist: tempArtistArray[2],
    //         title: "The Brooklyn Bridge",
    //         description: "I made this",
    //         genre: "Sculpture",
    //         material: ["Steel", "Concrete"],
    //         creationYear: "1883",
    //         imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Brooklyn_Bridge_Manhattan.jpg/500px-Brooklyn_Bridge_Manhattan.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Standing_Tall_%282819665347%29.jpg/440px-Standing_Tall_%282819665347%29.jpg"]
    //     }

    // ]

    // const tempAuctionArray = [
    //     {
    //         artistSeller: tempArtistArray[0],
    //         title: "Sunflowers collection",
    //         description: "A few of my sunflowers",
    //         coverImageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/540px-Vincent_Willem_van_Gogh_127.jpg",
    //         artworkIncluded: [tempArtworkArray[0], tempArtworkArray[1], tempArtworkArray[2]],
    //         startTime: '2023-11-01',
    //         endTime: '2023-12-31',
    //         reservePriceUSD: "10000000",
    //         isResolved: false,
    //         isTransactionComplete: false,
    //     },
    //     {
    //         artistSeller: tempArtistArray[2],
    //         title: "Grand Canyon",
    //         description: "My magnum opus. Definitely legit.",
    //         coverImageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/USA_Arizona_location_map.svg/544px-USA_Arizona_location_map.svg.png",
    //         artworkIncluded: [tempArtworkArray[3]],
    //         startTime: '2023-01-01',
    //         endTime: '2023-01-02',
    //         reservePriceUSD: "30",
    //         isResolved: true,
    //         isTransactionComplete: false,
    //     },
    //     {
    //         artistSeller: tempArtistArray[2],
    //         title: "Brooklyn Bridge",
    //         description: "Just finished. Definitely legit.",
    //         coverImageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/The_great_East_River_bridge-_to_connect_the_cities_of_New_York_%26_Brooklyn_LCCN2001704255_%28cropped%29.jpg/440px-The_great_East_River_bridge-_to_connect_the_cities_of_New_York_%26_Brooklyn_LCCN2001704255_%28cropped%29.jpg",
    //         artworkIncluded: [tempArtworkArray[5]],
    //         startTime: '2023-12-01',
    //         endTime: '2023-12-31',
    //         reservePriceUSD: "400",
    //         isResolved: false,
    //         isTransactionComplete: false,
    //     }
    // ]



    const [searchCategory, setSearchCategory] = useState("")
    const [searchText, setSearchText] = useState('')
    const [searchResultsMessage, setSearchResultsMessage] = useState('')
    const [catRouter, setCatRouter] = useState(<div></div>)
    
   
    
    const categoryRouter = () => {
        console.log("categoryRouter")
        console.log("searchCategory", searchCategory)
        
        if (!searchCategory) {return}
        if (searchCategory == "Artist") {setCatRouter(<ArtistSearchResults text={searchText}/>)}
        if (searchCategory == "Artwork") {setCatRouter(<ArtworkSearchResults text={searchText}/>)}
        if (searchCategory == "Auction") {setCatRouter(<AuctionSearchResults text={searchText}/>)}
    }


    const handleSearchSubmit = async (event) => {
        event.preventDefault()
        // console.log("submitted")
        // console.log('searchCategory', searchCategory)
        // console.log('searchText', searchText.length)

        if(searchCategory != "none" && searchText.length>0) {
            setSearchResultsMessage(`Showing ${searchCategory} results with "${searchText}"`)
            categoryRouter()
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
                        <option value="Artist">Artist</option>
                        <option value="Artwork">Artwork</option>
                        <option value="Auction">Auction</option>
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
                {catRouter}
            </div>

        </div>
    )
}