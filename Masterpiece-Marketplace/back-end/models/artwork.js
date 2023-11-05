const { Schema } = require("mongoose");

const ArtworkSchema = new Schema(
    {
        artist: { type: Schema.Types.ObjectId, ref: 'User', required: false },
        title: { type: String, required: true },
        description: { type: String, required: true },
        genre: { type: String, required: true },
        materials: [{ type: String, required: true }],
        creationYear: { type: String, required: true },
        imageURLs: [{ type: String, required: true }],

    },
    { timestamps: true }
)

module.exports = ArtworkSchema