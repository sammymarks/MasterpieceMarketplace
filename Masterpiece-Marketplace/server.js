const express = require("express");
const db = require("./db");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

//-------Imports-------
//Schemas
const { User, Artwork, Auction, Bid } = require('./models/index')

//Controllers

const userController = require("./controllers/UserControllers")
const artworkController = require("./controllers/ArtworkControllers")
const auctionController = require("./controllers/AuctionControllers")
const bidController = require("./controllers/BidControllers")

//-------END Imports -------

const PORT = process.env.PORT || 3001;

//middleware
const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
//https://chat.openai.com/c/c844fdf9-cab5-484e-bac4-bc6dde44edb9
app.use(cors({
    origin: 'http://localhost:5173'
}));
//end middleware


//-------CRUD------- 
//Index
app.get("/", (req, res) => res.send("This is Index"));

//User
app.get("/users", userController.getAll);
app.get("/users/:id", userController.getByID);
// app.get("/users/:username", userController.getByUsername)
app.get("/users/artist-search/:search", userController.searchArtist)

// app.post("/users/create", userController.postCreate)
// app.put("/users/:id", userController.putUpdate)
app.delete("/users/:id", userController.deleteDelete)


// //Artwork
app.get("/artworks", artworkController.getAll);
app.get("/artworks/:id", artworkController.getByID);
app.get("/artworks/search/:search", artworkController.getSearch)
// app.get("/artworks/user/:userid", artworkController.getByUserID)

// app.post("/artworks/create", artworkController.postCreate)
// app.put("/artworks/:id", artworkController.putUpdate)
app.delete("/artworks/:id", artworkController.deleteDelete)


// //Auction
app.get("/auctions", auctionController.getAll);
app.get("/auctions/:id", auctionController.getByID);
app.get("/auctions/search/:search", auctionController.getSearch)
// app.get("/auctions/user/:userid", auctionController.getByUserID)

// app.post("/auctions/create", auctionController.postCreate)
// app.put("/auctions/:id", auctionController.putUpdate)
app.delete("/auctions/:id", auctionController.deleteDelete)


// //Bid
app.get("/bids", bidController.getAll);
app.get("/bids/:id", bidController.getByID);
// app.get("/bids/user/:userid", bidController.getByUserID)
// app.get("/bids/auction/:auctionid", bidController.getByAuctionID)

// app.post("/users/create", bidController.postCreate)
app.delete("/bids/:id", bidController.deleteDelete)




//-------ENDCRUD-------
//listening
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
