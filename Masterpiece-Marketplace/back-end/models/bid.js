const { Schema } = require("mongoose");

const BidSchema = new Schema(
    {
        auction: { type: Schema.Types.ObjectId, ref: 'Auction', required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bidUSD: { type: Number, required: true },
    },
    { timestamps: true }
)

module.exports = BidSchema