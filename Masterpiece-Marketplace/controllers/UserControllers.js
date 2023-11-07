const { User, Artwork, Auction, Bid } = require('../models/index')

module.exports = {
    getAll,
    getByID,
    getByUsername,
    searchArtist,
    postCreate,
    putUpdate,
    deleteDelete,
}

async function getAll (req,res) {
    try {
        const users = await User.find()
        res.status(201).send(users)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const user = await User.findById(req.params.id)
        res.status(201).send(user)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function getByUsername (req,res) {
    try {
        // const user = await User.findById(req.params.id)
        res.status(201).send(user)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function searchArtist (req,res) {
    try {
        // const user = await User.findById(req.params.id)
        res.status(201).send(user)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function postCreate (req,res) {
    try {
        // const user = await User.findById(req.params.id)
        res.status(201).send(user)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function putUpdate (req,res) {
    try {
        // const user = await User.findById(req.params.id)
        res.status(201).send(user)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function deleteDelete (req,res) {
        try {
            const userID = req.params.id; 
            const deletedUser = await User.findByIdAndDelete(userID);
    
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found for deletion' });
            }
    
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

