import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'


export default function HomePage () {

    return (
        <div className='HomePage'> 
            <div>I am HomePage</div>
            <LoginPage />
            <SignUpPage />
        </div>
    )
}