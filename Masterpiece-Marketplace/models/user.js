const { Schema } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {type: String, required: true },
        password: { type: String, required: true },
        address: { type: String, required: true },
        profilePic: { type: String, required: false },
        isAdmin: { type: Boolean, required: true },
        isArtist: { type: Boolean, required: true },
        artistDescription: { type: String, required: false },
        followedArtists: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
        followedAuctions: [{ type: Schema.Types.ObjectId, ref: 'Auction', required: false }],
    },
    { timestamps: true }
)

module.exports = UserSchema