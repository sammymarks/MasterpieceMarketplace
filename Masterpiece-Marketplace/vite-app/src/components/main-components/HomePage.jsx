import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import { useUserContext } from '../../App';

export default function HomePage () {
  const { loggedInUser, userArtwork, userAuctions, userBids } = useUserContext();

    //api calls for images

    return (
        <div className='HomePage'>
          <div>I am HomePage</div>
          <h3>An new and intuitive way to discover and bid on Art.</h3>
          <img alt="Artwork 1"></img>
          <img alt="Artwork 2"></img>
          <img alt="Artwork 3"></img>
    
          {!loggedInUser && (
            <div className='button-container'>
              <button className='login-button'>
                <Link to='/login'>Login</Link>
              </button>
              <button className='signup-button'>
                <Link to='/signup'>Sign Up</Link>
              </button>
            </div>
          )}
        </div>
      );
    }