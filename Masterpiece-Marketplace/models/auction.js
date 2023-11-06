const { Schema } = require("mongoose");

const AuctionSchema = new Schema(
    {
        artistSeller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String, required: false },
        coverImageURL: { type: String, required: false },
        artworkIncluded: [{ type: Schema.Types.ObjectId, ref: 'Artwork', required: false }],
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        reservePriceUSD: { type: String, required: true },
        isResolved: { type: Boolean, required: true },
        isTransactionComplete: { type: Boolean, required: true },

    },
    { timestamps: true }
)

module.exports = AuctionSchema