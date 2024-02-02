const artworkRouter = require('express').Router()
const Artwork = require('../models/artwork')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/auth').getTokenFrom
const config = require('../utils/config')
  
/* Get Products */
artworkRouter.get('/', (req, res) => {
    Artwork.find({}).then((artwork) => {
        res.json(artwork) 
    }).catch(error => res.json(error))
})

/* Get Single Product */
// artworkRouter.get('/:id', (req, res) => {
//     const id = req.params.id
//     Artist.findById(id).then(artist => {
//         res.json(artist)
//     }).catch(error => {
//         res.json({
//             message: `The Artist Doesn't Exist`
//         })
//     })
// })

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

// artworkRouter.post('/new', async (req, res) => {
//     const decodedToken = jwt.verify(getTokenFrom(req, res), config.JWTSECRET)
//     if (!decodedToken.id) {
//         return res.status(401).json({ error: 'token invalid' })
//     }
//     const body = req.body;
//     const newArtist = new Artist(body)
//     newArtist.save()
//         .then((response) => {
//             logger.info('Artist saved')
//             res.json(response)
//         })
//         .catch((err) => {
//             logger.info('Artist not saved')
//             logger.info(err)
//             res.status(500).json(err)
//         })
// })


module.exports = artworkRouter 