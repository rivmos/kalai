const mongoose = require('mongoose')

const artworkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    imageUrl: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
})

artworkSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Artwork', artworkSchema)
