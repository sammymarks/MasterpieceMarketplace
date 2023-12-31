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
        console.log("getbyIDcalled")
        const user = await User.findById(req.params.id)
        res.status(201).send(user)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function getByUsername(req, res) {
    try {
        console.log("getbyUsername")
        console.log(req)
        const currentUser = req.params.username
        const name = await User.findOne({username: currentUser}); 
      if (name) {
        res.status(200).json(name);
      } else {
        res.status(404).json({ message: 'Username not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

async function searchArtist (req,res) {
    try {
        let text = req.params.search
        const artists = await User.find({$or:[
            {"username": { "$regex" : text, "$options" : "i"}},
            {"artistDescription": { "$regex" : text, "$options" : "i"}},
            {"address": { "$regex" : text, "$options" : "i"}},
        ]})
        res.status(201).send(artists)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function postCreate (req,res) {
    try {
        const user = await User.create(req.body)
        res.status(201).send(user)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function putUpdate (req,res) {
    try {
        const userID = req.params.id;
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: 'User not found for update' });
        }

        user.set(req.body);
        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (e) {

        return res.status(500).json({ error: e.message });
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

