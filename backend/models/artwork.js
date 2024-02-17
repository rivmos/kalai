const mongoose = require('mongoose')

const artworkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    imageUrls: [String],
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    width: {type:Number, required: true},
    height: {type:Number, required: true},
    sizeUnit: {type:String, required: true},
    price: {type:Number, required: true},
    medium: {type:String, required:true},
    deliveredAs:{type:String, required:true},
    createdIn:Number,
    itemCode:Number,
    isSold:{type:Boolean, required:true}

})

artworkSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Artwork', artworkSchema)
