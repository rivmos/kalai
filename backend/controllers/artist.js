const artistRouter = require('express').Router()
const Artist = require('../models/artist')
const Artwork = require('../models/artwork')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/auth').getTokenFrom
const config = require('../utils/config')
const {upload} = require('../utils/middleware')


/* Get Products */
artistRouter.get('/', (req, res) => {
    Artist.find({}).populate('artworks', 'imageUrl').then((artist) => {
        res.json(artist)
    }).catch(error => res.json(error))
})

/* Get Single Product */
artistRouter.get('/:id', (req, res) => {
    const id = req.params.id
    Artist.findById(id).populate('artworks').then(artist => {
        res.json(artist)
    }).catch(error => {
        res.json({
            message: `The Artist Doesn't Exist`
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

artistRouter.post('/new', async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req, res), config.JWTSECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    const { name, bio, website, artworks } = req.body;
    // const validationError = validateEnquiry(body)
    // if (validationError) {
    //     res.status(500).json({ message: `${validationError} Required` })
    //     return
    // }
    const newArtist = new Artist({ name, bio, website, artworks })
    // await newArtist.save()

    // const createdArtworks = await Artwork.create(artworks.map(artwork => {
    //         console.log(upload.array(artwork.images))
    //         return {...artwork, artist: newArtist._id }
    //     }))


    // newArtist.artworks = createdArtworks.map(artwork => artwork._id)

    newArtist.save()
        .then((response) => {
            logger.info('Artist saved')
            res.json(response)
        })
        .catch((err) => {
            logger.info('Artist not saved')
            logger.info(err)
            res.status(500).json(err)
        })
})


artistRouter.get('/:artistId/artworks', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.artistId).populate('artworks');
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        const artworks = artist.artworks;
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = artistRouter 