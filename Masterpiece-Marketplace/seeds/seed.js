const db = require('../db/index.js')

const { User, Artwork, Auction, Bid } = require(`../models/index.js`)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
console.log("DB On")

const main = async () => {

    //USER

    const Admin = await User.create({
        username: "Kevin-Admin",
        password: "ilovedbs",
        address: "123 S Admin St, New York, NY, 10001, USA",
        profilePic: "https://www.solving-finance.com/wp-content/uploads/2022/09/37ff2e_cc4a781482b94bfab2a12f4a6c4ebc67mv2.png",
        isAdmin: true,
        isArtist: true,
        artistDescription: "I art because I admin"
    })

    const Artist = await User.create({
        username: "BlenVanGogh",
        password: "ears",
        address: "12 10th St, Zundert, Netherlands",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/800px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
        isAdmin: false,
        isArtist: true,
        artistDescription: "I am GOAT and deeply troubled"
    })

    const Buyer = await User.create({
        username: "Tahmid-Buyer",
        password: "dogecoin",
        address: "1600 Pennsylvania Avenue, N.W., Washington, DC 20500, USA",
        profilePic: "https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png",
        isAdmin: false,
        isArtist: false
    })

    const ArtistBuyer = await User.create({
        username: "SammyfromEtsy",
        password: "ArTi$t",
        address: "20 South Entrance Road, Grand Canyon, AZ 86023, USA",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Boy_Blowing_Bubbles_Edouard_Manet.jpg/1280px-Boy_Blowing_Bubbles_Edouard_Manet.jpg",
        isAdmin: false,
        isArtist: true,
        artistDescription: "I <3 Manet"
    })

    //ARTWORK

    const PaintingParis = await Artwork.create({
        artist: Artist._id,
        title: "Paris Sunflowers",
        description: "Sunflowers",
        genre: "Post-Impressionist",
        material: ["Oil", "Canvas"],
        creationYear: "1888",
        imageURLs: ["https://en.wikipedia.org/wiki/File:Van_Gogh_-_Zwei_abgeschnittene_Sonnenblumen.jpeg"]
    })

    const PaintingArlesOne = await Artwork.create({
        artist: Artist._id,
        title: "Arles Sunflower Initial",
        description: "Sunflowers",
        genre: "Post-Impressionist",
        material: ["Oil", "Canvas"],
        creationYear: "1988",
        imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg/1280px-Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg"]
    })

    const PaintingArlesTwo = await Artwork.create({
        artist: Artist._id,
        title: "Arles Sunflower Initial",
        description: "Sunflowers",
        genre: "Painting",
        material: ["Oil", "Canvas"],
        creationYear: "1988",
        imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg/1280px-Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg"]
    })

    const PaintingArlesThree = await Artwork.create({
        artist: Artist._id,
        title: "Arles Sunflower The Berceuse-Triptych",
        description: "Sunflowers",
        genre: "Painting",
        material: ["Oil", "Canvas"],
        creationYear: "1989",
        imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vincent_Willem_van_Gogh_128.jpg/1280px-Vincent_Willem_van_Gogh_128.jpg"]
    })
    
    const GrandCanyon = await Artwork.create({
        artist: ArtistBuyer._id,
        title: "The Grand Canyon",
        description: "I made this",
        genre: "Sculpture",
        material: ["Water", "Stone", "Sand"],
        creationYear: "unknown",
        imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Canyon_River_Tree_%28165872763%29.jpeg/576px-Canyon_River_Tree_%28165872763%29.jpeg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/GrandCanyon.NASA.2014.jpg/440px-GrandCanyon.NASA.2014.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/GCRockfall.JPG/440px-GCRockfall.JPG"]
    })

    const BrooklynBridge = await Artwork.create({
        artist: ArtistBuyer._id,
        title: "The Brooklyn Bridge",
        description: "I made this",
        genre: "Sculpture",
        material: ["Steel", "Concrete"],
        creationYear: "1883",
        imageURLs: ["https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Brooklyn_Bridge_Manhattan.jpg/500px-Brooklyn_Bridge_Manhattan.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Standing_Tall_%282819665347%29.jpg/440px-Standing_Tall_%282819665347%29.jpg"]
    })

    //AUCTION

    const Sunflowers = await Auction.create({
        artistSeller: Artist._id,
        title: "Sunflowers collection",
        description: "A few of my sunflowers",
        coverImageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/540px-Vincent_Willem_van_Gogh_127.jpg",
        artworkIncluded: [PaintingArlesOne._id, PaintingArlesTwo._id, PaintingArlesThree._id],
        startTime: '2023-11-01',
        endTime: '2023-12-31',
        reservePriceUSD: "10000000",
        isResolved: false,
        isTransactionComplete: false,
    })

    const Canyon = await Auction.create({
        artistSeller: ArtistBuyer._id,
        title: "Grand Canyon",
        description: "My magnum opus. Definitely legit.",
        coverImageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/USA_Arizona_location_map.svg/544px-USA_Arizona_location_map.svg.png",
        artworkIncluded: [GrandCanyon._id],
        startTime: '2023-01-01',
        endTime: '2023-01-02',
        reservePriceUSD: "30",
        isResolved: true,
        isTransactionComplete: false,
    })

    const Bridge = await Auction.create({
        artistSeller: ArtistBuyer._id,
        title: "Brooklyn Bridge",
        description: "Just finished. Definitely legit.",
        coverImageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/The_great_East_River_bridge-_to_connect_the_cities_of_New_York_%26_Brooklyn_LCCN2001704255_%28cropped%29.jpg/440px-The_great_East_River_bridge-_to_connect_the_cities_of_New_York_%26_Brooklyn_LCCN2001704255_%28cropped%29.jpg",
        artworkIncluded: [BrooklynBridge._id],
        startTime: '2023-12-01',
        endTime: '2023-12-31',
        reservePriceUSD: "400",
        isResolved: false,
        isTransactionComplete: false,
    })

    //BID

    const CanyonBidOne = await Bid.create({
        auction: Canyon._id,
        user: Artist._id,
        bidUSD: "400.25",
    })

    const CanyonBidTwo = await Bid.create({
        auction: Canyon._id,
        user: ArtistBuyer._id,
        bidUSD: "450",
    })

    const CanyonBidThree = await Bid.create({
        auction: Canyon._id,
        user: Artist._id,
        bidUSD: "400.25",
    })

    const CanyonBidFour = await Bid.create({
        auction: Canyon._id,
        user: Buyer._id,
        bidUSD: "500",
    })

    const SunflowersBidOne = await Bid.create({
        auction: Sunflowers._id,
        user: Buyer._id,
        bidUSD: "10000000",
    })

    const SunflowersBidTwo = await Bid.create({
        auction: Sunflowers._id,
        user: Artist._id,
        bidUSD: "10000001",
    })

    const SunflowersBidThree = await Bid.create({
        auction: Sunflowers._id,
        user: Buyer._id,
        bidUSD: "100000000",
    })


}

reSeedAll = async () => {
    await db.dropDatabase()
    console.log("droppedDB")
    await main()
    console.log("completed main")
    await db.close()
    console.log("closed db")
}

reSeedAll()