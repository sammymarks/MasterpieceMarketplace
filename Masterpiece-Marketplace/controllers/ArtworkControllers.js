//For Artwork:
// add getbyID controller function here
// add getbyID route in server.js
// reference a to be defined Artwork schema


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
        const artworks = await Artwork.find()
        .populate({path:'artist', model: User})
        .exec()
        res.status(201).send(artworks)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const artworks = await Artwork.findById(req.params.id)
        .populate({path:'artist', model: User})
        .exec()
        res.status(201).send(artworks)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function getSearch (req,res) {
    try {
        let text = req.params.search
        const artworks = await Artwork.find({$or:[
            {"title": { "$regex" : text, "$options" : "i"}},
            {"description": { "$regex" : text, "$options" : "i"}},
            {"genre": { "$regex" : text, "$options" : "i"}},
            {"creationYear": { "$regex" : text, "$options" : "i"}},
        ]})            
        .populate({path:'artist', model: User})
        .exec()
        res.status(201).send(artworks)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByUserID (req,res) {
    try {
        const userID = req.params.id;
        const artworks = await Artwork.find({ userId: userID });

        if (!artworks) {
            return res.status(404).json({ message: 'No artwork found for this user ID' });
        }

        res.status(200).json(artworks);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

async function postCreate (req,res) {
    try {
        const artwork = await Artwork.create(req.body)
        res.status(201).send(artwork)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function putUpdate (req,res) {
    try {
        const artworkID = req.params.id;
        const artwork = await Artwork.findById(artworkID);

        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found for update' });
        }

        artwork.set(req.body);
        await artwork.save();

        res.status(200).json({ message: 'Artwork updated successfully', artwork });
    } catch (e) {

        return res.status(500).json({ error: e.message });
    }
}


async function deleteDelete (req,res) {
    try {
        const artworkID = req.params.id; 
        const deletedArtwork = await Artwork.findByIdAndDelete(artworkID);

        if (!deletedArtwork) {
            return res.status(404).json({ message: 'Artwork not found for deletion' });
        }

        res.status(200).json({ message: 'Artwork deleted successfully' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}