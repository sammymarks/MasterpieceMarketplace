import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App'
import { BASE_DB_URL } from '../../globals'

export default function CreateArtwork() {
    const { loggedInUser } = useUserContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [materials, setMaterials] = useState([])
    const [creationYear, setCreationYear] = useState('')
    const [imageURLs, setImageURLs] = useState([])
    const [file, setFile] = useState(null)
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
    }
  
    const handleUpload = async () => {
      try {
        // Create the artwork object in the required JSON format
        const artworkData = {
          artist: loggedInUser._id,
          title,
          description,
          genre,
          materials,
          creationYear,
          imageURLs,
        }
        console.log('Created Artwork.')
  
        // Make a POST request to create the artwork in the database
        await axios.post(  `${BASE_DB_URL}artworks/create`, artworkData)
  
        // Reset form fields after successful upload
        setTitle('')
        setDescription('')
        setGenre('')
        setMaterials([])
        setCreationYear('')
        setImageURLs([])
        setFile(null)
      } catch (error) {
        console.error(error)
      }
    }
  
    return (
      <div className='CreateArtwork'>
        <h1>Create Artwork</h1>
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
  
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />
        <br />
  
        <label htmlFor="materials">Materials (comma-separated):</label>
        <input
          type="text"
          id="materials"
          value={materials.join(',')}
          onChange={(event) => setMaterials(event.target.value.split(','))}
        />
        <br />
  
        <label htmlFor="creationYear">Creation Year:</label>
        <input
          type="text"
          id="creationYear"
          value={creationYear}
          onChange={(event) => setCreationYear(event.target.value)}
        />
        <br />
  
        <label htmlFor="imageURLs">Image URLs (comma-separated):</label>
        <input
          type="text"
          id="imageURLs"
          value={imageURLs.join(',')}
          onChange={(event) => setImageURLs(event.target.value.split(','))}
        />
        <br />
  
        <label htmlFor="file">Upload File:</label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
        />
  
        <button onClick={handleUpload}>Upload</button>
      </div>
    )
  }