const mongoose = require('mongoose')

// //Import Model
// const { TrailerSchema } = require('./parts/trailer')
// const { SeatSchema } = require('./parts/seat')
// const { RackSchema } = require('./parts/rack')
// const { StorageSchema } = require('./parts/storage')
// const { AccessorySchema }= require('./parts/accessory')
// const BuildSchema = require('./build')
const UserSchema = require('./user')
// const { BikeSchema } = require('./parts/bike')

// //Define Schema
// const Bike = mongoose.model('bike', BikeSchema)
// const Trailer = mongoose.model('trailers', TrailerSchema)
// const Seat = mongoose.model('seats', SeatSchema)
// const Rack = mongoose.model('racks', RackSchema)
// const Storage = mongoose.model('storages', StorageSchema)
// const Accessory = mongoose.model('accessories', AccessorySchema)
// const Build = mongoose.model('build', BuildSchema)
const User = mongoose.model('user', UserSchema)



module.exports = {
    User,
    Artwork,
    Auction,
    Bid
  }