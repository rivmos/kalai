const artworkRouter = require('express').Router()
const Artwork = require('../models/artwork')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/auth').getTokenFrom
const config = require('../utils/config')
const {upload} = require('../utils/middleware')
  
/* Get Products */
artworkRouter.get('/', (req, res) => {
    Artwork.find({}).then((artwork) => {
        res.json(artwork) 
    }).catch(error => res.json(error))
})

/* Get Single Product */
artworkRouter.get('/:id', (req, res) => {
    const id = req.params.id
    Artwork.findById(id).populate('category').then(artwork => {
        res.json(artwork)
    }).catch(error => {
        res.json({
            message: `The Artwork Doesn't Exist`
        })
    })
})

// const validateArtist = (body) => {
//     if (!body.name) {
//         return 'Name'
//     }
//     else if (!body.bio) {
//         return 'Bio'
//     }
//     else if (!body.website) {
//         return 'Website'
//     }
//     else {
//         return ''
//     }
// }

artworkRouter.post('/new', upload.array('images[]', 5) , async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req, res), config.JWTSECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    const {title, description, category, width, height, sizeUnit, price, medium, deliveredAs, createdIn, isSold} = req.body;
    const imagePaths = req.files.map(file => file.path); 
    const newArtwork = new Artwork({
        title,
        description,
        category,
        width,
        height,
        sizeUnit,
        price,
        medium,
        deliveredAs,
        createdIn,
        isSold,
        imageUrls:imagePaths
    })
    newArtwork.save()
        .then((response) => {
            logger.info('Artwork saved')
            res.json(response)
        })
        .catch((err) => {
            logger.info('Artwork not saved')
            logger.info(err)
            res.status(500).json(err)
        })
})


module.exports = artworkRouter 