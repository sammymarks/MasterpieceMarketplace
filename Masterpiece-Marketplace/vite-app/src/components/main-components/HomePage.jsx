import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'


export default function HomePage () {

    //api calls for images

    return (
        <div className='HomePage'> 
            <div>I am HomePage</div>
            <h3>An new and intuitive way to discover and bid on Art.</h3>
            <img></img>
            <img></img>
            <img></img>

            <div className="button-container">
            <button className="login-button">
          <Link to="/login">Login</Link>
        </button>
        <button className="signup-button">
          <Link to="/signup">Sign Up</Link>
        </button>
        </div>
            
        
        
    
            
        </div>
    )
}