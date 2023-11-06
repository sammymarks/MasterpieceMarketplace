import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

import ArtistSearchResults from './ArtistSearchResults'
import ArtworkSearchResults from './ArtworkSearchResults'
import AuctionSearchResults from './AuctionsSearchResults'


export default function Discover () {

    return (
        <div className='Discover'>
            <div>I am Discover </div>
            <ArtistSearchResults />
            <ArtworkSearchResults />
            <AuctionSearchResults />
        </div>
    )
}