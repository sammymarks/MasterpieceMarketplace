const express = require("express");
const db = require("./db");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// let db = ('mongodb+srv://admin:0000@cluster0.4bkeksa.mongodb.net/')

//-------Imports-------
//Schemas
// import { User, Artwork, Auction, Bid} from './back-end/models/index.js'

// //Controllers

// const userController = require("./controllers/UserControllers")
// const buildController = require('./controllers/BuildControllers')
// const bikeController = require('./controllers/PartsControllers/BikeControllers')
// const accessoryController = require('./controllers/PartsControllers/AccessoryControllers')
// const rackController = require('./controllers/PartsControllers/RackControllers')
// const seatController = require('./controllers/PartsControllers/SeatControllers')
// const trailerController = require('./controllers/PartsControllers/TrailerControllers')
// const storageController = require('./controllers/PartsControllers/StorageControllers')





//-------END Imports -------

const PORT = process.env.PORT || 3001;

//middleware
const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
//end middleware


//-------CRUD------- 
//Index
app.get("/", (req, res) => res.send("This is Index"));

//User
// app.get("/users", userController.getAll);
// app.get("/users/:id", userController.getByID);
// app.get("/users/:username", userController.getByUsername)
// app.get("/users/artists/:search", userController.searchArtist)

// app.post("/users/create", userController.postCreate)
// app.put("/users/:id", userController.putUpdate)
// app.delete("/users/:id", userController.deleteDelete)


// //Artwork
// app.get("/artworks", artworkController.getAll);
// app.get("/artworks/:id", artworkController.getByID);
// app.get("/artworks/:search", artworkController.getSearch)
// app.get("/artworks/user/:userid", artworkController.getByUserID)

// app.post("/artworks/create", artworkController.postCreate)
// app.put("/artworks/:id", artworkController.putUpdate)
// app.delete("/artworks/:id", artworkController.deleteDelete)


// //Auction
// app.get("/auctions", auctionController.getAll);
// app.get("/auctions/:id", auctionController.getByID);
// app.get("/auctions/:search", auctionController.getSearch)
// app.get("/auctions/user/:userid", auctionController.getByUserID)

// app.post("/auctions/create", auctionController.postCreate)
// app.put("/auctions/:id", auctionController.putUpdate)
// app.delete("/auctions/:id", auctionController.deleteDelete)


// //Bid
// app.get("/bids", bidController.getAll);
// app.get("/bids/:id", bidController.getByID);
// app.get("/bids/user/:userid", bidController.getByUserID)
// app.get("/bids/auction/:auctionid", bidController.getByAuctionID)

// app.post("/users/create", bidController.postCreate)
// app.delete("/bids/:id", bidController.deleteDelete)




//-------ENDCRUD-------
//listening
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
