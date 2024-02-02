const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: String,
    website: String,
    artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
})

artistSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Artist', artistSchema)
