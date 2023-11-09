import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useUserContext } from '../../App';
import { BASE_DB_URL } from '../../globals';


export default function LoginPage () {

    const { loggedInUser, setLoggedInUser, userArtwork, userAuctions, userBids } = useUserContext();
    const navigate = useNavigate();


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
      // login, req to server
      const url = `${BASE_DB_URL}users/654c41b45250b40dc2a87af2`
      const response = await axios.get(url)
      setLoggedInUser(response.data)
      navigate('/discover')
      // success, redirect to another page
    }

    console.log(loggedInUser)

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