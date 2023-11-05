
const { User, Artwork, Auction, Bid } = require('../models/index'))

module.exports = {
    getAll,
    getByID,
    getByBidID,
    getByAuctionID,
    postCreate,
    deleteDelete,
}

async function getAll (req,res) {
    try {
        const bids = await Bid.find()
        res.status(201).send(bids)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        // const bids = await Bid.find()
        res.status(201).send(bids)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByBidID (req,res) {
    try {
        // const bid = await Bid.findById(req.params.id)
        res.status(201).send(bid)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function getByAuctionID (req,res) {
    try {
        // const bid = await Bid.findById(req.params.id)
        res.status(201).send(bid)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function postCreate (req,res) {
    try {
        // const bid = await Bid.findById(req.params.id)
        res.status(201).send(bid)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function deleteDelete (req,res) {
    try {
        // const bid = await Bid.findById(req.params.id)
        res.status(201).send(bid)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}