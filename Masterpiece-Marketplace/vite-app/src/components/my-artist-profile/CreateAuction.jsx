import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App'
import { BASE_DB_URL } from '../../globals'

export default function CreateAuction() {
    const { loggedInUser, userArtwork, setUserArtwork } = useUserContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [coverImageURL, setCoverImageURL] = useState('')
    const [selectedArtworks, setSelectedArtworks] = useState([])
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [reservePriceUSD, setReservePriceUSD] = useState('')
    const [isResolved, setIsResolved] = useState(false)
    const [isTransactionComplete, setIsTransactionComplete] = useState(false)
  
    const handleArtworkToggle = (artworkId) => {
      const isSelected = selectedArtworks.includes(artworkId)
  
      if (isSelected) {
        // Remove the artwork from the selected list
        setSelectedArtworks((prevSelected) => prevSelected.filter((id) => id !== artworkId))
      } else {
        // Add the artwork to the selected list
        setSelectedArtworks((prevSelected) => [...prevSelected, artworkId])
      }
    }
  
    const handleCreateAuction = async () => {
      try {
        const auctionData = {
          artistSeller: loggedInUser._id,
          title,
          description,
          coverImageURL,
          artworkIncluded: selectedArtworks,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          reservePriceUSD,
          isResolved,
          isTransactionComplete,
        }
        console.log('Created auction.')

  
        // Make a POST request to create the auction in the database
        await axios.post(`${BASE_DB_URL}auctions/create`, auctionData)
  
        // Reset form fields after successful creation
        setTitle('')
        setDescription('')
        setCoverImageURL('')
        setSelectedArtworks([])
        setStartTime('')
        setEndTime('')
        setReservePriceUSD('')
        setIsResolved(false)
        setIsTransactionComplete(false)
      } catch (error) {
        console.error(error)
      }
    }
  
    useEffect(() => {
      // Fetch user's artworks when the component mounts
      const fetchUserArtworks = async () => {
        try {
          const response = await axios.get(`${BASE_DB_URL}artworks/users/${loggedInUser._id}`)
          
          // Assuming the response contains an array of user's artworks
          const artworks = response.data
  
          // Set userArtwork state with the fetched artworks
          setUserArtwork(artworks)
        } catch (error) {
          console.error('Error fetching user artworks:', error)
        }
      }
  
      // Call the fetch function
      fetchUserArtworks()
    }, [loggedInUser._id, setUserArtwork])
  
    return (
      <div className='CreateAuction'>
        <h1>Create Auction</h1>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
  
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <br />
  
        <label htmlFor="coverImageURL">Cover Image URL:</label>
        <input
          type="text"
          id="coverImageURL"
          value={coverImageURL}
          onChange={(event) => setCoverImageURL(event.target.value)}
        />
        <br />
  
        <label>Select Artworks:</label>
        {userArtwork.map((artwork) => (
          <div key={artwork._id}>
            <input
              type="checkbox"
              id={`artwork-${artwork._id}`}
              checked={selectedArtworks.includes(artwork._id)}
              onChange={() => handleArtworkToggle(artwork._id)}
            />
            <label htmlFor={`artwork-${artwork._id}`}>{artwork.title}</label>
          </div>
        ))}
        <br />
  
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
        <br />
  
        <label htmlFor="endTime">End Time:</label>
        <input
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
        <br />
  
        <label htmlFor="reservePriceUSD">Reserve Price (USD):</label>
        <input
          type="text"
          id="reservePriceUSD"
          value={reservePriceUSD}
          onChange={(event) => setReservePriceUSD(event.target.value)}
        />
        <br />
  
        {/* <label htmlFor="isResolved">Is Resolved:</label>
        <input
          type="checkbox"
          id="isResolved"
          checked={isResolved}
          onChange={(event) => setIsResolved(event.target.checked)}
        />
        <br />
  
        <label htmlFor="isTransactionComplete">Is Transaction Complete:</label>
        <input
          type="checkbox"
          id="isTransactionComplete"
          checked={isTransactionComplete}
          onChange={(event) => setIsTransactionComplete(event.target.checked)}
        />
        <br /> */}
  
        <button onClick={handleCreateAuction}>Create Auction</button>
      </div>
    )
  }