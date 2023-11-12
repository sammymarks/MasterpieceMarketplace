const mongoose = require('mongoose')

// //Import Model

const UserSchema = require('./user')
const ArtworkSchema = require('./artwork')
const AuctionSchema = require('./auction')
const BidSchema = require('./bid')

// //Define Schema

const User = mongoose.model('user', UserSchema)
const Artwork = mongoose.model('artwork', ArtworkSchema)
const Auction = mongoose.model('auction', AuctionSchema)
const Bid = mongoose.model('bid', BidSchema)




module.exports = {
    User,
    Artwork,
    Auction,
    Bid
  }