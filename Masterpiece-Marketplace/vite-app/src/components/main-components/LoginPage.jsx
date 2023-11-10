import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate, redirect } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App'
import { BASE_DB_URL } from '../../globals'


export default function LoginPage() {

    const { loggedInUser, setLoggedInUser, userArtwork, userAuctions, userBids } = useUserContext()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {

        try {
            const response = await axios.get('http://localhost:3001/users')
            const users = response.data

            // check if there is a user with the provided username and password
            const loggedInUser = users.find(
                (user) => user.username === username && user.password === password
            )
            if (loggedInUser) {
                setLoggedInUser(loggedInUser)
                console.log(loggedInUser)
                navigate('/discover')
            } else {
                console.error('Invalid username or password')
                alert('Invalid username or password')
            }
        } catch (error) {
            console.error('Error during login:', error)
        }

    }

    return (
        <div className='LoginPage'>
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
            <p>
                Don't have an account?{' '}
                <Link to="/signup">Click here to make one.</Link>
            </p>
        </div>
    )
}