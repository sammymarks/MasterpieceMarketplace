import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import { useUserContext } from '../../App'

export default function HomePage() {
  const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext()
  const [artworkImages, setArtworkImages] = useState([])
  const [currentImages, setCurrentImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchArtworkImages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/artworks')
        const images = response.data.map((artwork) => artwork.imageURLs[0])
        setArtworkImages(images)
      } catch (error) {
        console.error('Error fetching artwork images:', error)
      }
    }

    fetchArtworkImages()
  }, [])

  useEffect(() => {
    if (artworkImages.length > 0) {
      
      const interval = setInterval(() => {
        setCurrentIndex((currentIndex + 1) % artworkImages.length)
      }, 10000)

      return () => {
        clearInterval(interval) 
      }
    }
  }, [currentIndex, artworkImages])

  useEffect(() => {
   
    setCurrentImages([
      artworkImages[currentIndex],
      artworkImages[(currentIndex + 1) % artworkImages.length],
      artworkImages[(currentIndex + 2) % artworkImages.length],
    ])
  }, [currentIndex, artworkImages])

  return (
    <div className="HomePage">
      <div className='HomePage-title'>Masterpiece Marketplace</div>
      <h3>A new and intuitive way to discover and bid on Art.</h3>
      {!loggedInUser && (
        <div className="button-container">
          <button className="login-button">
            <Link to="/login">Login</Link>
          </button>
          <button className="signup-button">
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      )}
      <div>Featured Artwork:</div>
      <div className='featured-artwork-container'>
      {currentImages.map((image, index) => (
        <img key={index} src={image} alt={`Artwork ${index + 1}`} className="featured-artwork-image" />
      ))}
      </div>


      
    </div>
  )
}





