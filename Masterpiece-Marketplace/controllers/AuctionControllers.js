// const UserSchema = require('./user')
// const User = mongoose.model('user', UserSchema)


const { User, Artwork, Auction, Bid } = require('../models/index')

module.exports = {
    getAll,
    getByID,
    getSearch,
    getByUserID,
    postCreate,
    putUpdate,
    deleteDelete,
}

async function getAll (req,res) {
    try {
        const auctions = await Auction.find()
        res.status(201).send(auctions)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const auctions = await Auction.findById(req.params.id)
        res.status(201).send(auctions)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function getSearch (req,res) {
    try {
        
        let searchText = req.params.search

        const searchAuctions = await Auction.find({$or:[
            {"title": { "$regex" : searchText, "$options" : "i"}},
            {"description": { "$regex" : searchText, "$options" : "i"}},
        ]})
            .populate([{path:'artistSeller', model: User}, {path:'artworkIncluded', model: Artwork}])
            .exec()

        // const searchArtist = await Auction.find()

        res.status(201).send(searchAuctions)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}


async function getByUserID(req, res) {
    try {
        const userID = req.params.id;
        const auctions = await Auction.find({ userId: userID });

        if (!auctions) {
            return res.status(404).json({ message: 'No auctions found for this user ID' });
        }

        res.status(200).json(auctions);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}


async function postCreate (req,res) {
    try {
        // const auction = await Auction.findById(req.params.id)
        res.status(201).send(auction)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function putUpdate (req,res) {
    try {
        // const auction = await Auction.findById(req.params.id)
        res.status(201).send(auction)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function deleteDelete (req,res) {
        try {
            const auctionID = req.params.id; 
            const deletedAuction = await Auction.findByIdAndDelete(auctionID);
    
            if (!deletedAuction) {
                return res.status(404).json({ message: 'Auction not found for deletion' });
            }
    
            res.status(200).json({ message: 'Auction deleted successfully' });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }