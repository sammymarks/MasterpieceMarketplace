import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App'
import { BASE_DB_URL } from '../../globals'



export default function CreatedArtwork() {
    const { loggedInUser } = useUserContext()
    const [userArtwork, setUserArtwork] = useState([])
    const [selectedArtwork, setSelectedArtwork] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedArtwork, setEditedArtwork] = useState({
        title: '',
        description: '',
        genre: '',
        materials: [],
        creationYear: '',


    })


    const getUserArtwork = async () => {
        const url = `${BASE_DB_URL}artworks/users/${loggedInUser._id}`
        try {
            const response = await axios.get(url)
            setUserArtwork(response.data)
        } catch (error) {
            console.error('Error fetching user artwork:', error)
        }
    }

    useEffect(() => {
        getUserArtwork()
    }, [])

    const handleDetailsClick = (artwork) => {
        if (selectedArtwork === artwork) {
            setSelectedArtwork(null)
            setIsEditing(false) 
        } else {
            setSelectedArtwork(artwork) 
            setIsEditing(false) 
        }
    }
    const handleEditClick = (artwork) => {
        setSelectedArtwork(artwork)
        setIsEditing(true) 
        setEditedArtwork({
            title: artwork.title,
            description: artwork.description,
            genre: artwork.genre,
            materials: artwork.materials,
            creationYear: artwork.creationYear,
            
        })
    }
    const handleSaveClick = async () => {
        try {
            
            const url = `${BASE_DB_URL}artworks/update/${selectedArtwork._id}/`
            await axios.put(url, editedArtwork)

            
            const updatedArtworks = userArtwork.map((artwork) => {
                if (artwork._id === selectedArtwork._id) {
                    return {
                        ...artwork,
                        ...editedArtwork,
                    }
                }
                return artwork
            })
            setUserArtwork(updatedArtworks)
            setIsEditing(false) 
        } catch (error) {
            console.error('Error updating artwork:', error)
        }
    }
    const handleDeleteClick = async (artwork) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this artwork?');
        
        if (confirmDelete) {
            try {
                
                const url = `${BASE_DB_URL}artworks/${artwork._id}`;
                await axios.delete(url);
                
                
                const updatedArtworks = userArtwork.filter((item) => item._id !== artwork._id);
                setUserArtwork(updatedArtworks);
            } catch (error) {
                console.error('Error deleting artwork:', error);
            }
        }
    };

    return (
        <div className="CreatedArtwork">
            <div>My Artwork</div>
            <div className="user-artwork-container">
                {userArtwork ? (
                    userArtwork.map((item, index) => (
                        <div
                            className="user-artwork-grid-item grid-item-card"
                            key={item._id}
                        >
                            <div className="user-artwork-title">{item.title}</div>
                            <img
                                className="user-artwork-image artist-profile-image"
                                src={item.imageURLs[0]}
                                alt={item.title}
                            />
                            <div className="user-artwork-description">{item.description}</div>
                            <div className="user-artwork-genre">{item.genre}</div>
                            <div className="artist-profile-CRUD-buttons">
                                <button onClick={() => handleDetailsClick(item)}>
                                    Details
                                </button>
                                {selectedArtwork === item && (
                                    <div className="artwork-details">
                                        <div>Title: {item.title}</div>
                                        <div>Description: {item.description}</div>
                                        <div>Genre: {item.genre}</div>
                                        <div>Materials: {item.materials.join(', ')}</div>
                                        <div>Creation Year: {item.creationYear}</div>
                                        {/* Add more fields as needed */}
                                    </div>
                                )}
                                <button onClick={() => handleEditClick(item)}>Edit</button>
                                {isEditing && selectedArtwork === item ? (
                                    <div className="artwork-details">
                                        <input
                                            type="text"
                                            value={editedArtwork.title}
                                            onChange={(e) =>
                                                setEditedArtwork({
                                                    ...editedArtwork,
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={editedArtwork.description}
                                            onChange={(e) =>
                                                setEditedArtwork({
                                                    ...editedArtwork,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={editedArtwork.genre}
                                            onChange={(e) =>
                                                setEditedArtwork({
                                                    ...editedArtwork,
                                                    genre: e.target.value,
                                                })
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={editedArtwork.materials}
                                            onChange={(e) =>
                                                setEditedArtwork({
                                                    ...editedArtwork,
                                                    materials: e.target.value,
                                                })
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={editedArtwork.creationYear}
                                            onChange={(e) =>
                                                setEditedArtwork({
                                                    ...editedArtwork,
                                                    creationYear: e.target.value,
                                                })
                                            }
                                        />
                                        
                                        <button onClick={handleSaveClick}>Save</button>
                                    </div>
                                ) : null}
                                <button onClick={() => handleDeleteClick(item)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>LOADING</div>
                )}
            </div>
        </div>
    )
}
