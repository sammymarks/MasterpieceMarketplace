const mongoose = require("mongoose");

mongoose
    .connect('mongodb+srv://admin:0000@cluster0.4bkeksa.mongodb.net/')
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection;

module.exports = db;