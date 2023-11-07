import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App'




export default function SignUpPage() {

    const navigate = useNavigate()

    const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [homeAddress, setHomeAddress] = useState('')
    const [isArtist, setIsArtist] = useState(false)
    const [artistDescription, setArtistDescription] = useState('')

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.")
            return
        }

        const userData = {
            username,
            password,
            address: homeAddress,
            isArtist,
            artistDescription: isArtist ? artistDescription : '',
            isAdmin: false,
        };

        axios
            .post('http://localhost:3001/users/create', userData)
            .then((response) => {
                console.log('User created:', response.data)
                navigate('/discover')
            })
            .catch((error) => {
                alert("User not created. Issue with POST")
                console.error('Error creating user:', error)
            })
    }



    return (
        <div className='SignUpPage'>
            <h2>Sign Up</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="homeAddress">Home Address:</label>
                <input
                    type="text"
                    id="homeAddress"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                />
            </div>
            <div>
                <label>Are you an Artist?</label>
                <input
                    type="checkbox"
                    id="isArtist"
                    checked={isArtist}
                    onChange={() => setIsArtist(!isArtist)}
                />
            </div>
            {isArtist && (
                <div>
                    <label htmlFor="artistDescription">Artist Description:</label>
                    <input
                        type="text"
                        id="artistDescription"
                        value={artistDescription}
                        onChange={(e) => setArtistDescription(e.target.value)}
                    />
                </div>
            )}
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}