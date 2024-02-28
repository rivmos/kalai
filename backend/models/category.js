const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    // img: {type: String, require: true}
})

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Category', categorySchema)
